module.exports= function isAuthenticated(req, res, next) {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/');
    } 
    next(); // user is authenticated, keep moving on to the next step
}
