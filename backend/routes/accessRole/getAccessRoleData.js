// mongoose importing
import mongoose from 'mongoose'

// employee_schema importing
import { AccessRole_Schema } from '../../schema/accessRoleSchema.js'

// employee collection(or model)
const AccessRole = new mongoose.model("accessRole", AccessRole_Schema);

const getAccessRoleData = async (req, res) => {
    try {
        const accessRole = await AccessRole.find({})
        return res.send(accessRole);
    } catch (error) {
        console.log(error);
    }
}

export default getAccessRoleData;