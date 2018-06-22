export const UPDATE_DATA = 'data: updateBaseData';

export function updateBaseData(newData) {
    return {
        type: UPDATE_DATA,
        payload: {
            data: newData
        }
    }
}