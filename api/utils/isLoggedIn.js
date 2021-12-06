module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new Error("sign in");
  }
  next();
};
