import { EXAMPLE } from '../actions/types';

export const example = (state = {}, action) => {
    switch(action.type) {
        case EXAMPLE:
            return Object.assign({}, state, {
                field: action.payload
            });
    }
    return state;
}

export const saveEmail = (state ={}, action) => {
	switch(action.type) {
		case SAVE_EMAIL:
			return Object.assign({}, state, {
				
			})
	}
}