'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config');
const db = require('../services/database');
const JobSearch = require('../models/jobSearch');
const JobWorkflow = require('../models/jobWorkflow');
const Company = require('../models/company');
const User = require('../models/user');

const Sequelize = require('sequelize');

// The authentication controller.
const JobsController = {};

// A job search is tied to a user
JobsController.newJobSearch = (req, res, next) => {

	const {jobSearchData: {
		userId, hasStartedJobSearch, jobType
	}} = req.body;

    if(!jobType) {
        res.json({ message: 'No job type defined for search' });
    } else {
        db.sync().then(() => {
            var newJobSearch = {
            	user_id: userId,
                is_fresh_search: hasStartedJobSearch,
			    search_for_job_types: jobType
            };
            return JobSearch.create(newJobSearch).then(insertData => {
            	req.body.jobSearchData.jobSearchId = insertData.dataValues.id;
            	return next();
                // res.status(201).json({ message: 'Created new job search', id: insertData.dataValues.id});
            })
        }).catch((error) => {
            res.status(403).json({ error: error, message: 'Could not create job search' });
        });
    }
}

const insertWorkflow = (req, workflow) => {

    const {jobSearchData: {userId, jobSearchId}} = req.body;

	return db.sync().then(() => {

            const newWorkflow = {
                user_id: userId,
    			job_search_id: jobSearchId,
    			company_id: workflow.companyId,
    			job_title: workflow.title,
    			workflow_status: workflow.status
    		};

            return JobWorkflow.create(newWorkflow, {
                include: [User, JobSearch, Company]
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.log('error in create workflow', err);
            });

        }).catch((error) => {
            console.log('error in db sync for insert workflow', error)
        });
}

// Job workflows are jobs which have been applied to
JobsController.insertWorkflows = (req, res) => {

	const {jobSearchData: {jobsAppliedRows, jobSearchId}} = req.body;

	if(!jobSearchId) {
        res.json({ message: 'No Job Search ID found' });
    } else {

    	const workflowPromises = [];

        jobsAppliedRows.forEach(workflow => {
            workflowPromises.push(insertWorkflow(req, workflow));
        });

    	Promise.all(workflowPromises).then(() => {
            return res.status(201).json({ message: 'Added Job Workflows!' });    		
    	}).catch((error) => {
            res.status(403).json({ error: error, message: 'Could not create workflows' });
        });

    }
}

JobsController.insertSingleWorkflow = () => {
    // TODO
    res.status(200);
}

JobsController.updateSingleWorkflow = (req, res) => {
    // TODO
    res.status(200);
}

JobsController.getJobSearch = (req, res) => {
    const {jobSearchId} = req.params;

    if (!jobSearchId) {
        res.json({ message: 'No Job Search Selected' });
    } else {
        JobWorkflow.findAll({
            where: {job_search_id: jobSearchId},
            include: [{model: Company, attributes: ['name']}]
        })
        .then(rows => {
            const rowsMap = {};
            rows.forEach(row => {
                if (!rowsMap[row.workflow_status]) {
                    rowsMap[row.workflow_status] = [];
                }
                rowsMap[row.workflow_status].push(row);
            });
            return res.status(201).json({workflows: rowsMap})
        })
        .catch(err => res.json({error: err, message: 'Failed to get job search'}))
    }
}

module.exports = JobsController;
