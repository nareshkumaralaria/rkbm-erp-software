// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { customer_schema } from '../../schema/customers/customerSchema.js'

// customer collection(or model)
const Customer = new mongoose.model("customer", customer_schema);

const addNewCustomer = async (req, res) => {
    // Geting values from forntend
    const { formValues } = req.body;
    
    try {
        const customer = await Customer.findOne({ email: formValues.email})
        if(customer){
            if (customer.email === formValues.email) {
                return res.send({
                    message: "Email already exist"
                })
            }
        }else{
            // Creating customer document
            const customer = new Customer({
                companyName: formValues.companyName,
                initalName: formValues.initalName,
                fullName: formValues.fullName,
                gstNumber: formValues.gstNumber,
                email: formValues.email,
                phoneNumber: formValues.phoneNumber,
                address: formValues.address,
                city: formValues.city,
                state: formValues.state,
                country: formValues.country,
                pinCode: formValues.pinCode,
                payment: formValues.payment,
                paymentRate: formValues.paymentRate,
                branch: formValues.branch,
                remarks: formValues.remarks
            })
            // Saving customer on DB(back-End)
            await customer.save()
            return res.send({
                message : "customer created"
            })
        }
    } catch (error) {
        console.log(error)
    }

}

export default addNewCustomer;