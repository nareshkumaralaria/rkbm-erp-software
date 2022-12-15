// mongoose importing
import mongoose from 'mongoose'

// customer schema importing
import { customer_schema } from '../../schema/customers/customerSchema.js'

// creating Customer collection(or model)
const Customer = new mongoose.model("Customer", customer_schema)

const deleteCustomer = async (req, res) => {
    const { id } = req.body;

    try {
        const customer = await Customer.deleteOne({ "_id" : id })
        if(customer){
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

export default deleteCustomer;