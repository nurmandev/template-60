import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Direction = 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop';

const Gradient = ({
  width,
  height,
  direction,
  opacity = 0.5,
  delay = 0,
  color = 'gray',
  x = 0,
  y = 0,
}: {
  width?: number;
  height?: number;
  direction: Direction;
  opacity?: number;
  delay?: number;
  color?: string;
  x?: number;
  y?: number;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Calculate the scale animation for zoom out effect
  const scaleAnimation = interpolate(frame, [delay, durationInFrames * 0.5 + delay], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Calculate the clip-path based on the direction prop
  let clipPathAnimation: string;
  const clipPathProgress = interpolate(frame, [delay, durationInFrames * 0.15 + delay], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Define the clip path based on the direction
  switch (direction) {
    case 'leftToRight':
      clipPathAnimation = `polygon(${clipPathProgress * 100}% 0%, 100% 0%, 100% 100%, ${clipPathProgress * 100}% 100%)`;
      break;
    case 'rightToLeft':
      clipPathAnimation = `polygon(0% 0%, ${100 - clipPathProgress * 100}% 0%, ${100 - clipPathProgress * 100}% 100%, 0% 100%)`;
      break;
    case 'topToBottom':
      clipPathAnimation = `polygon(0% 0%, 100% 0%, 100% ${100 - clipPathProgress * 100}%, 0% ${100 - clipPathProgress * 100}%)`;
      break;
    case 'bottomToTop':
      clipPathAnimation = `polygon(0% ${clipPathProgress * 100}%, 100% ${clipPathProgress * 100}%, 100% 100%, 0% 100%)`;
      break;
    default:
      clipPathAnimation = `polygon(${clipPathProgress * 100}% 0%, 100% 0%, 100% 100%, ${clipPathProgress * 100}% 100%)`;
  }

  return (
    <AbsoluteFill
      style={{
        width: width || '100%',
        height: height || '100%',
        opacity,
        left: x,
        top: y,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: color,
          clipPath: clipPathAnimation,
          transform: `scale(${scaleAnimation})`,
        }}
      />
    </AbsoluteFill>
  );
};

export default Gradient;
