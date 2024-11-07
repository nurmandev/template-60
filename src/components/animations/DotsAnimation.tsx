import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

interface DotsAnimationProps {
  x: number;
  y: number;
  direction?: 'horizontal' | 'vertical';
}

const DotsAnimation: React.FC<DotsAnimationProps> = ({ x, y, direction = 'horizontal' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numDots = 6;
  const dotSize = 20;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        position: 'absolute',
        top: y,
        left: x,
        opacity: 0.5,
      }}
    >
      {[...Array(numDots)].map((_, i) => {
        // Delay each dot animation sequentially
        const delay = i * 5;
        const reverseDelay = (numDots - i) * 10;
        const totalDuration = fps * 3; // Total loop duration in frames
        const finalOpacity = 1 - i * 0.15;

        // Calculate the phase of the animation: growing or shrinking
        const isGrowingPhase = frame % totalDuration < totalDuration / 2;

        // Compute opacity and scale based on the phase of the animation
        const opacity = isGrowingPhase
          ? interpolate(
              frame % (totalDuration / 2),
              [delay, delay + totalDuration / 2],
              [0, finalOpacity],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              }
            )
          : interpolate(
              frame % (totalDuration / 2),
              [reverseDelay, reverseDelay + totalDuration / 2],
              [finalOpacity, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              }
            );

        const scale = isGrowingPhase
          ? interpolate(frame % (totalDuration / 2), [delay, delay + totalDuration / 2], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease),
            })
          : interpolate(
              frame % (totalDuration / 2),
              [reverseDelay, reverseDelay + totalDuration / 2],
              [1, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.ease),
              }
            );

        return (
          <div
            key={i}
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: 'white',
              opacity,
              transform: `scale(${scale})`,
              // transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            }}
          />
        );
      })}
    </div>
  );
};

export default DotsAnimation;
