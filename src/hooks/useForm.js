import { useState } from 'react';
import validations from '../services/validation';


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
    // const errorsObj = {};

    if (Object.keys(errorsObj).length === 0) {
      setErrors({});
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData);
      if ('materials' in payload) {
        payload.materials = JSON.parse(payload.materials);
      }
      if ('image' in payload) {
        payload.image = JSON.parse(payload.image);
      }
      service(payload);
    } else {
      setErrors(errorsObj);
    }
  }

  return { errors, register, handleSubmit };
}
