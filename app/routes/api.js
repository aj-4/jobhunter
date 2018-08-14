'use strict';

const router = require('express').Router();

const config = require('../config');
const AuthController = require('../controllers/authController');
const MailController = require('../controllers/mailController');
const allowOnly = require('../services/routesHelper').allowOnly;
const UserController = require('../controllers/userController');
const AdminController = require('../controllers/adminController');
const JobsController = require('../controllers/jobsController');
const CompaniesController = require('../controllers/companiesController');

const APIRoutes = (passport) => {

	// Subscribe to Mailing List
    router.post('/subscribe', MailController.joinMailingList);
    
    // Get all workflows for job search
    router.get('/get_job_search/:jobSearchId', JobsController.getJobSearch);

    // Create Workflow / Search
    router.post('/new_job_search', JobsController.newJobSearch, CompaniesController.findOrCreate, JobsController.insertWorkflows);
    router.post('/add_workflow', CompaniesController.findOrCreate, JobsController.insertSingleWorkflow);
    router.post('/update_workflow', CompaniesController.findOrCreate, JobsController.updateSingleWorkflow);

	// Login / Sign Up
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    // Protected Routes
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    return router;
};

module.exports = APIRoutes;