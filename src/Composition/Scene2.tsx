import { AbsoluteFill } from 'remotion';

import { z } from 'zod';
import Logo from '../components/Logo';
// import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import AnimatedImage from '../components/AnimateImage';
import { HEIGHT, WIDTH } from '../lib/consts';
import RectangularLines from '../components/RectangularLines';
import Gradient from '../components/Gradient';
import DotsAnimation from '../components/animations/DotsAnimation';

export const scene2Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img1: z.string(),
  img2: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {
  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 110,
    fontWeight: '800',
    letterSpacing: '1px',
    maxLines: 2,
    maxWidth: 1000,
  });
  return (
    <AbsoluteFill style={{ background: '#93611b' }}>
      {/* <Background {...props.background} /> */}
      <Gradient
        direction="bottomToTop"
        height={HEIGHT * 0.3}
        width={WIDTH * 0.2}
        x={WIDTH * 0.03}
        y={WIDTH * 0.03}
        opacity={0.5}
      />
      <Gradient
        direction="topToBottom"
        height={HEIGHT * 0.4}
        width={WIDTH * 0.1}
        x={WIDTH * 0.8}
        opacity={0.5}
      />
      <AnimatedImage
        image={props.img1}
        width={WIDTH * 0.5}
        height={HEIGHT * 0.9}
        direction="bottom-top"
        x={WIDTH * 0.05}
      />
      <AnimatedImage
        image={props.img2}
        width={WIDTH * 0.28}
        height={HEIGHT * 0.35}
        direction="top-bottom"
        x={WIDTH * 0.65}
      />
      <AbsoluteFill style={{ left: 100, top: 100 }}>
        <Logo logo={props.logo} direction="bottom-top" height={200} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          ...titleSplit.style,
          color: '#fae092',
          left: WIDTH * 0.5,
          top: HEIGHT * 0.68,
        }}
      >
        <TitleTextFromRight text={titleSplit.text} />
      </AbsoluteFill>

      <RectangularLines
        direction="topToBottom"
        width={WIDTH * 0.14}
        height={HEIGHT * 0.4}
        x={WIDTH * 0.45}
        y={0 + HEIGHT * 0.2}
        color="gray"
      />
      <RectangularLines
        direction="bottomToTop"
        width={WIDTH * 0.14}
        height={HEIGHT * 0.3}
        x={WIDTH - (WIDTH * 0.14) / 2}
        y={HEIGHT - HEIGHT * 0.15}
        color="gray"
      />
      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.58} y={HEIGHT * 0.45} />
      </AbsoluteFill>

      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.1} y={HEIGHT * 0.7} direction="vertical" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene2;
