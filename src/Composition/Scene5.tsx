import { AbsoluteFill, staticFile } from 'remotion';
import { z } from 'zod';
import { useTextSplitter } from '../lib/useTextSplitter';
import { colorVar } from '../lib/helpers';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import { Background } from '../components/Background';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import RectangularLines from '../components/RectangularLines';
import DotsAnimation from '../components/animations/DotsAnimation';
import Logo from '../components/Logo';

export const scene5Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subtitle1: z.string(),
  subtitle2: z.string(),
});
type Scene5Props = z.infer<typeof scene5Schema> & { background: BackgroundProps };

const Scene5: React.FC<Scene5Props> = (props) => {
  // we make the text conform to available width, fontFamily, fontWeight, and fontSize and add \n to the text
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 130,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });
  const subtitle1Split = useTextSplitter({
    text: props.subtitle1,
    fontSize: 100,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1500,
  });
  const subtitle2Split = useTextSplitter({
    text: props.subtitle2.toUpperCase(),
    fontSize: 80,
    fontWeight: '600',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 1000,
  });

  // const subtitleSplit = useTextSplitter({
  //   text: props.subtitle,
  //   fontSize: 100,
  //   fontWeight: '600',
  //   letterSpacing: '6px',
  //   maxLines: 1,
  //   maxWidth: 1000,
  // });

  return (
    <AbsoluteFill style={{}}>
      {/* The background component is always the same setup like this.
      Get's it's input from the root */}
      <Background {...props.background} />
      <div
        style={{
          textAlign: 'center',
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Logo logo={staticFile('Logo.png')} direction="bottom-top" height={250} />
        <div
          style={{
            ...subtitle1Split.style,
            color: '#fae092',
          }}
        >
          <TitleTextFromRight text={subtitle1Split.text} />
        </div>
        <div
          style={{
            ...titleSplit.style,
            color: colorVar('primaryText'),
          }}
        >
          <TitleTextFromRight text={titleSplit.text} />
        </div>
        <div
          style={{
            ...subtitle2Split.style,
            color: '#fae092',
          }}
        >
          <TitleTextFromRight text={subtitle2Split.text} />
        </div>
      </div>
      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.05} y={HEIGHT * 0.1} />
      </AbsoluteFill>
      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.8} y={HEIGHT * 0.85} />
      </AbsoluteFill>
      <RectangularLines
        direction="bottomToTop"
        opacity={0.3}
        width={WIDTH * 0.14}
        height={HEIGHT * 0.2}
        x={WIDTH * 0.15}
        y={HEIGHT * 0.92}
      />
      <RectangularLines
        direction="topToBottom"
        opacity={0.3}
        width={WIDTH * 0.14}
        height={HEIGHT * 0.42}
        x={WIDTH * 0.85}
        y={HEIGHT * 0.1}
      />
    </AbsoluteFill>
  );
};

export default Scene5;
