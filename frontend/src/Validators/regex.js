const testEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/g;
  return emailPattern.test(value)
};

const testCodeMelli = (value) => {};

const testPhoneNumber = (value) => {};

export default { testCodeMelli, testEmail, testPhoneNumber };
