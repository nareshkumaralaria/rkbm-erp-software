// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { configuration_schema } from '../../schema/configuration/configurationSchema.js'

// customer collection(or model)
const Configuration = new mongoose.model("configuration", configuration_schema);

const updateConfiguration = async (req, res) => {
    // Geting values from forntend
    const { update } = req.body;

    try {
        const configuration = await Configuration.findOne({ mainType: update.mainType});
        if(configuration){
            if(configuration.subType === update.subType){
                return res.send({
                    message: "Sub type Already used"
                })
            }else{
                Configuration.findByIdAndUpdate(
                    { _id : update.configId},
                    {
                        $set: { 
                            mainType: update.mainType,
                            subType: update.subType,
                            priority: update.priority
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
        }
    } catch (error) {
        console.log(error)
    }

    // Configuration.findByIdAndUpdate(
    //     { _id : update.configId},
    //     {
    //         $set: { 
    //             mainType: update.mainType,
    //             subType: update.subType,
    //             priority: update.priority
    //         }
    //     },
    //     (err, list) => {
    //         if(err){
    //             console.log(err)
    //         }else{
    //             if(list){
    //                 return res.send({
    //                     message : "doc updated"
    //                 })
    //             }
    //         }
    //     }
    //     )
}

export default updateConfiguration;