export const validations = {
  required: (field, options) => {
    if (field.length === 0) {
      if ('message' in options) {
        return options.message;
      } else {
        return 'required';
      }
    }
  },
  isEmail: (email, options) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return options.message;
    }
  },
  min: (text, length) => {
    if (text.length < length) {
      return `length should be more than ${length} characters`;
    }
  },
}
