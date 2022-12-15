import mongoose from 'mongoose'

// Creating Schema (document structure)
export const AccessRole_Schema = new mongoose.Schema({
    roleName: String,
    dashboard: Boolean,
    clients: Boolean,
    accounting: Boolean,
    reports: Boolean,
    surat: Boolean,
    mumbai: Boolean,
})
