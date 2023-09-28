import rules from "./rules";
import regex from "./regex";

const validator = (value, validations) => {
  let validationResult = [];

  for (const validator of validations) {
    if (validator.value === rules.requiredValue) {
      value.trim().length === 0 && validationResult.push(false);
    }
    if (validator.value === rules.minValue) {
      value.trim().length < validator.min && validationResult.push(false);
    }
    if (validator.value === rules.maxValue) {
      value.trim().length > validator.max && validationResult.push(false);
    }
    if (validator.value === rules.emailValue) {
      !regex.testEmail(value) && validationResult.push(false);
    }
  }

  if (validationResult.length) {
    return false;
  } else {
    return true;
  }
  console.log(validationResult);
};

export default validator;
