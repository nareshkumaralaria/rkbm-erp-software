import mongoose from 'mongoose';

const dateIndia = new Date();

// Creating Schema (document structure)
export const branch_schema = new mongoose.Schema({
    branchName: String,
    email: String,
    phoneNumber: String,
    gstNumber: String,
    address: String,
    city: String,
    state: String,
    date: { type: Date, default: new Date(`${dateIndia} UTC`) }
})
