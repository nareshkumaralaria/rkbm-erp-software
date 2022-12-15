import { call, put, takeEvery } from 'redux-saga/effects';

import { ERROR_LIGHT_TOP_RIGHT, SUCCESS_LIGHT_TOP_RIGHT } from '../../toastify/Toastify';
import { addUserApi, getUsersApi } from "../../apis/usersApi.js";

function* addUser(action) {
    try {
        const response = yield call(addUserApi, action.payload);
        yield put({ type: 'ADD_USERS_SUCCESS', payload: response.error });
        if (response.error) {
            ERROR_LIGHT_TOP_RIGHT(response.message);
        } else {
            SUCCESS_LIGHT_TOP_RIGHT(response.message);
        }

        const userList = yield call(getUsersApi);
        yield put({ type: 'GET_USERS_LIST_SUCCESS', payload: userList });

    } catch (error) {
        yield put({ type: 'ADD_USERS_FAILED' });
        ERROR_LIGHT_TOP_RIGHT("SERVER ERROR!!");
    }
}

function* addUserSaga() {
    yield takeEvery('ADD_USERS_REQUESTED', addUser);
}

export default addUserSaga;