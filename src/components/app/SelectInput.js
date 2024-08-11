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
    <select name={name} defaultValue={value} disabled={disabled}>
      <option value=''>--Please choose an option--</option>
      {
        options.map((option, index) => {
          return (
            <option
              key={index}
              value={option.id? option.id: option}
            >
              { option.name? option.name: option }
            </option>
          );
        })
      }
    </select>
  );
}
