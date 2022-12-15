// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { designProject_schema } from '../../schema/designProjects/addNewDesignSchema.js'

// customer collection(or model)
const DesignProject = new mongoose.model("designProject", designProject_schema);

const getDesignData = async (req, res) => {
    try {
        const designProject = await DesignProject.find({})
        return res.send(designProject)
    } catch (error) {
        console.log(error)
    }
}

export default getDesignData;