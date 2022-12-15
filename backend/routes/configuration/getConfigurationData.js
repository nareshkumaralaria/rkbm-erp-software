// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { configuration_schema } from '../../schema/configuration/configurationSchema.js'

// customer collection(or model)
const Configuration = new mongoose.model("configuration", configuration_schema);

const getConfigurationData = async (req, res) => {
    try {
        const configuration = await Configuration.find({})
        return res.send(configuration)
    } catch (error) {
        console.log(error)
    }
}

export default getConfigurationData;