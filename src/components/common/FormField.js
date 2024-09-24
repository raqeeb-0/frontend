import styles from './styles/FormField.module.css';
import { useState, useEffect, useRef } from 'react';
import { useBlockHeight } from '../../hooks';


export const FormField = (props) => {
  const {
    error,
    children
  } = props;
  const errorRef = useRef();

  const { height: errorHeight } = useBlockHeight({
    blockInnerText: error,
    ref: errorRef,
  });

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
