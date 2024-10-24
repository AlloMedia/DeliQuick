import { ERROR_MESSAGES, REGEX } from '../constants';

export const validateField = (name, value, formData = {}) => {
  if (!value && name !== 'phone') return ERROR_MESSAGES.required(name);

  switch (name) {
    case 'email':
      if (!REGEX.EMAIL.test(value)) return ERROR_MESSAGES.email;
      break;

    case 'password':
      if (!REGEX.PASSWORD.test(value)) return ERROR_MESSAGES.password;
      break;

    case 'confirmPassword':
      if (value !== formData.password) return ERROR_MESSAGES.passwordMatch;
      break;

    case 'name':
      if (!REGEX.NAME.test(value)) return ERROR_MESSAGES.name;
      break;

    case 'address':
      if (!REGEX.ADDRESS.test(value)) return ERROR_MESSAGES.address;
      break;

    case 'phone':
      if (value && !REGEX.PHONE.test(value)) return ERROR_MESSAGES.phone;
      break;

    default:
      break;
  }

  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  Object.keys(formData).forEach(key => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });
  return errors;
};