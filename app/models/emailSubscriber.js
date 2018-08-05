// The User model.
'use strict'; 

const Sequelize = require('sequelize');

const config = require('../config');
const db = require('../services/database');

const modelDefinition = {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
};

const modelOptions = {
    underscored: true
};

const EmailSubscriber = db.define('email_subscriber', modelDefinition, modelOptions);

module.exports = EmailSubscriber;