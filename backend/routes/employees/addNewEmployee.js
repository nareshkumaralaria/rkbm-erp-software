import Employee from "../../schema/employees/employeeSchema.js";

const addNewEmployee = async (req, res) => {
  const { formValues, imageUrl } = req.body;

  try {
    const employee = await Employee.findOne({ email: formValues.email });
    if (employee) {
      if (employee.email === formValues.email) {
        return res.send({
          message: "Email already exist",
        });
      }
    } else {
      // Creating employee document
      const employee = new Employee({
        profilePhotoUrl: imageUrl,
        fullName: formValues.fullName,
        type: formValues.type,
        designation: formValues.designation,
        workHours: formValues.workHours,
        role: formValues.role,
        gender: formValues.gender,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        qualification: formValues.qualification,
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        country: formValues.country,
        city: formValues.city,
        state: formValues.state,
        pinCode: formValues.pinCode,
        dob: formValues.dob,
        doj: formValues.doj,
        branch: formValues.branch,
        privilege: formValues.privilege,
        remarks: formValues.remarks,
      });
      // Saving customer on DB(back-End)
      await employee.save();
      return res.send({
        message: "Employee created",
      });
    }
  } catch (error) {
    return res.send({
      message: error.message,
      // message: "Server Error",
    });
  }
};

export default addNewEmployee;
