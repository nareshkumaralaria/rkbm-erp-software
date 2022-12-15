import { call, put, takeEvery } from 'redux-saga/effects';

import { getUsersApi } from "../../apis/usersApi.js";

function* fetchUsersList() {
    try {
        const usersList = yield call(getUsersApi);
        yield put({ type: 'GET_USERS_LIST_SUCCESS', payload: usersList });
    } catch (e) {
        yield put({ type: 'GET_USERS_LIST_FAILED', message: e.message });
    }
}

function* usersListSaga() {
    yield takeEvery('GET_USERS_LIST_REQUESTED', fetchUsersList);
}

export default usersListSaga;