const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')


passport.use(new LocalStrategy({
        usernameField: 'email'
    },

    (email, password, done) => {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then((user) => {
                if (!user) {
                    console.log('user not found')
                    return done(null, false, {
                        message: 'User was not found'
                    })
                } else {
                    console.log('user found')
                    //compare password
                    bcrypt.compare(password, user.password, (err, validPassword) => {
                        if (err) throw err
                        if (validPassword) {
                            console.log('correct password')
                            return done(null, user)
                        } else {
                            console.log('wrong password')
                            return done(null, false, {
                                message: 'wrong password'
                            })
                        }
                    })

                }
            })
            .catch(err => {
                return done(null, false, {
                    message: err
                })
            })
    }
))

passport.serializeUser(function (user, done) {
    console.log(' serl started')
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // console.log(' de-serl started', id)

    User.findOne({
            where: {
                id: id
            }
        })
        .then((user) => {
            done(null, user);
        })
        .catch((err) => console.log(err))
    // User.findByPk(id, function (err, user) {
    //     console.log(err)
    //     done(err, user);
    // });
});