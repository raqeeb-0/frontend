import styles from './styles/Button.module.css';
import { ButtonLoader } from '../common';


export const Button = (probs) => {
  const { type, value, handleClick, disabled } = probs;

  return (
    <button
      type={type}
      className={styles.btn}
      onClick={handleClick}
      disabled={disabled}
    >
      { disabled? <ButtonLoader />: value }
    </button>
  );
}
