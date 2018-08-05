'use strict';

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../models/user');
const config = require('./../config');

// Hooks the JWT Strategy.
const hookJWTStrategy = (passport) => {
    const options = {};

    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, (JWTPayload, callback) => {
        User.findOne({ where: { email: JWTPayload.email } })
            .then(user => {
                if(!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            });
    }));
}

module.exports = hookJWTStrategy;