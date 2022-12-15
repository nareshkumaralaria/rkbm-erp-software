// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { designProject_schema } from '../../schema/designProjects/addNewDesignSchema.js'

// customer collection(or model)
const DesignProject = new mongoose.model("designProject", designProject_schema);

const addNewDesign = async (req, res) => {
    // Geting values from forntend
    const { updatedFormValues } = req.body;
    
    try {
        // const customer = await Customer.findOne({ email: formValues.email})
        // if(customer){
        //     if (customer.email === formValues.email) {
        //         return res.send({
        //             message: "Email already exist"
        //         })
        //     }
        // }else{
            // Creating customer document
            const designProject = new DesignProject({
                companyName: updatedFormValues.companyName,
                initalName: updatedFormValues.initalName,
                templateNo: updatedFormValues.templateNo,
            })
            // Saving customer on DB(back-End)
            await designProject.save()
            return res.send({
                message : "Design Project created"
            })
        // }
    } catch (error) {
        console.log(error)
    }

}

export default addNewDesign;