import { AbsoluteFill } from 'remotion';

import { z } from 'zod';
import Logo from '../components/Logo';
import { BackgroundProps } from '../backgrounds';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TitleTextFromRight } from '../components/animations/TitleTextFromRight';
import AnimatedImage from '../components/AnimateImage';
import { HEIGHT, WIDTH } from '../lib/consts';
import RectangularLines from '../components/RectangularLines';
import Gradient from '../components/Gradient';
import DotsAnimation from '../components/animations/DotsAnimation';

export const scene3Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img1: z.string(),
  img2: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
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
        x={WIDTH * 0.9}
        y={WIDTH * 0.03}
        opacity={0.5}
      />
      <AnimatedImage
        image={props.img1}
        width={WIDTH * 0.64}
        height={HEIGHT * 0.9}
        direction="top-bottom"
        x={WIDTH * 0.3}
      />
      <AnimatedImage
        image={props.img2}
        width={WIDTH * 0.35}
        height={HEIGHT * 0.5}
        direction="bottom-top"
        x={WIDTH * 0.07}
      />
      <Gradient
        direction="topToBottom"
        height={HEIGHT * 0.12}
        width={WIDTH * 0.2}
        x={WIDTH * 0.04}
        y={HEIGHT * 0.8}
        color="black"
        opacity={1}
      />
      <AbsoluteFill style={{ left: WIDTH * 0.8, top: 100 }}>
        <Logo logo={props.logo} direction="bottom-top" height={200} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          ...titleSplit.style,
          color: '#fae092',
          left: WIDTH * 0.07,
          top: HEIGHT * 0.07,
        }}
      >
        <TitleTextFromRight text={titleSplit.text} />
      </AbsoluteFill>

      <RectangularLines
        direction="bottomToTop"
        width={WIDTH * 0.14}
        height={HEIGHT * 0.45}
        x={WIDTH * 0.8}
        y={HEIGHT - HEIGHT * 0.225}
        color="gray"
      />
      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.07} y={HEIGHT * 0.4} />
      </AbsoluteFill>

      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.65} y={HEIGHT * 0.6} direction="vertical" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene3;
