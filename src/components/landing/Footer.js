import styles from './styles/Footer.module.css';
import { Link } from 'react-router-dom';
import { LuGithub } from 'react-icons/lu';
import { LuLinkedin } from 'react-icons/lu';


export const Footer = () => {
  return (
    <footer className={styles.container}>
      <section className={styles.section}>
        <article>
          <h3>company</h3>
          <ul>
            <li><Link to='#'>about us</Link></li>
            <li><Link to='#'>our services</Link></li>
            <li><Link to='#'>privacy policy</Link></li>
          </ul>
        </article>
        <article>
          <h3>quick links</h3>
          <ul>
            <li><a href='#top'>Home</a></li>
            <li><a href='#features'>Features</a></li>
            <li><Link to='#'>Contact Us</Link></li>
          </ul>
        </article>
        <article>
          <h3>contact information</h3>
          <p><strong>Email:</strong> ammarelbadry1@gmail.com</p>
        </article>
        <article className={styles.social}>
          <h3>follow us</h3>
          <div>
            <a href='https://github.com/raqeeb-0' target='_blank' title='Raqeeb Github Org.'>
              <LuGithub />
            </a>
          </div>
          <h3>developer</h3>
          <div>
            <a href='https://www.linkedin.com/in/ammarelbadry1' target='_blank' title='Ammar'>
              <LuLinkedin />
            </a>
          </div>
        </article>
      </section>
    </footer>
  );
}
