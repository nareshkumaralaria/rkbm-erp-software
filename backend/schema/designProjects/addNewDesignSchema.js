import mongoose from 'mongoose';

const dateIndia = new Date();

// Creating Schema (document structure)
export const designProject_schema = new mongoose.Schema({
    companyName: String,
    initalName: String,
    templateNo: Array,
    date: { type: Date, default: new Date(`${dateIndia} UTC`) }
})
