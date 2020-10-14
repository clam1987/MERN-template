const isUserAuthenticated = (req, res, next) => {
const { authorization } = req.headers
if (!authorization) {
  return res.status(401).send("You must login!");
} else {
  next();
  }
};

module.exports = isUserAuthenticated;
