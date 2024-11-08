import React, { PropsWithChildren } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Direction = 'horizontal' | 'vertical';

interface SplitWrapperProps {
  slides: number;
  direction: Direction;
}

const SplitWrapper: React.FC<PropsWithChildren<SplitWrapperProps>> = ({
  children,
  slides = 3,
  direction,
}) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const delayFrames = 10; // Set a slight delay between each segment

  // Define the dimensions and positioning for each direction
  const segmentWidth = direction === 'horizontal' ? width / slides : width;
  const segmentHeight = direction === 'vertical' ? height / slides : height;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'row' : 'column',
        gap: '0px',
      }}
    >
      {Array.from({ length: slides }).map((_, index) => {
        // Initial centralized position
        const initialX = width / 2 - segmentWidth / 2;
        const initialY = height / 2 - segmentHeight / 2;

        // Determine final position based on direction
        let finalX = 0;
        let finalY = 0;

        switch (direction) {
          case 'horizontal':
            finalX = index * segmentWidth;
            finalY = 0;
            break;
          case 'vertical':
            finalX = 0;
            finalY = index * segmentHeight;
            break;
        }

        // Calculate the delay and interpolation for smooth transitions
        const delay = index * delayFrames;
        const position = interpolate(
          frame - delay,
          [0, fps],
          [
            direction === 'horizontal' ? initialX : initialY,
            direction === 'horizontal' ? finalX : finalY,
          ],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={index}
            style={{
              width: segmentWidth,
              height: segmentHeight,
              overflow: 'hidden',
              position: 'absolute',
              left: direction === 'horizontal' ? position : initialX,
              top: direction === 'vertical' ? position : initialY,
              opacity,
            }}
          >
            <div
              style={{
                width: width,
                height: height,
                transform:
                  direction === 'horizontal'
                    ? `translateX(-${index * segmentWidth}px)`
                    : `translateY(-${index * segmentHeight}px)`,
              }}
            >
              {children}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default SplitWrapper;
