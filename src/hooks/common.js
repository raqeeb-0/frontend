import { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import validations from '../services/validation';


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

  const runValidation = (validationFunc, value, options) =>
    typeof validationFunc === 'function'
      ? validationFunc(value, options)
      : console.log('Validation not found');


  const handleErrors = (form) => {
    const errorsObj = {};

    Array.from(form.elements).forEach(element => {
      const dataValidation = element.getAttribute('data-validation');
      if(dataValidation) {
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
    });

    return errorsObj;
  }

  const register = (name, validationRules) => ({
    name,
    'data-validation': JSON.stringify(validationRules),
    ...(validationRules.required && { required: true }),
    onFocus: () => setErrors(prevErrors => {
      const { [name]: error, ...newErrors } = prevErrors;

      return error ? newErrors : prevErrors;
    }),
  })

  const handleSubmit = (e, service) => {
    e.preventDefault();
    const errorsObj = handleErrors(e.currentTarget);

    if (Object.keys(errorsObj).length === 0) {
      setErrors({});
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData);
      service(payload);
    } else {
      setErrors(errorsObj);
    }
  }

  return { errors, register, handleSubmit };
}
