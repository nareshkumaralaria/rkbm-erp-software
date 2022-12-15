import mongoose from 'mongoose';

const dateIndia = new Date();

// Creating Schema (document structure)
export const configuration_schema = new mongoose.Schema({
    mainType: String,
    subType: Array,
    priority: String,
    date: { type: Date, default: new Date(`${dateIndia} UTC`) }
})
