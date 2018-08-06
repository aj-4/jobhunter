'use strict';

const router = require('express').Router();

const config = require('../config');
const AuthController = require('../controllers/authController');
const MailController = require('../controllers/mailController');
const allowOnly = require('../services/routesHelper').allowOnly;
const UserController = require('../controllers/userController');
const AdminController = require('../controllers/adminController');
const JobsController = require('../controllers/jobsController');

const APIRoutes = (passport) => {

	// Subscribe to Mailing List
	router.post('/subscribe', MailController.joinMailingList);
	router.post('/new_job_search', JobsController.newJobSearch);

	// User Actions
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    // Protected Routes
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    return router;
};

module.exports = APIRoutes;