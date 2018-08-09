import { EXAMPLE, EMAIL_SUB, GET_JOB_SEARCH } from '../actions/types';

export const exampleReducer = (state = {}, action) => {
    switch(action.type) {
        case EXAMPLE:
            return Object.assign({}, state, {
                field: action.payload
            });
    }
    return state;
}

export const landingPageReducer = (state ={}, action) => {
	switch(action.type) {
		case EMAIL_SUB:
			return Object.assign({}, state, {
				emailSaved: true
			})
	}
    return state;
}

export const jobSearchReducer = (state ={}, action) => {
    switch(action.type) {
        case GET_JOB_SEARCH:
            return Object.assign({}, state, {
                jobSearchBuckets: action.payload.workflows
            })
    }
    return state;
}