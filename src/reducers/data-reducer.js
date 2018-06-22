import {UPDATE_DATA} from './data-actions'

export default function dataReducer(state = [], {type, payload}) {
    switch(type) {
        case UPDATE_DATA:
            return payload.data;
        default:
            return state;
    }
}