const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "dhsudhs||$#@&^!*()ofjodkas jktg67e9122330ij*())&*^$@!";

const encryptPWD = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

const comparePWD = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  // chech if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split Space bearer+Token
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    try {
      const decoded = jwt.verify(bearerToken, JWT_SECRET);
      // req.post = decoded;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { encryptPWD, comparePWD, verifyToken };
