import * as type from '../types';

// defining get branch list action
export function getBranchList() {
    return {
        type: type.GET_BRANCH_LIST_REQUESTED,
    }
}

// defining add Branch action
export function addBranch(formValues) {
    return {
        type: type.ADD_BRANCH_REQUESTED,
        payload: formValues,
    }
}

// defining delete Branch action
export function deleteBranch(id) {
    return {
        type: type.DELETE_BRANCH_REQUESTED,
        payload: id,
    }
}

// defining update Branch action
export function updateBranch(updatedFormValues) {
    return {
        type: type.UPDATE_BRANCH_REQUESTED,
        payload: updatedFormValues,
    }
}