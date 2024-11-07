import { Img, useCurrentFrame, spring, useVideoConfig, AbsoluteFill } from 'remotion';

interface AnimatedImageProps {
  image: string; // Image source
  width: number; // Width of the image
  height: number; // Height of the image
  direction?: 'from-left' | 'from-right' | 'top-bottom' | 'bottom-top';
  startAt?: number; // Delay before the animation starts
  x?: number;
  y?: number;
}

const getSlideInPosition = (direction: string, width: number, height: number) => {
  if (direction === 'from-left') {
    return { axis: 'left', start: -width, end: 0 };
  }
  if (direction === 'from-right') {
    return { axis: 'left', start: width, end: 0 };
  }
  if (direction === 'top-bottom') {
    return { axis: 'top', start: -height, end: 0 };
  }
  if (direction === 'bottom-top') {
    return { axis: 'bottom', start: -height, end: 0 };
  }
  return { axis: 'left', start: 0, end: 0 };
};

const AnimatedImage = ({
  image,
  width = 300,
  height = 300,
  direction = 'from-left',
  startAt = 0,
  x = 0,
  y = 0,
}: AnimatedImageProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { axis, start, end } = getSlideInPosition(direction, width, height);

  // Slide animation from start to end position
  const position = spring({
    frame: Math.max(0, frame - startAt),
    fps,
    from: start,
    to: end,
    config: {
      mass: 1,
      damping: 20,
    },
  });

  // Fade-in effect
  const opacity = spring({
    frame: Math.max(0, frame - startAt),
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill
      style={{
        left: x,
        top: y,
      }}
    >
      <div
        style={{
          width,
          height,
          position: 'absolute',
          [axis]: position,
          opacity,
          overflow: 'hidden',
        }}
      >
        <Img
          src={image}
          style={{
            width,
            height,
            objectFit: 'cover',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export default AnimatedImage;
