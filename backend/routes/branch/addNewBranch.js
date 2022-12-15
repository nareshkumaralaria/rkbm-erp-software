// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { branch_schema } from '../../schema/branch/branchSchema.js'

// customer collection(or model)
const Branch = new mongoose.model("branch", branch_schema);

const addNewBranch = async (req, res) => {
    // Geting values from forntend
    const { formValues } = req.body;
    
    try {
        const branch = await Branch.findOne({ email: formValues.email})
        if(branch){
            if (branch.email === formValues.email) {
                return res.send({
                    message: "Email already exist"
                })
            }
        }else{
            // Creating customer document
            const branch = new Branch({
                branchName: formValues.branchName,
                email: formValues.email,
                phoneNumber: formValues.phoneNumber,
                gstNumber: formValues.gstNumber,
                address: formValues.address,
                city: formValues.city,
                state: formValues.state
            })
            // Saving customer on DB(back-End)
            await branch.save()
            return res.send({
                message : "branch created"
            })
        }
    } catch (error) {
        console.log(error)
    }

}

export default addNewBranch;