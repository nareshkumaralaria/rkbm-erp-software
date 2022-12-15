import { combineReducers } from 'redux';
import { addBranchReducer, deleteBranchReducer, getBranchListReducer, updateBranchReducer } from './branchReducer';
import { getUsersListReducer, addUserReducer, deleteUserReducer, updateUserReducer } from './usersReducer';


//defining root reducer
const rootReducer = combineReducers({
    getUsersListReducer: getUsersListReducer,
    addUserReducer: addUserReducer,
    deleteUserReducer: deleteUserReducer,
    updateUserReducer: updateUserReducer,

    getBranchListReducer: getBranchListReducer,
    addBranchReducer: addBranchReducer,
    deleteBranchReducer: deleteBranchReducer,
    updateBranchReducer: updateBranchReducer,
})

export default rootReducer;