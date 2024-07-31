import styles from './styles/FormField.module.css';
import { PasswordInput } from './PasswordInput';


export const FormField = (props) => {
  const {
    label,
    error,
    ...rest
  } = props;

  return (
    <label className={styles.label}>
      <span>
        { label }
      </span>
      {
        rest.type === 'password'
          ?<PasswordInput
             {...rest}
           />
          :<input
             {...rest}
             autoComplete='on'
           />
      }
      { error && <span>{ error }</span> }
    </label>
  );
}
