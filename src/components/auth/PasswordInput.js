import { PiEyeBold } from 'react-icons/pi';
import { PiEyeClosed } from 'react-icons/pi';
import { useState } from 'react';


export const PasswordInput = (props) => {
  const { type: _, handlePassword, ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  const handleChange = (e) => {
    handlePassword?.(e);
    if (e.target.value === '') {
      setIsEmptyInput(true);
      setIsVisible(false);
    } else {
      setIsEmptyInput(false);
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <input
        type={isVisible? 'text': 'password'}
        onChange={handleChange}
        autoComplete='on'
        {...rest}
      />
      {
        !isEmptyInput &&
        <button
          type='button'
          onClick={toggleVisibility}
          aria-label='Toggle password visibility'
        >
          {
            isVisible
            ?<PiEyeClosed title='hide' />
            :<PiEyeBold title='show' />
          }
        </button>
      }
    </>
  );
}
