// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { branch_schema } from '../../schema/branch/branchSchema.js'

// customer collection(or model)
const Branch = new mongoose.model("branch", branch_schema);

const deleteBranch = async (req, res) => {
    const { id } = req.body;

    try {
        const branch = await Branch.deleteOne({ "_id" : id })
        if(branch){
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

export default deleteBranch;