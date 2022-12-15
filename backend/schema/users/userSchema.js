import mongoose from 'mongoose';

const dateIndia = new Date();

// Creating Schema (document structure)
export const user_schema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    confirmPassword: String,
    phoneNumber: String,
    role: String,
    date: { type: Date, default: new Date(`${dateIndia} UTC`) }
})
