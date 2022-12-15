import Employee from "../../schema/employees/employeeSchema.js";

const addNewUser = async (req, res) => {
  const { formValues } = req.body;

  try {
    const employee = await Employee.findOne({ email: formValues.email });
    if (employee) {
      if (employee.email === formValues.email) {
        return res.send({
          message: "Email already exist",
        });
      }
    } else {
      // Creating user document
      const employee = new Employee({
        profilePhotoUrl: formValues.profilePhotoUrl,
        fullName: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
        phoneNumber: formValues.phoneNumber,
        role: formValues.role,
        privilege: formValues.privilege,
        branch: formValues.branch,
      });
      // Saving user on DB(back-End)
      await employee.save();
      return res.send({
        message: "user created",
      });
    }
  } catch (error) {
    return res.send({

      message: error.message,
    });
  }
};

export default addNewUser;
