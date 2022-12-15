import mongoose from "mongoose";

const dateIndia = new Date();

// Creating Schema (document structure)
const employee_schema = new mongoose.Schema({
  profilePhotoUrl: { type: String, default: "https://res.cloudinary.com/nareshkumarcloud/image/upload/v1650524256/RKBM/magnxyiavzpqyzah1vws.svg" },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  privilege: { type: String, required: true },
  type: String,
  designation: String,
  workHours: String,
  role: Array,
  gender: String,
  qualification: String,
  address: String,
  country: String,
  city: String,
  state: String,
  pinCode: String,
  dob: String,
  doj: String,
  branch: Array,
  remarks: String,
  date: { type: Date, default: new Date(`${dateIndia} UTC`) },
});


const Employee = new mongoose.model("employee", employee_schema);


export default Employee;
