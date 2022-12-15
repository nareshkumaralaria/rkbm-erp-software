import Employee from "../../schema/employees/employeeSchema.js";

const getEmployeeData = async (req, res) => {
    try {
        const employee = await Employee.find({});
        return res.send(employee);
    } catch (error) {
        console.log(error);
    }
}

export default getEmployeeData;