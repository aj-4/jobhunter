// The User model.
'use strict'; 

const Sequelize = require('sequelize');

const config = require('../config');
const db = require('../services/database');
const JobSearch = require ('./jobSearch');

// 1: The model schema.
const modelDefinition = {
    
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    job_search_id: {
    	type: Sequelize.INTEGER,
    	allowNull: false
    },

    company_id: {
    	type: Sequelize.INTEGER,
        allowNull: false
    },

    job_title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    workflow_status: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

// 2: The model options.
const modelOptions = {
    
};

// 3: Define the User model.
const JobAppliedToModel = db.define('job_workflow', modelDefinition, modelOptions);

module.exports = JobAppliedToModel;