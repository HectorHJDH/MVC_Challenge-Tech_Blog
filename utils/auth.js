// If the user is not logged in, redirect the request to the login route
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    // If the user is logged in, execute the route function that will allow them to view the page
    next();
  }
};

module.exports = withAuth;
