// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { configuration_schema } from '../../schema/configuration/configurationSchema.js'

// customer collection(or model)
const Configuration = new mongoose.model("configuration", configuration_schema);

const deleteConfiguration = async (req, res) => {
    const { id } = req.body;

    try {
        const configuration = await Configuration.deleteOne({ "_id" : id })
        if(configuration){
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

export default deleteConfiguration;