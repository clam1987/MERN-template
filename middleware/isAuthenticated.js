const isUserAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.send("You must login!");
  }
};

module.exports = isUserAuthenticated;
