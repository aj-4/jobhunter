import { EXAMPLE, EMAIL_SUB, NEW_JOB_SEARCH } from './types';

export function ExampleAction(pl) {
    return {
        type: EXAMPLE,
        payload: pl
    }
}

function newJobSearch(jobSearchData) {
	return fetch(
		'/api/new_job_search',
		{
			method: 'POST',
			body: JSON.stringify(jobSearchData),
			headers:{
				'Content-Type': 'application/json'
			}
		}
	)
}
export function newJobSearchAction(jobSearchData) {
	return {
		type: NEW_JOB_SEARCH,
		payload: newJobSearch(jobSearchData)
	}
}

function emailSubscribe(email) {
	return fetch(
		'/api/subscribe', 
		{
	  		method: 'POST', 
	  		body: JSON.stringify({email}), 
	  		headers:{
	    		'Content-Type': 'application/json'
  			}
  		}
  	);
}
export function emailSubscribeAction(email) {
	return {
		type: EMAIL_SUB,
		payload: emailSubscribe(email)
	}
}