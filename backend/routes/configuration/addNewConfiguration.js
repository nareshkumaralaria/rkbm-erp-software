// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { configuration_schema } from '../../schema/configuration/configurationSchema.js'

// customer collection(or model)
const Configuration = new mongoose.model("configuration", configuration_schema);

const addNewConfiguration = async (req, res) => {
    // Geting values from forntend
    const { formValues } = req.body;
    
    try {
        const configuration = await Configuration.findOne({ mainType: formValues.mainType})
        if(configuration){
            if (configuration.subType === formValues.subType) {
                return res.send({
                    message: "Sub Type Already Created"
                })
            }else{
                // Creating customer document
                // const configuration = new Configuration({
                //     mainType: formValues.mainType,
                //     subType: formValues.subType,
                //     priority: formValues.priority
                // })
                const response = await Configuration.updateOne(
                    { mainType: formValues.mainType },
                    { subType: [...configuration.subType, formValues.subType] }
                )
                // console.log(response);
                // Saving customer on DB(back-End)
                // await configuration.save()
                return res.send({
                    message : "configuration created"
                })
            }
        }else{
            // Creating customer document
            const configuration = new Configuration({
                mainType: formValues.mainType,
                subType: formValues.subType,
                priority: formValues.priority
            })
            // Saving customer on DB(back-End)
            await configuration.save()
            return res.send({
                message : "configuration created"
            })
        }
    } catch (error) {
        console.log(error)
    }

}

export default addNewConfiguration;