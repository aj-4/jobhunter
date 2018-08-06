// The User model.
'use strict'; 

const config = require('../config');
const db = require('../services/database');

const JobSearch = require ('./jobSearch');

// 1: The model schema.
const modelDefinition = {
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    status: {
        type: Sequelize.STRING,
        defaultValue: config.userRoles.user
    }
};

// 2: The model options.
const modelOptions = {
    
};

// 3: Define the User model.
const JobAppliedToModel = db.define('jobs_applied_to', modelDefinition, modelOptions);

// JobAppliedToModel.belongsTo(JobSearch);

module.exports = JobAppliedToModel;