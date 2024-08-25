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
  const style = {
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
  }
  return (
    <div style={style}>
      <TopNav />
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
