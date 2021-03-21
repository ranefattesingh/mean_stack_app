const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../models/user')
const config = require('../config/database')

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({
                success: false,
                message: 'failed to register user'
            })
        } else {
            res.json({
                success: true,
                message: `${user.name} is now registered`
            })
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err
        if(!user) {
            return res.json({
                success: false,
                msg: 'user not found!'
            })
        } else {
            User.comparePassword(password, user.password, (err, isMatched) => {
                if(err) throw err
                if(isMatched) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800 // 1 week
                    })

                    res.json({
                        success: true,
                        token: `bearer ${token}`,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    })
                } else {
                    return res.json({
                        success:false,
                        msg: 'username or password is incorrect'
                    })
                }
            })
        }
    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    res.json({
        user: req.user
    })
});

module.exports = router;