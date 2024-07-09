import styles from './styles/TextInput.module.css';


export const Input = (props) => {
  const {
    type,
    name,
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
      placeholder={placeholder}
      autoComplete='on'
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
