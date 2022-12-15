
import Employee from "../../schema/employees/employeeSchema.js";

const updateEmployee = (req, res) => {
    // Geting values from forntend
    const { update } = req.body

    Employee.findByIdAndUpdate(
        { _id: update.employeeId },
        {
            $set: {
                fullName: update.fullName,
                type: update.type,
                designation: update.designation,
                workHours: update.workHours,
                gender: update.gender,
                email: update.email,
                qualification: update.qualification,
                phoneNumber: update.phoneNumber,
                address: update.address,
                city: update.city,
                state: update.state,
                pinCode: update.pinCode,
                dob: update.dob,
                doj: update.doj,
                branch: update.branch,
                remarks: update.remarks,
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "doc updated"
                    })
                }
            }
        }
    )
}

export default updateEmployee;