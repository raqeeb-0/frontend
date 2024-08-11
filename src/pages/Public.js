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

  const style={
    overflow: 'auto',
    height: '100vh',
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
