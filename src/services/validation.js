const required = (field, options = {}) => {
  const defaultMessage = 'required';
  const { message = defaultMessage } = options;

  return field.length === 0 ? message : undefined;
}

const email = (email, options) => {
  const defaultMessage = 'Invalid email';
  const { message = defaultMessage } = options;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return !emailRegex.test(email) ? message : undefined;
}

const username = (username, options) => {
  const defaultMessage =
    'Username can only contain lowercase letters, numbers, and underscores';
  const { message = defaultMessage } = options;
  const usernameRegex = /^[a-z0-9_]*$/;

  return !usernameRegex.test(username) ? message : undefined;
}

const length = (text, options) => {
  const { min, max } = options;
  const defaultMessage =
    `Length should be between ${min} and ${max} characters`;
  const { message = defaultMessage } = options;

  return text.length < min || text.length > max
    ? message
    : undefined;
}

const phoneNumber = (number, options) => {
  const defaultMessage = 'Invalid phone number';
  const { message = defaultMessage } = options;
  const phoneNumberRegex = /^01\d{9}$/;

  return !phoneNumberRegex.test(number) ? message : undefined;
}

const matched = (value, options) => {
  const defaultMessage = 'Values do not match';
  const { value: targetValue, message = defaultMessage } = options;

  if (targetValue === undefined) {
    return 'Target value not provided';
  }

  return value !== targetValue ? message : undefined;
}


export default {
  matched,
  phoneNumber,
  username,
  required,
  email,
  length
}
