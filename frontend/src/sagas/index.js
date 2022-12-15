import { all } from 'redux-saga/effects';
import addBranchSaga from './branchSaga/addBranchSaga.js';
import deletebranchSaga from './branchSaga/deleteBranchSaga.js';
import branchListSaga from './branchSaga/getBranchListSaga.js';
import addUserSaga from './usersSaga/addUserSaga.js';
import deleteUserSaga from './usersSaga/deleteUserSaga.js';
import usersListSaga from './usersSaga/getUsersListSaga.js';

export default function* rootSaga() {
    yield all([
        usersListSaga(),
        addUserSaga(),
        deleteUserSaga(),

        branchListSaga(),
        addBranchSaga(),
        deletebranchSaga(),
    ])
}