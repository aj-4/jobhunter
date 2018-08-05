import { EXAMPLE, EMAIL_SUB } from './types';

export function ExampleAction(pl) {
    return {
        type: EXAMPLE,
        payload: pl
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