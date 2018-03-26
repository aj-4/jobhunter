import { EXAMPLE } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case EXAMPLE:
            return Object.assign({}, state, {
                field: action.payload
            });
    }
    return state;
}