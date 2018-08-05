import { EXAMPLE, EMAIL_SUB } from '../actions/types';

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