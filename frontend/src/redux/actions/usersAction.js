import * as type from '../types';

// defining get Appointment list action
export function getUsersList() {
    return {
        type: type.GET_USERS_LIST_REQUESTED,
    }
}

// defining add user action
export function addUser(formValues) {
    return {
        type: type.ADD_USERS_REQUESTED,
        payload: formValues,
    }
}

// defining delete user action
export function deleteUser(id) {
    return {
        type: type.DELETE_USERS_REQUESTED,
        payload: id,
    }
}

// defining update user action
export function updateUser(updatedFormValues) {
    return {
        type: type.UPDATE_USERS_REQUESTED,
        payload: updatedFormValues,
    }
}