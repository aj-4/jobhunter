'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config');
const db = require('../services/database');
const User = require('../models/user');

// The authentication controller.
const AuthController = {};

// Register a user.
AuthController.signUp = (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.json({ message: 'Please provide a email and a password.' });
    } else {
        db.sync().then(() => {
            var newUser = {
                email: req.body.email,
                password: req.body.password
            };

            return User.create(newUser).then(() => {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch((error) => {
            res.status(403).json({ error: error, message: 'Email already exists!' });
        });
    }
}

// Login as user.
AuthController.authenticateUser = (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(404).json({ message: 'email and password are needed!' });
    } else {
        const email = req.body.email;
        const password = req.body.password;
        const potentialUser = { where: { email: email } };

        User.findOne(potentialUser).then((user) => {
            if(!user) {
                res.status(404).json({ message: 'Authentication failed!' });
            } else {
                user.comparePasswords(password, (error, isMatch) => {
                    if(isMatch && !error) {
                        const token = jwt.sign(
                            { email: user.email },
                            config.keys.secret,
                            { expiresIn: config.keys.expirationTime }
                        );

                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(404).json({ message: 'Login failed!' });
                    }
                });
            }
        }).catch((error) => {
            res.status(500).json({ message: 'There was an error!', error: error });
        });
    }
}

module.exports = AuthController;