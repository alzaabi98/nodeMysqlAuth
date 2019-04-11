const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/User')
// login route
router.get('/login', (req, res) => {
    res.render("login")
})


// register routes
router.get('/register', (req, res) => {
    res.render("register")
})


router.post('/register', (req, res) => {

    const {
        email,
        password,
        password2
    } = req.body

    //validation
    let errors = []
    if (!email || !password || !password2) {
        errors.push({
            msg: 'please enter all fields'
        })
    }

    if (password !== password2) {
        errors.push({
            msg: 'passwordds must match'
        })
    }

    if (password.length < 3) {
        errors.push({
            msg: 'password must be at least 3 chars'
        })
    }


    if (errors.length > 0) {

        res.render('register', {
            errors
        })
    } else {
        //validation succeful and now enter user in database
        //check if user exsits
        User.findOne({
                where: {
                    email: email
                }
            })
            .then((user) => {
                if (user) {

                    errors.push({
                        msg: 'user was found'
                    })
                    res.render('register', errors)
                } else {
                    //create user

                    const newUser = new User({
                        email,
                        password
                    })

                    //generate hashed password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            console.log(hash)
                            newUser.save()
                                .then((user) => {
                                    console.log('user saved')
                                    res.redirect('/users/login')
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.redirect('/users/register')
                                })
                        })
                    })

                }
            })
            .catch(err => console.log(err))

    }

})


module.exports = router