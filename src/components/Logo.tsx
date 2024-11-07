import { Img, useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface LogoProps {
  logo: string;
  width?: number;
  height?: number;
  direction?: 'from-left' | 'from-right' | 'top-bottom' | 'bottom-top';
  delay?: number;
}

const getAnimationPoints = (direction: string) => {
  if (direction === 'from-left') {
    return { axis: 'left', start: -100, end: 0 };
  }
  if (direction === 'from-right') {
    return { axis: 'left', start: 100, end: 0 };
  }
  if (direction === 'top-bottom') {
    return { axis: 'top', start: -100, end: 0 };
  }
  if (direction === 'bottom-top') {
    return { axis: 'top', start: 100, end: 0 };
  }
  return { axis: 'left', start: 0, end: 0 };
};

const Logo = ({ logo, width, height, direction = 'from-left', delay = 0 }: LogoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { axis, start, end } = getAnimationPoints(direction);

  // Apply the spring animation on the chosen axis (left or top)
  const position = spring({
    frame: Math.max(0, frame - delay), // Apply delay here
    fps,
    from: start,
    to: end,
    config: {
      mass: 1,
      damping: 40,
    },
  });

  const opacity = spring({
    frame: Math.max(0, frame - delay), // Apply delay here
    fps,
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  return (
    <div
      style={{
        width: width || 'auto',
        height: height || 'auto',
        position: 'relative',
        [axis]: position, // Dynamic property (either left or top)
        opacity,
        marginBottom: 50,
      }}
    >
      <Img
        src={logo}
        style={{
          width: width || 'auto',
          height: height || 'auto',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Logo;
