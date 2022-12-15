// mongoose importing
import mongoose from 'mongoose'

// customer schema importing
import { customer_schema } from '../../schema/customers/customerSchema.js'

// creating Customer collection(or model)
const Customer = new mongoose.model("Customer", customer_schema)

const updateCustomer = (req, res) => {
    // Geting values from forntend
    const { update } = req.body

    Customer.findByIdAndUpdate(
        { _id : update.customerId},
        {
            $set: { 
                companyName: update.companyName,
                fullName: update.fullName,
                gstNumber: update.gstNumber,
                email: update.email,
                phoneNumber: update.phoneNumber,
                address: update.address,
                city: update.city,
                state: update.state,
                country: update.country,
                pinCode: update.pinCode,
                payment: update.payment,
                paymentRate: update.paymentRate,
                branch: update.branch,
                remarks: update.remarks,
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

export default updateCustomer;