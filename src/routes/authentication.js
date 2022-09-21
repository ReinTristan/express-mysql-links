const { Router } = require('express')
const router = Router()
const passport = require('passport')
const { isLogedIn, isNotLogedIn } = require('../lib/auth')
router.get('/signup', isNotLogedIn, (req, res) => {
    res.render('auth/signup')
})
router.post('/signup', passport.authenticate('local-signup', { 
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/signin', isNotLogedIn, (req, res) => {
    res.render('auth/signin')
})
router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})
router.get('/profile' , isLogedIn, (req, res) => {
    res.render('profile')
})
router.get('/logout', isLogedIn, (req, res) => {
    req.logOut()
    res.redirect('/signin')
})
module.exports = router