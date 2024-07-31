import { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import { validations } from '../services/validation';


export const useOutsideClick = (props) => {
  const { ref, handler } = props;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, handler]);
}


export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotify must be used within a NoificationProvider');
  }

  return context;
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}


export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}


export const useResponseHandler = () => {
  const { setMessage, setType, showNotification } = useNotify();

  const handleResponse = (response, success) => {
    if (response === undefined) {
      setMessage('Can\'t connect to the server');
      setType('error');
      showNotification();
    } else if (response.status === 'fail') {
      setMessage(response?.message);
      setType('error');
      response?.message && showNotification();
    } else if (response.status === 'error') {
      console.log(response?.message);
      setMessage('Internal Server Error');
      setType('error');
      showNotification();
    } else if (response.status === 'success') {
      success();
      if ('message' in response) {
        setMessage(response.message);
        setType('success');
        showNotification();
      }
    } else {
      console.log(response);
      console.log('Unknown Response');
    }
  }

  return { handleResponse };
}


export const useForm = () => {
  const [errors, setErrors] = useState({});

  const runValidation = (validationFunc, value, options) => {
    if (typeof(validationFunc) === 'function') {
      return validationFunc(value, options);
    } else {
      console.log('Validation not found');
    }
  }

  const handleErrors = (form) => {
    const { elements } = form;
    const errorsObj = {};

    for (const element of elements) {
      const dataValidation = element.getAttribute('data-validation');

      if (dataValidation !== null) {
        const validationObj = JSON.parse(dataValidation);
        
        for (const [validation, options] of Object.entries(validationObj)) {
          const validationResult = runValidation(
            validations[validation],
            element.value,
            options
          );

          if (validationResult) {
            errorsObj[element.name] = validationResult;
            break;
          }
        }
      }

    }

    return errorsObj;
  }

  const register = (name, validationRules) => {
    const newErrors = { ...errors };
    delete newErrors[name];
    const result = {
      name,
      error: errors[name],
      onFocus: () => setErrors(newErrors),
      'data-validation': JSON.stringify(validationRules),
    }

    if ('required' in validationRules) {
      result.required = true;
    }

    return result;
  }

  const handleSubmit = (e, service) => {
    e.preventDefault();
    const errorsObj = handleErrors(e.currentTarget);

    if (Object.keys(errorsObj).length === 0) {
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData);
      service(payload);
    } else {
      setErrors(errorsObj);
    }
  }

  return { errors, register, handleSubmit };
}
