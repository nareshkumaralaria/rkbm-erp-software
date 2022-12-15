import mongoose from 'mongoose';

const dateIndia = new Date();

// Creating Schema (document structure)
const designForm_schema = new mongoose.Schema({
    designEntryType: { type: String, required: true },
    companyName: { type: String, required: true },
    initalName: String,
    customerGSTno: String,
    customerName: String,
    customerNumber: String,
    customerEmail: String,
    designMainType: { type: String, required: true },
    designMainSubType: String,
    designDetail: String,
    designSamplePhoto: { type: String, default: "https://res.cloudinary.com/nareshkumarcloud/image/upload/v1650613776/RKBM/ldezwbtkydffvduktuvj.jpg" },
    finalDesignImage: { type: String, default: "https://res.cloudinary.com/nareshkumarcloud/image/upload/v1650613776/RKBM/ldezwbtkydffvduktuvj.jpg" },
    designSubmissionDate: { type: String, required: true },
    remark: String,
    EmployeeName: { type: String, required: true },
    authorizedName: { type: String, required: true },
    status: { type: String, default: "pending" },
    designNumber: String,
    designFullName: String,
    designTotoalCard: String,
    designFinalImage: String,
    submittedDate: Date,
    perAmount: { type: Number, default: 0 },
    date: { type: Date, default: new Date(`${dateIndia} UTC`) }
})

const DesignForm = new mongoose.model("designForm", designForm_schema);

export default DesignForm;