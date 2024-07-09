import styles from './styles/FormField.module.css';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';
import { useState } from 'react';


export const FormField = (props) => {
  const {
    label,
    type,
    name,
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
      {
        type === 'password'
          ?<PasswordInput
             isFocused={isFocused}
             isMouseOver={isMouseOver}
             handleFocus={handleFocus}
             handleBlur={handleBlur}
           />
          :<Input
             type={type}
             name={name}
             placeholder={placeholder}
             isFocused={isFocused}
             isMouseOver={isMouseOver}
             handleFocus={handleFocus}
             handleBlur={handleBlur}
           />

      }
    </label>
  );
}
