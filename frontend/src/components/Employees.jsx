import axios from "axios";
import React, { useEffect, useState } from "react";
import "./component.css";
import { toast } from "react-toastify";
import $ from 'jquery'
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import countryStateData from "../utilities/country-states.json";
import { useSelector, useDispatch } from 'react-redux';
import { getUsersList, addUser, deleteUser } from "../redux/actions/usersAction.js";
// import { getBranchList } from "../redux/actions/branchAction.js"
window.$ = $
toast.configure();

const Employees = () => {
  // const base_url = "http://localhost:9002";
  // const base_url = "https://rkbm.herokuapp.com";
  const base_url = "https://rkmb-backend.vercel.app";

  const dispatch = useDispatch();

  const usersListState = useSelector(state => state.getUsersListReducer);
  const branchList = useSelector(state => state.getBranchListReducer.branchList)

  const initialFormValues = {
    profilePhotoUrl: undefined,
    fullName: "",
    type: "",
    role: [],
    designation: "",
    workHours: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    dob: "",
    doj: "",
    branch: [],
    remarks: "",
    date: "",
    privilege: "employee",
    employeeId: "",
  };

  const [image, setImage] = useState();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [update, setUpdate] = useState(initialFormValues);

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleMultiSelectRole = (e) => {
    let x = { ...formValues };
    x.role = e;
    setFormValues(x);
  };

  const handleMultiSelectBranch = (e) => {
    let x = { ...formValues };
    x.branch = e;
    setFormValues(x);
  }

  const handleAddNewEmployee = async (e) => {
    e.preventDefault();
    const isValid = validate(formValues);
    if (isValid) {
      dispatch(addUser(formValues));
      setFormValues(initialFormValues);

    }
  };

  const handleUpdateValue = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    const isValid = validate(update);
    if (isValid) {
      updateEmployee();
    }
  };

  const updateEmployee = async () => {
    try {
      await axios.post(`${base_url}/updateEmployee`, { update })
        .then((res) => {
          // console.log(res.data.message);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
          });
          setUpdate(initialFormValues);
          getEmployeeData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeData = async () => {
    try {
      await axios.get(`${base_url}/getEmployeeData`).then((res) => {
        const result = res.data;
        setCustomerList(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    const agreed = window.confirm(`Are you sure?`);
    if (agreed) {
      dispatch(deleteUser(id));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let isValid = true;
    if (!values.type) {
      errors.type = "Type is required";
      isValid = false;
    }
    if (!values.fullName) {
      errors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!values.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.password) {
      errors.password = "password is required";
      isValid = false;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "confirm password is required";
      isValid = false;
    }

    if (values.password !== values.confirmPassword) {
      errors.passwordNotMatch = "password not match!!";
      isValid = false;
    }

    if (!values.designation) {
      errors.designation = "Designation is required";
      isValid = false;
    }

    if (!values.workHours) {
      errors.workHours = "Work Hours is required";
      isValid = false;
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }
    if (!values.qualification) {
      errors.qualification = "Qualification is required";
      isValid = false;
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
      isValid = false;
    }
    if (!values.address) {
      errors.address = "Address is required";
      isValid = false;
    }
    if (!values.city) {
      errors.city = "City is required";
      isValid = false;
    }
    if (!values.state) {
      errors.state = "State is required";
      isValid = false;
    }
    if (!values.pinCode) {
      errors.pinCode = "PIN Code is required";
      isValid = false;
    }
    if (!values.dob) {
      errors.dob = "DOB is required";
      isValid = false;
    }
    if (!values.doj) {
      errors.doj = "DOJ is required";
      isValid = false;
    }
    if (!values.branch) {
      errors.branch = "Branch is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const getAccessRoleData = async () => {
    try {
      await axios.get(`${base_url}/getAccessRoleData`).then((res) => {
        const result = res.data;
        setRoleList(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessRoleData();

    dispatch(getUsersList());

    $(document).ready(function () {
      $("#example5").DataTable();
    });
  }, []);

  const downloadCSV = (csv, filename) => {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "data:application/vnd.ms-excel" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  };

  const exportToExcel = (filename) => {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("#selected-data, #select");
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
  };

  var selectedCountryState = countryStateData[0]["states"].map((state) => {
    return state[formValues.country];
  });

  // console.log(formValues);

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0 d-flex align-items-center">
              <div className="welcome-text">
                <h4>Employees List</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
              <div className="d-flex">
                <a href="#" onClick={() => exportToExcel("Employees.csv")} className="btn btn-rounded btn-primary mr-1">
                  <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
                </a>
                <a href="#" className="btn btn-rounded btn-danger mr-1">
                  <i className="fa fa-upload"></i>&nbsp;&nbsp;Import Excel
                </a>
                <a href="/" data-toggle="modal" data-target="#add-category" className="btn btn-rounded btn-success mr-1">
                  <i className="fa fa-plus"></i>&nbsp; Add Employee
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "-20px" }} className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="example5" className="display" style={{ minWidth: "845px" }}>
                      <thead>
                        <tr>
                          <th></th>
                          <th id="select">Name</th>
                          <th data-orderable="false">Action</th>
                          <th id="select" data-orderable="false">Gender</th>
                          <th id="select" data-orderable="false">Type </th>
                          <th id="select" data-orderable="false">Desig</th>
                          <th id="select" data-orderable="false">Job T</th>
                          <th id="select" data-orderable="false">Quali</th>
                          <th id="select">DOB</th>
                          <th id="select" data-orderable="false">Conta</th>
                          <th id="select" data-orderable="false">Email</th>
                          <th data-orderable="false">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          !usersListState.loading ?
                            usersListState.usersList.length > 0
                              ?
                              usersListState.usersList.map((items, index) => {
                                return items.privilege === "employee" && (
                                  <tr key={index}>
                                    <td>
                                      <img src={items.profilePhotoUrl} alt="" className="img-responsive img-round" style={{ height: "80px" }} />
                                    </td>
                                    <td id="selected-data">{items.fullName}</td>
                                    <td>
                                      <div className="d-flex">
                                        <a href="/" data-toggle="modal"
                                          onClick={() =>
                                            setUpdate({
                                              profilePhotoUrl: items.profilePhotoUrl,
                                              fullName: items.fullName,
                                              type: items.type,
                                              designation: items.designation,
                                              workHours: items.workHours,
                                              gender: items.gender,
                                              email: items.email,
                                              qualification: items.qualification,
                                              phoneNumber: items.phoneNumber,
                                              address: items.address,
                                              city: items.city,
                                              state: items.state,
                                              pinCode: items.pinCode,
                                              dob: items.dob,
                                              doj: items.doj,
                                              branch: items.branch,
                                              remarks: items.remarks,
                                              employeeId: items._id,
                                            })
                                          }
                                          data-target="#update-category"
                                          className="btn btn-primary shadow btn-xs sharp mr-1">
                                          <i className="fa fa-pencil"></i>
                                        </a>
                                        <a href="#" onClick={() => handleDeleteEmployee(items._id)} className="btn btn-danger shadow btn-xs sharp mr-1">
                                          <i className="fa fa-trash"></i>
                                        </a>
                                        <a href="/" data-toggle="modal"
                                          onClick={() =>
                                            setUpdate({
                                              profilePhotoUrl: items.profilePhotoUrl,
                                              fullName: items.fullName,
                                              type: items.type,
                                              designation: items.designation,
                                              workHours: items.workHours,
                                              gender: items.gender,
                                              email: items.email,
                                              qualification: items.qualification,
                                              phoneNumber: items.phoneNumber,
                                              address: items.address,
                                              city: items.city,
                                              state: items.state,
                                              pinCode: items.pinCode,
                                              dob: items.dob,
                                              doj: items.doj,
                                              branch: items.branch,
                                              remarks: items.remarks,
                                              date: items.date,
                                            })
                                          }
                                          data-target="#view-category"
                                          className="btn btn-success shadow btn-xs sharp" >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </div>
                                    </td>
                                    <td id="selected-data">{items.gender}</td>
                                    <td id="selected-data">{items.type}</td>
                                    <td id="selected-data">{items.designation}</td>
                                    <td id="selected-data">{items.doj}</td>
                                    <td id="selected-data"> {items.qualification} </td>
                                    <td id="selected-data">{items.dob}</td>
                                    <td id="selected-data">{items.phoneNumber}</td>
                                    <td id="selected-data">{items.email}</td>
                                    <td>
                                      <label className="switch">
                                        <input defaultChecked={true} type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </td>
                                  </tr>
                                );
                              })
                              :
                              ""
                            :
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="text-center"><img width={30} src={process.env.PUBLIC_URL + "/assets/images/loading-gif.gif"} alt="" />
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Add Employee --> */}
      <div className="modal fade none-border" id="add-category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Add Employee</strong>
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddNewEmployee}>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="UploadImage" className="form-label mb-0">Upload employee photo</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="inputGroupFile01" />
                      </div>
                    </div>
                    <span className="text-danger d-inline-block" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.image}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label mb-0">Full name</label>
                    <input className="form-control form-white" value={formValues.fullName} onChange={handleFormValues} type="text" name="fullName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.fullName}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="type" className="form-label mb-0">Employee type</label>
                    <select className="form-control form-white" value={formValues.type} onChange={handleFormValues} name="type">
                      <option value="">--Select type---</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Pay Per Design">Pay Per Design</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.type}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="role" className="form-label mb-0">Role</label>
                    {/* <select className="form-control form-white" name="role" value={formValues.role}
                      onChange={handleFormValues}>
                      <option value="">--Select Role---</option>
                      {
                        roleList.map((role) => {
                          return (
                            <option value={role.roleName}>{role.roleName}</option>
                          );
                        })
                      }
                    </select> */}
                    <Multiselect
                      isObject={false}
                      // showArrow={true}
                      onKeyPressFn={function noRefCheck() { }}
                      placeholder="--Select Role--"
                      // onRemove={function noRefCheck() {}}
                      onRemove={(e) => handleMultiSelectRole(e)}
                      onSearch={function noRefCheck() { }}
                      onSelect={(e) => handleMultiSelectRole(e)}
                      options={roleList.map(role => { return role.roleName })}
                    />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.role}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label mb-0">Gender</label>
                    <select className="form-control form-white" value={formValues.gender} onChange={handleFormValues} name="gender">
                      <option value="">--Select Gender---</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.gender}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="designation" className="form-label mb-0">Designation</label>
                    <input className="form-control form-white" value={formValues.designation} onChange={handleFormValues} type="text" name="designation" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.designation}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="workHours" className="form-label mb-0">Work Hours</label>
                    <input className="form-control form-white" value={formValues.workHours} onChange={handleFormValues} placeholder="eg. 00.00 AM to 00.00 PM" type="text" name="workHours" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.workHours}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="qualification" className="form-label mb-0">Qualification</label>
                    <input className="form-control form-white" value={formValues.qualification} onChange={handleFormValues} type="text" name="qualification" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.qualification}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label mb-0">Email</label>
                    <input className="form-control form-white" value={formValues.email} onChange={handleFormValues} type="text" name="email" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.email}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label mb-0">Password</label>
                    <input className="form-control form-white" value={formValues.password} onChange={handleFormValues} type="text" name="password" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.password}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label mb-0">Confirm password</label>
                    <input className="form-control form-white" value={formValues.confirmPassword} onChange={handleFormValues} type="text" name="confirmPassword" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.confirmPassword ? formErrors.confirmPassword : formErrors.passwordNotMatch}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label mb-0">Phone number</label>
                    <input className="form-control form-white" value={formValues.phoneNumber} onChange={handleFormValues} type="text" name="phoneNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.phoneNumber}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label mb-0">Address</label>
                    <input className="form-control form-white" value={formValues.address} onChange={handleFormValues} type="text" name="address" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.address}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="country" className="form-label mb-0">Country</label>
                    <select className="form-control form-white" value={formValues.country} onChange={handleFormValues} name="country">
                      <option value="">--Select Country--</option>
                      {
                        countryStateData[0]["country"].map((country) => {
                          return (
                            <option key={country.name} value={country.code}>
                              {country.name}
                            </option>
                          );
                        })
                      }
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.country}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="state" className="form-label mb-0">State</label>
                    <select className="form-control form-white" value={formValues.state} onChange={handleFormValues} name="state">
                      {
                        selectedCountryState[0] !== undefined
                          ?
                          selectedCountryState[0].map((state) => {
                            return (
                              <option key={state.name} value={state.code}>
                                {state.name}
                              </option>
                            );
                          })
                          :
                          <option value="">--Select State--</option>
                      }
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.state}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label mb-0">City</label>
                    <input className="form-control form-white" value={formValues.city} onChange={handleFormValues} type="text" name="city" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.city}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="pinCode" className="form-label mb-0">Pin code</label>
                    <input className="form-control form-white" value={formValues.pinCode} onChange={handleFormValues} type="text" name="pinCode" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.pinCode}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="dob" className="form-label mb-0">Date of birth</label>
                    <input name="dob" type="date" value={formValues.dob} onChange={handleFormValues} className="form-control form-white" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.dob}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="doj" className="form-label mb-0">Date of Joining</label>
                    <input name="doj" type="date" value={formValues.doj} onChange={handleFormValues} className="form-control form-white" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.doj}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="branch" className="form-label mb-0">Branch</label>
                    {/* <select className="form-control form-white" value={formValues.branch} onChange={handleFormValues} name="branch" >
                      <option value="">--Select Branch---</option>
                      {
                        branchList.map((branch) => {
                          return (
                            <option key={branch.branchName} value={branch.branchName} >
                              {branch.branchName}
                            </option>
                          );
                        })
                      }
                    </select> */}
                    <Multiselect
                      isObject={false}
                      // showArrow={true}
                      onKeyPressFn={function noRefCheck() { }}
                      placeholder="--Select Role--"
                      // onRemove={function noRefCheck() {}}
                      onRemove={(e) => handleMultiSelectBranch(e)}
                      onSearch={function noRefCheck() { }}
                      onSelect={(e) => handleMultiSelectBranch(e)}
                      options={branchList.map(branch => { return branch.branchName })}
                    />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.branch}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="remarks" className="form-label mb-0">Remarks</label>
                    <input className="form-control form-white" value={formValues.remarks} onChange={handleFormValues} type="text" name="remarks" />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >

      {/* <!-- Modal update Employee --> */}
      <div className="modal fade none-border" id="update-category" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Update Employee</strong>
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateEmployee}>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="UploadImage" className="form-label mb-0">Upload employee photo</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="inputGroupFile01" />
                      </div>
                    </div>
                    <span className="text-danger d-inline-block" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.image}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label mb-0">Full name</label>
                    <input className="form-control form-white" value={update.fullName} onChange={handleUpdateValue} type="text" name="fullName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.fullName}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="type" className="form-label mb-0">Employee type</label>
                    <select className="form-control form-white" value={update.type} onChange={handleUpdateValue} name="type">
                      <option value="">--Select type---</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Pay Per Design">Pay Per Design</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.type}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="designation" className="form-label mb-0">Designation</label>
                    <input className="form-control form-white" value={update.designation} onChange={handleUpdateValue} type="text" name="designation" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.designation}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="workHours" className="form-label mb-0">Work Hours</label>
                    <input className="form-control form-white" value={update.workHours} onChange={handleUpdateValue} type="text" name="workHours" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.workHours}
                    </span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label mb-0">Gender</label>
                    <select className="form-control form-white" value={update.gender} onChange={handleUpdateValue} name="gender">
                      <option value="">--Select Gender---</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.gender}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label mb-0">Email</label>
                    <input className="form-control form-white" value={update.email} onChange={handleUpdateValue} type="text" name="email" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.email}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="qualification" className="form-label mb-0">Qualification</label>
                    <input className="form-control form-white" value={update.qualification} onChange={handleUpdateValue} type="text" name="qualification" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>
                      {formErrors.qualification}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label mb-0">Phone number</label>
                    <input className="form-control form-white" value={update.phoneNumber} onChange={handleUpdateValue} type="text" name="phoneNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.phoneNumber}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label mb-0">Address</label>
                    <input className="form-control form-white" value={update.address} onChange={handleUpdateValue} type="text" name="address" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.address}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label mb-0">City</label>
                    <input className="form-control form-white" value={update.city} onChange={handleUpdateValue} type="text" name="city" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.city}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="state" className="form-label mb-0">State</label>
                    <input className="form-control form-white" value={update.state} onChange={handleUpdateValue} type="text" name="state" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.state}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pinCode" className="form-label mb-0">Pin code</label>
                    <input className="form-control form-white" value={update.pinCode} onChange={handleUpdateValue} type="text" name="pinCode" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.pinCode}
                    </span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="dob" className="form-label mb-0">Date of birth</label>
                    <input name="dob" value={update.dob} onChange={handleUpdateValue} className="datepicker-default form-control" id="datepicker" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.dob}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="doj" className="form-label mb-0">Date of Joining</label>
                    <input name="doj" value={update.doj} onChange={handleUpdateValue} className="datepicker-default form-control" id="datepicker2" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.doj}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="branch" className="form-label mb-0">Branch</label>
                    <select className="form-control form-white" value={update.branch} onChange={handleUpdateValue} name="branch" >
                      <option value="">--Select Branch---</option>
                      <option value="Surat">Surat</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.branch}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="remarks" className="form-label mb-0">Remarks</label>
                    <input className="form-control form-white" value={update.remarks} onChange={handleUpdateValue} type="text" name="remarks" />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >

      {/* <!-- Modal view Employee --> */}
      <div className="modal fade none-border" id="view-category" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <img src={update.profilePhotoUrl} alt="profile photo" className="img-responsive img-thumbnail" style={{ height: "90px" }} />
              <p>Created on <br /> {update.date}</p>
              {/* <p>Created on <br />{update.date.slice(0, 10)} at {update.date.slice(11, 16) }</p> */}
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">Employee Name:</div>
                <div className="col-sm-6">
                  <b>{update.fullName}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">Gender</div>
                <div className="col-sm-6">
                  <b>{update.gender}</b>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">Phone Number:</div>
                <div className="col-sm-6">
                  <b>{update.phoneNumber}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">Employee Email:</div>
                <div className="col-sm-6">
                  <b>{update.email}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">Qualification</div>
                <div className="col-sm-6">
                  <b>{update.qualification}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">Date of Joining</div>
                <div className="col-sm-6">
                  <b>{update.doj}</b>
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p>Address:</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>
                      {update.address}, {update.city}, {update.state}
                    </b>
                  </p>
                  {/* <p><b>PLOT NO-1026/27, LAXMI TEXTILE PARK, SACHIN GIDC, SURAT</b></p> */}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p>Designation</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>{update.designation}</b>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <p>Work hours:</p>
                </div>
                <div className="col-sm-6">
                  {/* <p><b>8:30 AM to 6:30 PM </b></p> */}
                  <p>
                    <b>{update.workHours}</b>
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <p>Payment Type:</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>{update.type}</b>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <p>Branch:</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>{update.branch}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Employees;
