import styles from './styles/Form.module.css';
import { ButtonLoader } from '../common';


export const Form = (props) => {
  const { children, onSubmit, legend, isLoading } = props;

  return (
    <form noValidate onSubmit={onSubmit} className={styles.form}>
      <legend className={styles.legend}>
        { legend }
      </legend>
      <div className={styles.container}>
        <div className={styles.grid}>
          { children }
        </div>
      </div>
      <button
        className={styles.button}
        disabled={isLoading}
      >
        { isLoading ? <ButtonLoader /> : 'Submit' }
      </button>
    </form>
  );
}
