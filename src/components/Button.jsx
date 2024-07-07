import styles from './styles/Button.module.css';


export const Button = (probs) => {
  const { type, value, handleClick } = probs;

  return (
    <button
      type={type}
      className={styles.btn}
      onClick={handleClick}
    >
      { value }
    </button>
  );
}
