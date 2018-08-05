'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config');
const db = require('../services/database');
const EmailSubscriber = require('../models/emailSubscriber');

// The authentication controller.
const MailController = {};

// Register a user.
MailController.joinMailingList = (req, res) => {
    if(!req.body.email) {
        res.json({ message: 'No Email Received.' });
    } else {
        db.sync().then(() => {
            var newSubscriber = {
                email: req.body.email
            };

            return EmailSubscriber.create(newSubscriber).then(() => {
                res.status(201).json({ message: 'Added user to mailing list!' });
            });
        }).catch((error) => {
            res.status(403).json({ error: error, message: 'Email already exists!' });
        });
    }
}

module.exports = MailController;