import styles from './styles/FormField.module.css';


export const FormField = (props) => {
  const {
    label,
    type,
    name,
    value,
    disabled,
    placeholder
  } = props;

  return (
    <label className={styles.label}>
      <span>
        { label }
      </span>
      <input
        type={type}
        name={name}
        disabled={disabled}
        defaultValue={value}
        placeholder={placeholder}
      />
    </label>
  );
}
