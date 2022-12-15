// mongoose importing
import mongoose from 'mongoose'

// employee_schema importing
import { AccessRole_Schema } from '../../schema/accessRoleSchema.js'

// employee collection(or model)
const AccessRole = new mongoose.model("accessRole", AccessRole_Schema);

const deleteAccessRole = async (req, res) => {
    const { id } = req.body;

    try {
        const accessRole = await AccessRole.deleteOne({ "_id" : id })
        if(accessRole){
            return res.send({
                message : "deleted"
            })
        }else{
            console.log("err")
        }
    } catch (error) {
        console.log(error);
    }
}

export default deleteAccessRole;