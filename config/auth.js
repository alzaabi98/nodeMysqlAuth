module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next
        }
        req.flash('errorMessage', ' you dont have permission')
        res.redirect('/users/login')
    }
}