// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { designProject_schema } from '../../schema/designProjects/addNewDesignSchema.js'

// customer collection(or model)
const DesignProject = new mongoose.model("designProject", designProject_schema);

const deleteDesignProject = async (req, res) => {
    const { id } = req.body;

    try {
        const designProject = await DesignProject.deleteOne({ "_id" : id })
        if(designProject){
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

export default deleteDesignProject;