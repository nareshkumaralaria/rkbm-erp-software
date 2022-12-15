// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { branch_schema } from '../../schema/branch/branchSchema.js'

// customer collection(or model)
const Branch = new mongoose.model("branch", branch_schema);

const updateBranch = (req, res) => {
    // Geting values from forntend
    const { update } = req.body

    Branch.findByIdAndUpdate(
        { _id : update.branchId},
        {
            $set: { 
                branchName: update.branchName,
                email: update.email,
                phoneNumber: update.phoneNumber,
                gstNumber: update.gstNumber,
                address: update.address,
                city: update.city,
                state: update.state,
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

export default updateBranch;