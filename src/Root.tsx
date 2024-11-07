import { Composition, staticFile } from 'remotion';
import Main, { MainSchema } from './Composition/Composition';
import { Compare } from './Composition/Compare';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template"
        component={Main}
        schema={MainSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'static',
            background: 'black',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 30,
          scene1Duration: 180,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'YOUR JUSTICES,\n',
            subtitle: 'OUR COMMITMENT',
          },
          scene2Duration: 210,
          scene2Props: {
            logo: staticFile('Logo.png'),
            title: 'NEED LEGAL \n EXPERTISE?',
            img1: staticFile('Media_1.jpg'),
            img2: staticFile('Media_2.jpg'),
          },
          scene3Duration: 210,
          scene3Props: {
            logo: staticFile('Logo.png'),
            title: 'EXPERIENCED \n ATTORNEYS?',
            img1: staticFile('Media_3.jpg'),
            img2: staticFile('Media_4.jpg'),
          },
          scene4Duration: 210,
          scene4Props: {
            logo: staticFile('Logo.png'),
            title: 'EXPERT \n GUIDANCE',
            img: staticFile('Media_4.jpg'),
          },
          scene5Duration: 210,
          scene5Props: {
            logo: staticFile('Logo.png'),
            title: '213 182-33-27',
            subtitle1: 'Contact us for a free consultation',
            subtitle2: 'Www.justicelawgroup.com',
          },
        }}
      />
      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={30}
        width={1920 * 2}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'static',
            background: 'black',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 30,
          scene1Duration: 180,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'YOUR JUSTICES,\n',
            subtitle: 'OUR COMMITMENT',
          },
          scene2Duration: 210,
          scene2Props: {
            logo: staticFile('Logo.png'),
            title: 'NEED LEGAL \n EXPERTISE?',
            img1: staticFile('Media_1.jpg'),
            img2: staticFile('Media_2.jpg'),
          },
          scene3Duration: 210,
          scene3Props: {
            logo: staticFile('Logo.png'),
            title: 'EXPERIENCED \n ATTORNEYS?',
            img1: staticFile('Media_3.jpg'),
            img2: staticFile('Media_4.jpg'),
          },
          scene4Duration: 210,
          scene4Props: {
            logo: staticFile('Logo.png'),
            title: 'EXPERT \n GUIDANCE',
            img: staticFile('Media_5.jpg'),
          },
          scene5Duration: 210,
          scene5Props: {
            logo: staticFile('Logo.png'),
            title: '213 182-33-27',
            subtitle1: 'Contact us for a free consultation',
            subtitle2: 'Www.justicelawgroup.com',
          },
        }}
      />
    </>
  );
};
