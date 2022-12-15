import { call, put, takeEvery } from 'redux-saga/effects';

import { ERROR_LIGHT_TOP_RIGHT, SUCCESS_LIGHT_TOP_RIGHT } from '../../toastify/Toastify';
import { getBranchApi, addBranchApi } from "../../apis/branchApi.js";

function* addBranch(action) {
    try {
        const response = yield call(addBranchApi, action.payload);
        yield put({ type: 'ADD_BRANCH_SUCCESS', payload: response.error });
        if (response.error) {
            ERROR_LIGHT_TOP_RIGHT(response.message);
        } else {
            SUCCESS_LIGHT_TOP_RIGHT(response.message);
        }

        const branchList = yield call(getBranchApi);
        yield put({ type: 'GET_BRANCH_LIST_SUCCESS', payload: branchList });

    } catch (error) {
        yield put({ type: 'ADD_BRANCH_FAILED' });
        ERROR_LIGHT_TOP_RIGHT("SERVER ERROR!!");
    }
}

function* addBranchSaga() {
    yield takeEvery('ADD_BRANCH_REQUESTED', addBranch);
}

export default addBranchSaga;