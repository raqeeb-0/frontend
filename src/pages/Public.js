import styles from './styles/public.module.css';
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
  return (
    <div className={styles.all}>
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
