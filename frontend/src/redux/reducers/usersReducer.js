import * as type from '../types.js';

// defining get user initial state
const initialGetUsersState = {
    usersList: [],
    loading: false,
    error: null,
}

const initialAddUserState = {
    loading: false,
    error: null,
}

const initialDeleteUsertState = {
    loading: false,
    message: "",
    error: null,
}

const initialUpdateUserState = {
    loading: false,
    message: "",
    error: null,
}

// defining get users reducer
export function getUsersListReducer(state = initialGetUsersState, action) {
    switch (action.type) {
        case type.GET_USERS_LIST_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_USERS_LIST_SUCCESS:
            return {
                ...state,
                usersList: action.payload,
                loading: false,
            }
        case type.GET_USERS_LIST_FAILED:
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
export function addUserReducer(state = initialAddUserState, action) {
    switch (action.type) {
        case type.ADD_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_USERS_SUCCESS:
            return {
                ...state,
                error: !action.payload,
                loading: false,
            }
        case type.ADD_USERS_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

// defining delete appointments reducer
export function deleteUserReducer(state = initialDeleteUsertState, action) {
    switch (action.type) {
        case type.DELETE_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_USERS_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
            }
        case type.DELETE_USERS_FAILED:
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
export function updateUserReducer(state = initialUpdateUserState, action) {
    switch (action.type) {
        case type.UPDATE_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_USERS_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
            }
        case type.UPDATE_USERS_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
