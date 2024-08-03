import styles from './styles/FormField.module.css';
import { PasswordInput } from './PasswordInput';
import { useState, useEffect, useRef } from 'react';


export const FormField = (props) => {
  const {
    label,
    error,
    ...rest
  } = props;
  const [errorHeight, setErrorHeight] = useState(0);
  const errorRef = useRef();

  useEffect(() => {
    if (error) {
      setErrorHeight(errorRef.current.scrollHeight);
    } else {
      setErrorHeight(0);
    }
  }, [error]);

  return (
    <label className={styles.label}>
      <span>
        { label }
      </span>
      {
        rest.type === 'password'
          ?<PasswordInput
             {...rest}
           />
          :<input
             {...rest}
             autoComplete='on'
           />
      }
      <span
        ref={errorRef}
        className={`${styles.error} ${error? styles.show: styles.hide}`}
        style={{ height: `${errorHeight}px` }}
      >
        { error }
      </span>
    </label>
  );
}
