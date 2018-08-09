'use strict';

const config = require('../config');
const db = require('../services/database');
const Company = require('../models/company');

// The authentication controller.
const CompaniesController = {};

const findOrCreateCompany = (model, conditions, req, index) => {
	
	const {jobSearchData: {jobsAppliedRows}} = req.body;

	return model.findOrCreate({where: conditions})
	.spread((company, created) => {
		req.body.jobSearchData.jobsAppliedRows[index].companyId = company.dataValues.id;
	}).catch(err => 'Find or Create Company Failed')
}

// A job search is tied to a user
CompaniesController.findOrCreate = (req, res, next) => {

	const {jobSearchData: {jobsAppliedRows}} = req.body;

	const companyPromises = [];

	jobsAppliedRows.forEach((jobApplied, index) => {
		companyPromises.push(findOrCreateCompany(Company, {name: jobApplied.company}, req, index));		
	})

	Promise.all(companyPromises).then(output => {
		return next();
	})
}

module.exports = CompaniesController;