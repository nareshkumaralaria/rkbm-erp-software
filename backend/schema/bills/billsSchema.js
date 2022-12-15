import mongoose from 'mongoose';

// Creating Schema (document structure)
const biils_schema = new mongoose.Schema({
    startDate: { type: String },
    endDate: { type: String },
    invoiceNumber: { type: Number },
    invoiceDate: { type: String },
    companyName: { type: String },
    companyAddress: { type: String },
    gstNumber: { type: String },
    billValues: { type: Object },
    gstType: { type: String },
    paymentType: { type: String },
})

const Bills = new mongoose.model("bills", biils_schema);

export default Bills;