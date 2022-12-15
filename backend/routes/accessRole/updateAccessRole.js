// mongoose importing
import mongoose from 'mongoose'

// employee_schema importing
import { AccessRole_Schema } from '../../schema/accessRoleSchema.js'

// employee collection(or model)
const AccessRole = new mongoose.model("accessRole", AccessRole_Schema);

const updateAccessRole = (req, res) => {
    // Geting values from forntend
    const { update } = req.body

    AccessRole.findByIdAndUpdate(
        { _id : update.userId},
        {
            $set: { 
                roleName: update.roleName,
                dashboard: update.dashboard,
                clients: update.clients,
                accounting: update.accounting,
                reports: update.reports,
                surat: update.surat,
                mumbai: update.mumbai,
            }
        },
        (err, list) => {
            if(err){
                console.log(err)
            }else{
                if(list){
                    return res.send({
                        message : "doc updated"
                    })
                }
            }
        }
        )
}

export default updateAccessRole;