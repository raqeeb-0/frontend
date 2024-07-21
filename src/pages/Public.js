import { FirstHero } from '../components/landing/firstHero/FirstHero.js';
import styles from './styles/public.module.css';
import { Features } from '../components/landing/features/features.js';
import { NdHero } from '../components/landing/secondHero/secondHero.js';
import { ThirdHero } from '../components/landing/thirdHero/thirdHero.js';
import { Comments } from '../components/landing/comments/comments.js';
import { FAQ } from '../components/landing/FAQ/faq.js';
import { Lcta } from '../components/landing/LCTA/lcta.js';
import { Footer } from '../components/landing/footer/footer.js';

export const Public = () => {
  return (
    <div className={styles.all}>
      <FirstHero />
      <Features />
      <NdHero />
      <ThirdHero />
      <Comments />
      <FAQ />
      <Lcta />
      <Footer />
    </div>
  );
}
