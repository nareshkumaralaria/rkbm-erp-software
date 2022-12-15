import mongoose from 'mongoose';

const dateIndia = new Date();

// Creating Schema (document structure)
export const customer_schema = new mongoose.Schema({
    companyName: String,
    initalName: String,
    fullName: String,
    gstNumber: String,
    email: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pinCode: String,
    payment: String,
    paymentRate: String,
    branch: String,
    remarks: String,
    date: { type: Date, default: new Date(`${dateIndia} UTC`) }
})
