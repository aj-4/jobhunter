import { EXAMPLE } from './types';

export function ExampleAction(pl) {
    return {
        type: EXAMPLE,
        payload: pl
    }
}