// The User model.
'use strict'; 

const Sequelize = require('sequelize');

const config = require('../config');
const db = require('../services/database');

// 1: The model schema.
const modelDefinition = {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    website_url: {
        type: Sequelize.STRING,
    },

    glassdoor_url: {
        type: Sequelize.INTEGER
    }
};

// 2: The model options.
const modelOptions = {
    
};

// 3: Define the User model.
const CompanyModel = db.define('company', modelDefinition, modelOptions);

module.exports = CompanyModel;