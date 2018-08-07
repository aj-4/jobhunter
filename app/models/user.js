// The User model.
'use strict'; 

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const config = require('../config');
const db = require('../services/database');
const JobSearchModel = require('./jobSearch');
const JobWorkflowModel = require('./jobWorkflow');

// 1: The model schema.
const modelDefinition = {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    role: {
        type: Sequelize.INTEGER,
        defaultValue: config.userRoles.user
    }
};

// 2: The model options.
const modelOptions = {
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
const UserModel = db.define('user', modelDefinition, modelOptions);

UserModel.hasMany(JobSearchModel, {foreignKey: 'user_id'});
UserModel.hasMany(JobWorkflowModel, {foreignKey: 'user_id'});

UserModel.prototype.comparePasswords = comparePasswords;

// Compares two passwords.
function comparePasswords(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// Hashes the password for a user object.
function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}

module.exports = UserModel;