const isValidEmail = (Email) => {
  return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email);
};

const isValidPhone = (Mobile) => {
  return /^[6-9]\d{9}$/.test(Mobile);
};

const isValidPwd = (Password) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
    Password
  );
};

const isValidString = (String) => {
  return /^[a-zA-Z]+$/.test(String);
};


export { isValidEmail, isValidPhone, isValidPwd, isValidString };