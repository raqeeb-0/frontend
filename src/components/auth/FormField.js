import styles from './styles/FormField.module.css';
import { PasswordInput } from './PasswordInput';


export const FormField = (props) => {
  const {
    label,
    type,
    name,
    placeholder
  } = props;

  return (
    <label className={styles.label}>
      <span>
        { label }
      </span>
      {
        type === 'password'
          ?<PasswordInput />
          :<input
             type={type}
             name={name}
             placeholder={placeholder}
             autoComplete='on'
           />
      }
    </label>
  );
}
