import styles from './styles/PasswordInput.module.css';
import { PiEyeBold } from 'react-icons/pi';
import { PiEyeClosed } from 'react-icons/pi';
import { useRef, useReducer, useEffect } from 'react';

export const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'toggle_visibility':
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    case 'changed_value':
      return action.value === ''
        ? {
            isVisible: false,
            isEmptyInput: true,
          }
        : {
            ...state,
            isEmptyInput: false,
          };
  }
  throw new Error('Unsupported action: ' + action.type);
}


export const PasswordInput = (props) => {
  const {
    onPasswordValueChange,
    reducer = passwordReducer,
    ...rest
  } = props;
  const [state, dispatch] = useReducer(reducer, {
    isVisible: false,
    isEmptyInput: true,
  });
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  const handleChange = (e) => {
    onPasswordValueChange?.(e.target.value);
    dispatch({
      type: 'changed_value',
      value: e.target.value
    });
  }

  const toggleVisibility = () =>
    dispatch({ type: 'toggle_visibility' });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    inputRef.current.focus();
  }, [state.isVisible]);

  return (
    <>
      <input
        ref={inputRef}
        type={state.isVisible? 'text': 'password'}
        onChange={handleChange}
        {...rest}
      />
      {
        !state.isEmptyInput &&
        <button
          type='button'
          tabIndex='-1'
          className={styles.toggle}
          onClick={toggleVisibility}
          aria-label='Toggle password visibility'
        >
          {
            state.isVisible
            ?<PiEyeClosed title='hide' />
            :<PiEyeBold title='show' />
          }
        </button>
      }
    </>
  );
}
