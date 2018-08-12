'use strict'; 

const Sequelize = require('sequelize');

const config = require('../config');
const db = require('../services/database');

const UserModel = require('./user');
const JobSearchModel = require('./jobSearch');
const CompanyModel = require('./company');

// 1: The model schema.
const modelDefinition = {
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
const JobWorkflowModel = db.define('job_workflow', modelDefinition, modelOptions);

JobWorkflowModel.belongsTo(JobSearchModel, {foreignKey: 'job_search_id'});
JobWorkflowModel.belongsTo(UserModel, {foreignKey: 'user_id'});
JobWorkflowModel.belongsTo(CompanyModel, {foreignKey: 'company_id'});

module.exports = JobWorkflowModel;
