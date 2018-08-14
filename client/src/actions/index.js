import {
	performPost,
	performGet
} from './actionUtils'

import { 
	EXAMPLE, 
	EMAIL_SUB, 
	NEW_JOB_SEARCH,
	GET_JOB_SEARCH,
	NEW_WORKFLOW
} from './types';

export function ExampleAction(pl) {
    return {
        type: EXAMPLE,
        payload: pl
    }
}

// newJobSearch creates a job search w/ associated job workflows
export function newJobSearchAction(jobSearchData) {
	return {
		type: NEW_JOB_SEARCH,
		payload: performPost('/api/new_job_search', jobSearchData)
	}
}

// getJobSearch returns all workflows associated with a job search
export function getJobSearchAction(jobSearchId, dispatch) {
	performGet('/api/get_job_search', [jobSearchId])
	.then(res => res.json())
	.then(res2 => {
		return dispatch({
			type: GET_JOB_SEARCH,
			payload: res2
		});
	})
	.catch(err => {
		console.log('got err in getjobsearch', err);
	})
}

export function emailSubscribeAction(email) {
	return {
		type: EMAIL_SUB,
		payload: performPost('/api/subscribe', {email})
	}
}

// Update or add workflows (POST + Feedback)
export function addSingleWorkflow(workflowData) {
	return performPost('/api/new_workflow', workflowData);
}

export function updateSingleWorkflow(workflowData, workflowId) {
	workflowData.workflowId = workflowId;
	return performPost('/api/update_workflow', workflowData);
}
