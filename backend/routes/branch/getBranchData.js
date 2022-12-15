// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { branch_schema } from '../../schema/branch/branchSchema.js'

// customer collection(or model)
const Branch = new mongoose.model("branch", branch_schema);

const getBranchData = async (req, res) => {
    try {
        const branch = await Branch.find({})
        return res.send(branch)
    } catch (error) {
        console.log(error)
    }
}

export default getBranchData;