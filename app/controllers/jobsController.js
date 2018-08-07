'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config');
const db = require('../services/database');
const JobSearch = require('../models/jobSearch');
const JobWorkflow = require('../models/jobWorkflow');

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

    console.log('reqbody is', req.body);

    const {jobSearchData: {userId, jobSearchId}} = req.body;

	return db.sync().then(() => {
        console.log('workflow is', workflow, 'id is', userId);
        console.log('all data', userId, jobSearchId, workflow.companyId, workflow.title, workflow.status);

            const newWorkflow = {
                user_id: userId,
    			job_search_id: jobSearchId,
    			company_id: workflow.companyId,
    			job_title: workflow.title,
    			workflow_status: workflow.status
    		};

            return JobWorkflow.create(newWorkflow)
            .then(() => {
                console.log('successfully created workflow');
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

	console.log(`Inserting ${jobsAppliedRows.length} new job workflows`);

	if(!jobSearchId) {
        res.json({ message: 'No Job Search ID found' });
    } else {

    	const workflowPromises = [];

        jobsAppliedRows.forEach(workflow => {
            workflowPromises.push(insertWorkflow(req, workflow));
        });

    	Promise.all(workflowPromises).then(resolution => {
    		console.log('resolved promises', resolution);
            return res.status(201).json({ message: 'Added Job Workflows!' });    		
    	}).catch((error) => {
            res.status(403).json({ error: error, message: 'Could not create workflows' });
        });

    }
}

module.exports = JobsController;