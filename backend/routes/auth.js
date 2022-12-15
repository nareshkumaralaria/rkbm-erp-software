import Employee from "../schema/employees/employeeSchema.js";

// importing jwt
import jwt from "jsonwebtoken";

const auth = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decoded.email;

    Employee.findOne({ email: email }, (err, employee) => {
      if (employee) {
        res.send({
          user: true,
        });
      } else {
        res.send({
          user: false,
        });
      }
    });
  } catch (error) {
    res.send({
      user: false,
    });
  }
};

export default auth;
