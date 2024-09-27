import styles from './styles/Card.module.css';


export const Card = (props) => {
  const {
    index,
    header,
    imageSrc,
    paragraph
  } = props;

  return (
    <article className={styles.card}>
      <img src={imageSrc} alt='icon' />
      <div>
        { index < 10 && '0' }{ index }
      </div>
      <h2>
        { header }
      </h2>
      <p>
        { paragraph }
      </p>
    </article>
  );
}
