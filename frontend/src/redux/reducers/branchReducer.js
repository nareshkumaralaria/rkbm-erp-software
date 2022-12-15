import * as type from '../types.js';

// defining get branch initial state
const initialGetBranchState = {
    branchList: [],
    loading: false,
    error: null,
}

const initialAddBranchState = {
    loading: false,
    error: null,
}

const initialDeleteBranchtState = {
    loading: false,
    message: "",
    error: null,
}

const initialUpdateBranchState = {
    loading: false,
    message: "",
    error: null,
}

// defining get users reducer
export function getBranchListReducer(state = initialGetBranchState, action) {
    switch (action.type) {
        case type.GET_BRANCH_LIST_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_BRANCH_LIST_SUCCESS:
            return {
                ...state,
                branchList: action.payload,
                loading: false,
            }
        case type.GET_BRANCH_LIST_FAILED:
            return {
                ...state,
                error: action.message,
                loading: false,
            }
        default:
            return state
    }
}

// defining add user reducer
export function addBranchReducer(state = initialAddBranchState, action) {
    switch (action.type) {
        case type.ADD_BRANCH_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_BRANCH_SUCCESS:
            return {
                ...state,
                error: !action.payload,
                loading: false,
            }
        case type.ADD_BRANCH_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

// defining delete appointments reducer
export function deleteBranchReducer(state = initialDeleteBranchtState, action) {
    switch (action.type) {
        case type.DELETE_BRANCH_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_BRANCH_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
            }
        case type.DELETE_BRANCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

//defining update appointments reducer
export function updateBranchReducer(state = initialUpdateBranchState, action) {
    switch (action.type) {
        case type.UPDATE_BRANCH_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_BRANCH_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
            }
        case type.UPDATE_BRANCH_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
