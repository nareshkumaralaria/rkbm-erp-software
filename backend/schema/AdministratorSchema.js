import mongoose from 'mongoose'

// Creating Schema (document structure)
export const AdministratorSchema = new mongoose.Schema({
    email: String,
    password: String,
})
