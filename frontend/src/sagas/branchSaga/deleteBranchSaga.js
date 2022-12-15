import { call, put, takeEvery } from 'redux-saga/effects';

import { SUCCESS_LIGHT_TOP_RIGHT } from '../../toastify/Toastify.js';
import { deleteBranchApi, getBranchApi } from '../../apis/branchApi.js';

function* deleteBranch(action) {
    try {
        const response = yield call(deleteBranchApi, action.payload);
        console.log(response);
        yield put({ type: 'DELETE_BRANCH_SUCCESS', payload: response.message });

        const userList = yield call(getBranchApi);
        yield put({ type: 'GET_BRANCH_LIST_SUCCESS', payload: userList });

        SUCCESS_LIGHT_TOP_RIGHT(response.message);
    } catch (e) {
        yield put({ type: 'DELETE_BRANCH_FAILED', message: e.message });
        console.log(e.message);
    }
}

function* deletebranchSaga() {
    yield takeEvery('DELETE_BRANCH_REQUESTED', deleteBranch);
}

export default deletebranchSaga;