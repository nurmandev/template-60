import { Easing, interpolate, useCurrentFrame } from 'remotion';

export const TitleTextFromRight = ({ text, startAt = 0 }: { text: string; startAt?: number }) => {
  const frame = useCurrentFrame();
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIndex) => (
        <p
          key={lineIndex}
          style={{
            margin: 0,
            letterSpacing: 5,
            position: 'relative',
            whiteSpace: 'nowrap',
          }}
        >
          {line.split('').map((char, charIndex) => {
            const delay = 4;
            const startFrame = startAt + charIndex * delay;
            const opacity = interpolate(frame, [startFrame, startFrame + delay + 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease),
            });
            const top = interpolate(frame, [startFrame, startFrame + delay + 10], [50, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.ease),
            });

            return (
              <span
                key={`char-${lineIndex}-${charIndex}`}
                style={{
                  position: 'relative',
                  top,
                  left: 0,
                  opacity,
                }}
              >
                {char}
              </span>
            );
          })}
          {lineIndex < lines.length - 1 && <br />}
        </p>
      ))}
    </>
  );
};
