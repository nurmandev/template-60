import { AbsoluteFill, Audio, staticFile, useVideoConfig } from 'remotion';

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
import AnimatedBackground from '../components/animateBackground';

export const scene4Schema = z.object({
  logo: z.string(),
  title: z.string(),
  img: z.string(),
});
type Scene4Props = z.infer<typeof scene4Schema> & { background: BackgroundProps };

const Scene4: React.FC<Scene4Props> = (props) => {
  const { defaultProps } = useVideoConfig();

  const titleSplit = useTextSplitter({
    text: props.title.toUpperCase(),
    fontSize: 120,
    fontWeight: '800',
    letterSpacing: '1px',
    maxLines: 2,
    maxWidth: 1000,
  });
  return (
    <AbsoluteFill style={{ background: '#93611b' }}>
      {/* <Background {...props.background} /> */}

      <Audio src={staticFile('VO_4.mp3')} volume={defaultProps.audioVolume as number} />
      <Gradient
        direction="rightToLeft"
        height={HEIGHT * 0.15}
        width={WIDTH * 0.5}
        y={HEIGHT * 0.65}
        opacity={0.5}
        delay={33}
      />
      <AnimatedImage
        image={props.img}
        width={WIDTH * 0.4}
        height={HEIGHT * 0.91}
        direction="top-bottom"
        x={WIDTH * 0.05}
        grayscaleLevel={0.5}
        overlayColor="rgb(0, 0, 0)"
        startAt={15}
      />
      <AbsoluteFill>
        <AnimatedBackground />
      </AbsoluteFill>
      <AbsoluteFill style={{ left: WIDTH * 0.1, top: 100 }}>
        <Logo logo={props.logo} direction="bottom-top" height={200} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          ...titleSplit.style,
          color: '#fae092',
          left: WIDTH * 0.55,
          top: HEIGHT * 0.5,
        }}
      >
        <TitleTextFromRight text={titleSplit.text} startAt={60} />
      </AbsoluteFill>

      <RectangularLines
        direction="topToBottom"
        width={WIDTH * 0.14}
        height={HEIGHT * 0.45}
        x={WIDTH * 0.88}
        y={HEIGHT * 0.225}
        color="gray"
        delay={15}
      />

      <RectangularLines
        direction="bottomToTop"
        width={WIDTH * 0.14}
        height={HEIGHT * 0.3}
        x={WIDTH * 0.2}
        y={HEIGHT - HEIGHT * 0.15}
        color="gray"
        delay={15}
      />
      <AbsoluteFill>
        <DotsAnimation x={WIDTH * 0.55} y={HEIGHT * 0.8} color="black" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene4;
