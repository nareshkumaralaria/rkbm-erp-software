import httpService from "./httpService";
import { base_url } from "./config";

// Get Users data
export const getUsersApi = async () => {
    try {
        const response = await httpService.get(`${base_url}/getEmployeeData`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Add Users
export const addUserApi = async (formValues, imageUrl) => {
    const response = await httpService.post(`${base_url}/addNewEmployee`, { formValues, imageUrl });
    return response.data;
}

// delete Users
export const deleteUserApi = async (id) => {
    try {
        const response = await httpService.post(`${base_url}/employee/delete`, { id });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// update Users
export const updateUserApi = async (update) => {
    try {
        const response = await httpService.post(`${base_url}/updateEmployee`, { update });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}