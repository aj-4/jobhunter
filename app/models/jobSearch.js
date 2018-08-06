// The User model.
'use strict'; 

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const config = require('../config');
const db = require('../services/database');

const JobWorkflowModel = require('./jobWorkflow');

// 1: The model schema.
const modelDefinition = {
    is_fresh_search: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    search_category: {
        type: Sequelize.STRING,
        defaultValue: config.userRoles.user
    },

    number_jobs_applied_for: {
    	type: Sequelize.INTEGER
    }
};

// 2: The model options.
const modelOptions = {
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
const JobSearchModel = db.define('job_search', modelDefinition, modelOptions);

JobSearchModel.hasMany(JobWorkflowModel);

module.exports = JobSearchModel;