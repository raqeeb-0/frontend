import styles from './../styles/footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.footerCol}>
          <h4>company</h4>
          <ul>
            <li><a href="#">about us</a></li>
            <li><a href="#">our services</a></li>
            <li><a href="#">privacy policy</a></li>
            <li><a href="#">affiliate program</a></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4>Contact Information</h4>
          <p><strong>Email:</strong> support@raqeeb.com</p>
          <p><strong>Phone:</strong> +20 1276 556 853</p>
          <p><strong>Address:</strong> in front of Koleyt El-Bana Victoria College Degla, Damietta,Egypt </p>
        </div>
        <div className={styles.footerCol}>
          <h4>follow us</h4>
          <div className={styles.socialLinks}>
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  )
}
