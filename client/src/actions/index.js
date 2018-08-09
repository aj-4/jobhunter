import { 
	EXAMPLE, 
	EMAIL_SUB, 
	NEW_JOB_SEARCH,
	GET_JOB_SEARCH
} from './types';

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

export function getJobSearch(jobSearchId) {
	return fetch(`/api/get_job_search/${jobSearchId}`);
}
export function getJobSearchAction(jobSearchId, dispatch) {
	getJobSearch(jobSearchId)
	.then(res => res.json())
	.then(res2 => {
		return dispatch({
			type: GET_JOB_SEARCH,
			payload: res2
		});
	})
	.catch(err => {
		console.log('got err', err);
	})
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
