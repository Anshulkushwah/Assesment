const validateField = (value, field) => {
  const errors = [];
  
  if (field.required && (!value || value.toString().trim() === '')) {
    errors.push('This field is required');
  }
  
  if (value && field.validations) {
    if (field.validations.minLength && value.toString().length < field.validations.minLength) {
      errors.push(`Minimum length is ${field.validations.minLength}`);
    }
    
    if (field.validations.maxLength && value.toString().length > field.validations.maxLength) {
      errors.push(`Maximum length is ${field.validations.maxLength}`);
    }
    
    if (field.validations.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push('Please enter a valid email address');
    }
    
    if (field.validations.password) {
      if (value.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/\d/.test(value)) {
        errors.push('Password must contain at least one number');
      }
    }
  }
  
  return errors;
};

export default validateField;