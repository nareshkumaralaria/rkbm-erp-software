import httpService from "./httpService";
import { base_url } from "./config";

// Get Branch data
export const getBranchApi = async () => {
    try {
        const response = await httpService.get(`${base_url}/getBranchData`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Add Branch
export const addBranchApi = async (formValues) => {
    const response = await httpService.post(`${base_url}/addNewBranch`, { formValues });
    return response.data;
}

// delete Branch
export const deleteBranchApi = async (id) => {
    try {
        const response = await httpService.post(`${base_url}/branch/delete`, { id });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// update Branch
export const updateBranchApi = async (update) => {
    try {
        const response = await httpService.post(`${base_url}/updateBranch`, { update });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}