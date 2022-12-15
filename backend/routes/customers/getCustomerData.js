// mongoose importing
import mongoose from "mongoose";

// customer schema importing
import { customer_schema } from "../../schema/customers/customerSchema.js";

// creating Customer collection(or model)
const Customer = new mongoose.model("Customer", customer_schema);

const getCustomerData = async (req, res) => {
  try {
    const customer = await Customer.find({});
    return res.send(customer);
  } catch (error) {
    console.log(error);
  }
};

export default getCustomerData;
