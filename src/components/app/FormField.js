import styles from './styles/FormField.module.css';
import { Input } from './Input';
import { useState } from 'react';


export const FormField = (props) => {
  const {
    label,
    type,
    name,
    value,
    handleChange,
    placeholder
  } = props;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <label
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`\
${styles.label} \
${isFocused? styles.focused: ''} \
${!isFocused && isMouseOver? styles.hovered: ''} \
`} >
        { label }
      </span>
      <Input
        type={type}
        name={name}
        value={value}
        handleChange={handleChange}
        placeholder={placeholder}
        isFocused={isFocused}
        isMouseOver={isMouseOver}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
    </label>
  );
}
