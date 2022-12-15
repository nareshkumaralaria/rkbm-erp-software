import { call, put, takeEvery } from 'redux-saga/effects';

import { SUCCESS_LIGHT_TOP_RIGHT } from '../../toastify/Toastify.js';
import { deleteUserApi, getUsersApi } from '../../apis/usersApi.js';

function* deleteUser(action) {
    try {
        const response = yield call(deleteUserApi, action.payload);
        console.log(response);
        yield put({ type: 'DELETE_USERS_SUCCESS', payload: response.message });

        const userList = yield call(getUsersApi);
        yield put({ type: 'GET_USERS_LIST_SUCCESS', payload: userList });

        SUCCESS_LIGHT_TOP_RIGHT(response.message);
    } catch (e) {
        yield put({ type: 'DELETE_USERS_FAILED', message: e.message });
        console.log(e.message);
    }
}

function* deleteUserSaga() {
    yield takeEvery('DELETE_USERS_REQUESTED', deleteUser);
}

export default deleteUserSaga;