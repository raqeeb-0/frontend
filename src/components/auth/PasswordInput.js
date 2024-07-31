import { PiEyeBold } from 'react-icons/pi';
import { PiEyeClosed } from 'react-icons/pi';
import { useState } from 'react';


export const PasswordInput = (props) => {
  const { type, ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (e) => {
    if (e.target.value === '') {
      setIsEmpty(true);
      setIsVisible(false);
    } else {
      setIsEmpty(false);
    }
  }
  const toggleVisibility = (e) => {
    isVisible
      ?setIsVisible(false)
      :setIsVisible(true);
  }

  return (
    <>
      <input
        type={isVisible? 'text': 'password'}
        onChange={handleChange}
        autocomplete='on'
        {...rest}
      />
      {
        !isEmpty &&
        <div onClick={toggleVisibility}>
          {
            isVisible
            ?<PiEyeClosed title='hide' />
            :<PiEyeBold title='show' />
          }
        </div>
      }
    </>
  );
}
