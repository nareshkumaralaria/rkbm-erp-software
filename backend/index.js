// importing DB connection file
import "./config/database.js";
import app from "./config/app.js";
// import path from 'path';
// const __dirname = path.resolve();
import "dotenv/config";
// import fileUpload from 'express-fileupload';
// app.use(fileUpload());
const PORT = process.env.PORT || 9002;

// importing routes
import {
  signin,
  auth,
  addNewCustomer,
  getCustomerData,
  deleteCustomer,
  updateCustomer,
  addNewEmployee,
  getEmployeeData,
  deleteEmployee,
  updateEmployee,
  addNewUser,
  getUserData,
  updateUser,
  deleteUser,
  addAccessRole,
  getAccessRoleData,
  deleteAccessRole,
  updateAccessRole,
  addNewBranch,
  getBranchData,
  updateBranch,
  deleteBranch,
  addNewConfiguration,
  getConfigurationData,
  deleteConfiguration,
  updateConfiguration,
  addNewDesign,
  getDesignData,
  deleteDesignProject,
  addNewDesignForm,
  getDesignFormData,
  updateDesignForm,
  updateDesignNumber,
  uploadWork,
  confirmForAdmin,
  searchDesignData,
  searchCustomerReport,
  updateCustomerReport,
  getBillsCount,
  addBill,
  getBills,
  getOneCompanyBills,
  updateBillDate,
} from "./routes/index.js";

// signin routes
app.post("/signin", signin);
// auth routes
app.get("/auth", auth);

app.get("/", (req, res) => {
  res.send("hello from vercel");
});

// customer routes
app.post("/addNewCustomer", addNewCustomer);
app.get("/getCustomerData", getCustomerData);
app.post("/customer/delete", deleteCustomer);
app.post("/updateCustomer", updateCustomer);

// employess routes
app.post("/addNewEmployee", addNewEmployee);
app.get("/getEmployeeData", getEmployeeData);
app.post("/employee/delete", deleteEmployee);
app.post("/updateEmployee", updateEmployee);

// users routes
app.post("/addNewUser", addNewUser);
app.get("/getUserData", getUserData);
app.post("/updateUser", updateUser);
app.post("/user/delete", deleteUser);

// Access Role routes
app.post("/addAccessRole", addAccessRole);
app.get("/getAccessRoleData", getAccessRoleData);
app.post("/accessRole/delete", deleteAccessRole);
app.post("/updateAccessRole", updateAccessRole);

// branch management routes
app.post("/addNewBranch", addNewBranch);
app.get("/getBranchData", getBranchData);
app.post("/updateBranch", updateBranch);
app.post("/branch/delete", deleteBranch);

// configuration routes
app.post("/addNewConfiguration", addNewConfiguration);
app.get("/getConfigurationData", getConfigurationData);
app.post("/configuration/delete", deleteConfiguration);
app.post("/updateConfiguration", updateConfiguration);

// design projects routes
app.post("/addNewDesign", addNewDesign);
app.get("/getDesignData", getDesignData);
app.post("/designProject/delete", deleteDesignProject);

// design form routes
app.post("/addNewDesignForm", addNewDesignForm);
app.get("/getDesignFormData", getDesignFormData);
app.post("/updateDesignForm", updateDesignForm);
app.post("/searchDesignData", searchDesignData);
app.post("/updateDesignNumber", updateDesignNumber);
app.post("/uploadWork", uploadWork);
app.post("/confirmForAdmin", confirmForAdmin);

// search reports
app.post('/searchCustomerReport', searchCustomerReport);
app.post('/updateCustomerReport', updateCustomerReport);

// bills routes
app.get('/getBillsCount', getBillsCount);
app.get('/getBills', getBills);
app.post('/getOneCompanyBills', getOneCompanyBills);
app.post('/addBill', addBill);
app.post('/updateBillDate', updateBillDate);


app.listen(PORT, () => {
  console.log("We are running on port 9002");
});
