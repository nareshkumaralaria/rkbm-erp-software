// mongoose importing
// import mongoose from 'mongoose'
import Employee from "../../schema/employees/employeeSchema.js";

// employee schema importing
// import { employee_schema } from '../../schema/employees/employeeSchema.js'

// creating employee collection(or model)
// const Employee = new mongoose.model("Employee", employee_schema);

const deleteEmployee = async (req, res) => {
    const { id } = req.body;

    try {
        const employee = await Employee.deleteOne({ "_id": id })
        if (employee) {
            return res.send({
                message: "deleted"
            })
        } else {
            console.log("err")
        }
    } catch (error) {
        console.log(error);
    }
}

export default deleteEmployee;