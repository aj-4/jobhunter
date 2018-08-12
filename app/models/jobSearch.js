// The User model.
'use strict'; 

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const config = require('../config');
const db = require('../services/database');

// 1: There are many job workflows tied to one job search
const modelDefinition = {

	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false
	},

	search_for_job_types: {
        type: Sequelize.STRING,
    },

    is_fresh_search: {
        type: Sequelize.BOOLEAN
    }
};

// 2: The model options.
const modelOptions = {
    
};

// 3: Define the User model.
const JobSearchModel = db.define('job_search', modelDefinition, modelOptions);


module.exports = JobSearchModel;