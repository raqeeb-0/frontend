import styles from './styles/FormField.module.css';
import { useState, useEffect, useRef } from 'react';


export const FormField = (props) => {
  const {
    error,
    children
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
    <div className={styles.group}>
      { children }
      <span
        ref={errorRef}
        className={`${styles.error} ${error? styles.show: styles.hide}`}
        style={{ height: `${errorHeight}px` }}
      >
        { error }
      </span>
    </div>
  );
}
