// mongoose importing
import mongoose from 'mongoose'

// employee_schema importing
import { AccessRole_Schema } from '../../schema/accessRoleSchema.js'

// employee collection(or model)
const AccessRole = new mongoose.model("accessRole", AccessRole_Schema);

const addAccessRole = async (req, res) => {
    // Geting values from forntend
    const { formValues } = req.body;
    
    try {
        const accessRole = await AccessRole.findOne({ roleName: formValues.roleName})
        if(accessRole){
            if (accessRole.roleName === formValues.roleName) {
                return res.send({
                    message: "Role Name already exist"
                })
            }
        }else{
            // Creating employee document
            const accessRole = new AccessRole({
                roleName: formValues.roleName,
                dashboard: formValues.dashboard,
                clients: formValues.clients,
                accounting: formValues.accounting,
                reports: formValues.reports,
                surat: formValues.surat,
                mumbai: formValues.mumbai,
            })
            // Saving customer on DB(back-End)
            await accessRole.save();
            return res.send({
                message : "Access Role created"
            })
        }
    } catch (error) {
        console.log(error);
    }

}

export default addAccessRole;