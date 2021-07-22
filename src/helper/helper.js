const bcrypt = require("bcrypt");

const encryptPWD = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

const comparePWD = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

module.exports = { encryptPWD, comparePWD };
