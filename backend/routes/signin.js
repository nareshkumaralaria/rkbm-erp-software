import Employee from "../schema/employees/employeeSchema.js";
import jwt from "jsonwebtoken";

const signin = async (req, res) => {
  const { formValues } = req.body;

  const employee = await Employee.findOne({ email: formValues.email });
  // Employee.findOne({ email: formValues.email }, (err, employee) => {
  if (employee) {
    if (formValues.password === employee.password) {
      const token = jwt.sign(
        {
          email: formValues.email,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.send({
        message: "Sign in success",
        userToken: token,
        userName: employee.fullName,
        userPrivilege: employee.privilege,
      });
    } else {
      res.send({
        message: "Please signin with valid credentials",
      });
    }
  } else {
    res.send({
      message: "user doesn't exist",
    });
  }
  // });
};

export default signin;
