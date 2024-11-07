import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

type Direction = 'leftToRight' | 'rightToLeft' | 'topToBottom' | 'bottomToTop';

const RectangularLines = ({
  x = 0,
  y = 0,
  width,
  height,
  direction,
  opacity = 1,
  delay = 0,
  color = 'white',
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  direction: Direction;
  opacity?: number;
  delay?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

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
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)',
        width: width || '100%',
        height: height || '100%',
        opacity,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `repeating-linear-gradient(
            135deg,
            ${color},
            ${color} 1px,
            transparent 10px,
            transparent 30px
          )`,
          clipPath: clipPathAnimation,
        }}
      />
    </div>
  );
};

export default RectangularLines;
