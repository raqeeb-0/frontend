import styles from './styles/SelectInput.module.css';


export const SelectInput = (props) => {
  const {
    label,
    name,
    value,
    disabled,
    options
  } = props;

  return (
    <label className={styles.label}>
      <span>
        { label }
      </span>
      <select name={name} defaultValue={value} disabled={disabled}>
        <option value=''>--Please choose an option--</option>
        {
          options.map((option, index) => {
            return (
              <option
                key={index}
                value={option.id}
              >
                { option.name }
              </option>
            );
          })
        }
      </select>
    </label>
  );
}
