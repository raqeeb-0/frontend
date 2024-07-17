import styles from './styles/Input.module.css';


export const Input = (props) => {
  const {
    type,
    name,
    value,
    handleChange,
    placeholder,
    isFocused,
    isMouseOver,
    handleFocus,
    handleBlur
  } = props;

  return (
    <input
      type={type}
      className={`\
${styles.input} \
${isFocused? styles.focused: ''} \
${!isFocused && isMouseOver? styles.hovered: ''} \
`}
      name={name}
      defaultValue={value}
      placeholder={placeholder}
      autoComplete='on'
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
