var functionObject = {}
functionObject.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};
module.exports = functionObject;