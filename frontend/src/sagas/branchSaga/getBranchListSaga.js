import { call, put, takeEvery } from 'redux-saga/effects';

import { getBranchApi } from '../../apis/branchApi.js';

function* fetchBranchList() {
    try {
        const branchList = yield call(getBranchApi);
        yield put({ type: 'GET_BRANCH_LIST_SUCCESS', payload: branchList });
    } catch (e) {
        yield put({ type: 'GET_BRANCH_LIST_FAILED', message: e.message });
    }
}

function* branchListSaga() {
    yield takeEvery('GET_BRANCH_LIST_REQUESTED', fetchBranchList);
}

export default branchListSaga;