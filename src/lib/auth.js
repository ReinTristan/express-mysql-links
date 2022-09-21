module.exports = {
    isLogedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/signin')
        }
    },
    isNotLogedIn(req, res, next) {
        if(!req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/profile')
        }
    }
}