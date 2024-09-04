import { useRef } from 'react';
import {
  FirstHero,
  Features,
  SecondHero,
  ThirdHero,
  Comments,
  FAQ,
  LCTA,
  Footer,
  TopNav
} from '../components/landing';


export const Public = () => {
  const pageRef = useRef(null);
  const style = {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
  }
  return (
    <div style={style} ref={pageRef}>
      <TopNav pageRef={pageRef} />
      <FirstHero />
      <Features />
      <SecondHero />
      <ThirdHero />
      <Comments />
      <FAQ />
      <LCTA />
      <Footer />
    </div>
  );
}
