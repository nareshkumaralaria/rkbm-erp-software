import React, { useState, useEffect } from "react";
import "./component.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryStateData from "../utilities/country-states.json";
import axios from "axios";
import $ from 'jquery';
import DataTable from 'datatables.net';
toast.configure();
window.$ = $


const Clients = () => {

  // const base_url = "http://localhost:9002";
  // const base_url = "https://rkbm.herokuapp.com";
  const base_url = "https://rkmb-backend.vercel.app";

  const initialFormValues = {
    companyName: "",
    initalName: "",
    fullName: "",
    gstNumber: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    payment: "",
    paymentRate: "",
    branch: "",
    remarks: "",
    date: "",
    customerId: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [customerList, setCustomerList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [update, setUpdate] = useState(initialFormValues);

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddNewCustomer = async (e) => {
    e.preventDefault();
    const isValid = validate(formValues);
    if (isValid) {
      addNewCustomer();
    }
  };

  const handleUpdateValue = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    const isValid = validate(update);
    if (isValid) {
      updateCustomer();
    }
  };

  const updateCustomer = async () => {
    try {
      await axios.post(`${base_url}/updateCustomer`, { update }).then((res) => {
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
          theme: "colored",
        });
        setUpdate(initialFormValues);
        getCustomerData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewCustomer = async () => {
    try {
      await axios
        .post(`${base_url}/addNewCustomer`, { formValues })
        .then((res) => {
          // console.log("res", res);
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
            theme: "colored",
          });
        });
      setFormValues(initialFormValues);
      getCustomerData();
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerData = async () => {
    try {
      await axios.get(`${base_url}/getCustomerData`).then((res) => {
        const result = res.data;
        setCustomerList(result);
        // console.log(customerList);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(customerList);

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.post(`${base_url}/customer/delete`, { id }).then((res) => {
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
          theme: "colored",
        });
        getCustomerData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchData = async () => {
    try {
      await axios.get(`${base_url}/getBranchData`).then((res) => {
        const result = res.data;
        setBranchList(result);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(branchList);

  useEffect(() => {
    getCustomerData();
    getBranchData();
    // $.ready(function () {
    //   $("#clientTable").DataTable();
    // });
    $(document).ready(function () {
      $("#clientTable").DataTable();
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

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let isValid = true;
    if (!values.companyName) {
      errors.companyName = "Company Name is required";
      isValid = false;
    }
    if (!values.initalName) {
      errors.initalName = "Inital Name is required";
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

    if (!values.gstNumber) {
      errors.gstNumber = "GST Number is required";
      isValid = false;
    }

    if (!values.address) {
      errors.address = "Address is required";
      isValid = false;
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
      isValid = false;
    }
    if (!values.city) {
      errors.role = "City is required";
      isValid = false;
    }
    if (!values.state) {
      errors.role = "State is required";
      isValid = false;
    }
    if (!values.country) {
      errors.country = "Country is required";
      isValid = false;
    }
    if (!values.pinCode) {
      errors.pinCode = "PIN Code is required";
      isValid = false;
    }
    if (!values.payment) {
      errors.payment = "Payment is required";
      isValid = false;
    }
    if (!values.paymentRate) {
      errors.paymentRate = "Payment Rate is required";
      isValid = false;
    }
    if (!values.branch) {
      errors.branch = "Branch Name is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
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
                <h4>Customer List</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
              <div>
                <span id="responce"></span>
              </div>
              <div className="d-flex">
                <a href="##" onClick={() => exportToExcel("Clients.csv")} className="btn btn-rounded btn-primary mr-1" >
                  <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
                </a>
                <a href="##" //  onClick={importFromExcel} 
                  className="btn btn-rounded btn-danger mr-1" >
                  <i className="fa fa-upload"></i>&nbsp;&nbsp;Import Excel
                </a>
                <a
                  href="/" data-toggle="modal" data-target="#add-category" className="btn btn-rounded btn-success mr-1" >
                  <i className="fa fa-plus"></i>&nbsp; Add Customer
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "-20px" }} className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive" id="excel_data">
                    <table id="clientTable" className="display" style={{ minWidth: "845px" }} >
                      <thead>
                        <tr>
                          <th id="select">Company</th>
                          <th id="select" data-orderable="false">Contact</th>
                          <th id="select" data-orderable="false">Type</th>
                          <th id="select" data-orderable="false">Percent</th>
                          <th id="select" data-orderable="false">GST</th>
                          <th id="select" data-orderable="false">Inital</th>
                          <th id="select" data-orderable="false">Date Created</th>
                          <th data-orderable="false">Status</th>
                          <th data-orderable="false">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {customerList.length > 0 ? (
                          customerList.map((items, index) => {
                            return (
                              <tr key={index}>
                                <td id="selected-data">{items.companyName}</td>
                                <td>
                                  <div>
                                    <b id="selected-data" className="text-warning">{items.fullName}</b>
                                    <br />
                                    {items.phoneNumber}
                                    <br />
                                    {items.email}
                                    <br />
                                    {items.address}
                                  </div>
                                </td>
                                <td id="selected-data">{items.payment}</td>
                                <td id="selected-data">{items.paymentRate}</td>
                                <td id="selected-data">{items.gstNumber}</td>
                                <td id="selected-data">{items.initalName}</td>
                                {/* <td>{items.date}</td> */}
                                <td id="selected-data">
                                  {items.date.slice(0, 10)} at{" "}
                                  {items.date.slice(11, 16)}
                                </td>
                                <td>
                                  <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                  </label>
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <a href="/" data-toggle="modal"
                                      onClick={() =>
                                        setUpdate({
                                          companyName: items.companyName,
                                          initalName: items.initalName,
                                          fullName: items.fullName,
                                          gstNumber: items.gstNumber,
                                          email: items.email,
                                          phoneNumber: items.phoneNumber,
                                          address: items.address,
                                          city: items.city,
                                          state: items.state,
                                          country: items.country,
                                          pinCode: items.pinCode,
                                          payment: items.payment,
                                          paymentRate: items.paymentRate,
                                          branch: items.branch,
                                          customerId: items._id,
                                          remarks: items.remarks,
                                        })
                                      }
                                      data-target="#update-category"
                                      className="btn btn-primary shadow btn-xs sharp mr-1"
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </a>
                                    <a href="##" className="btn btn-danger shadow btn-xs sharp mr-1" onClick={() => handleDeleteCustomer(items._id)} >
                                      <i className="fa fa-trash"></i>
                                    </a>
                                    <a href="/" data-toggle="modal"
                                      onClick={() =>
                                        setUpdate({
                                          companyName: items.companyName,
                                          initalName: items.initalName,
                                          fullName: items.fullName,
                                          gstNumber: items.gstNumber,
                                          email: items.email,
                                          phoneNumber: items.phoneNumber,
                                          address: items.address,
                                          city: items.city,
                                          state: items.state,
                                          country: items.country,
                                          pinCode: items.pinCode,
                                          payment: items.payment,
                                          paymentRate: items.paymentRate,
                                          branch: items.branch,
                                          date: items.date,
                                          remarks: items.remarks,
                                        })
                                      }
                                      data-target="#view-category"
                                      className="btn btn-success shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-eye"></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : ""}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Add Category --> */}
      <div className="modal fade none-border" id="add-category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Add New Customer</strong>
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddNewCustomer}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="companyName" className="form-label mb-0">Company Name</label>
                    <input className="form-control form-white" value={formValues.companyName} onChange={handleFormValues}
                      // placeholder="Company name"
                      type="text" name="companyName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.companyName}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="initalName" className="form-label mb-0">Inital Name</label>
                    <input className="form-control form-white" value={formValues.initalName} onChange={handleFormValues}
                      // placeholder="Inital Name"
                      type="text" name="initalName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.initalName}</span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label mb-0">Full name</label>
                    <input className="form-control form-white" value={formValues.fullName} onChange={handleFormValues}
                      // placeholder="Full name"
                      type="text" name="fullName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.fullName}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gstNumber" className="form-label mb-0">GST number</label>
                    <input className="form-control form-white" value={formValues.gstNumber} onChange={handleFormValues}
                      // placeholder="GST number"
                      type="text" name="gstNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.gstNumber}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label mb-0">Email</label>
                    <input className="form-control form-white" value={formValues.email} onChange={handleFormValues}
                      // placeholder="Email"
                      type="text" name="email" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.email}</span>
                  </div>
                  {/* </div> */}

                  {/* <div className="row"> */}
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label mb-0">Phone number</label>
                    <input className="form-control form-white" value={formValues.phoneNumber} onChange={handleFormValues}
                      // placeholder="Phone number"
                      type="text" name="phoneNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.phoneNumber}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label mb-0">Address</label>
                    <input className="form-control form-white" value={formValues.address} onChange={handleFormValues}
                      // placeholder="Address"
                      type="text" name="address" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.address}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="country" className="form-label mb-0">Country</label>
                    <select className="form-control form-white" value={formValues.country} onChange={handleFormValues}
                      // data-placeholder="Country"
                      name="country">
                      <option value="">--Select Country--</option>
                      {countryStateData[0]["country"].map((country, index) => {
                        return (
                          <option key={country.name} value={country.code}>
                            {country.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.country}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="state" className="form-label mb-0">State</label>
                    <select className="form-control form-white" value={formValues.state} onChange={handleFormValues}
                      // data-placeholder="State"
                      name="state">
                      {selectedCountryState[0] !== undefined ? (
                        selectedCountryState[0].map((state) => {
                          return (
                            <option key={state.name} value={state.code}>
                              {state.name}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">--Select State--</option>
                      )}
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.state}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label mb-0">City</label>
                    <input className="form-control form-white" value={formValues.city} onChange={handleFormValues}
                      // placeholder="City"
                      type="text" name="city" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.city}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pinCode" className="form-label mb-0">Pin code</label>
                    <input className="form-control form-white" value={formValues.pinCode} onChange={handleFormValues}
                      // placeholder="Pin code"
                      type="text" name="pinCode" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.pinCode}</span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="payment" className="form-label mb-0">Payment type</label>
                    <select className="form-control form-white" value={formValues.payment} onChange={handleFormValues}
                      // data-placeholder="Choose a color..."
                      name="payment">
                      <option value="">--Select Payment---</option>
                      <option value="Fixed">Fixed</option>
                      <option value="non-fixed">non-fixed</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.payment}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="paymentRate" className="form-label mb-0">Payment rate</label>
                    <input className="form-control form-white" value={formValues.paymentRate} onChange={handleFormValues}
                      // placeholder="Payment rate"
                      type="text" name="paymentRate" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.paymentRate}</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="branch" className="form-label mb-0">Branch</label>
                    <select className="form-control form-white" value={formValues.branch} onChange={handleFormValues}
                      // data-placeholder="Choose a color..."
                      name="branch">
                      <option value="">--Select Branch---</option>
                      {branchList.map((branch) => {
                        return (
                          <option key={branch._id} value={branch.branchName}>
                            {branch.branchName}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.branch}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="remarks" className="form-label mb-0">Remarks</label>
                    <input className="form-control form-white" value={formValues.remarks} onChange={handleFormValues}
                      // placeholder="Remarks"
                      type="text" name="remarks" />
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
      </div>

      {/* <!-- Modal Update Category --> */}
      <div className="modal fade none-border" id="update-category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Update Customer</strong>
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateCustomer}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="companyName" className="form-label mb-0">Company Name</label>
                    <input className="form-control form-white" value={update.companyName} onChange={handleUpdateValue}
                      // placeholder="Company name"
                      type="text" name="companyName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.companyName}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="initalName" className="form-label mb-0">Inital Name</label>
                    <input className="form-control form-white" value={update.initalName} onChange={handleUpdateValue}
                      // placeholder="Inital Name"
                      type="text" name="initalName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.initalName}</span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label mb-0">Full name</label>
                    <input className="form-control form-white" value={update.fullName} onChange={handleUpdateValue}
                      // placeholder="Full name"
                      type="text" name="fullName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.fullName}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gstNumber" className="form-label mb-0">GST number</label>
                    <input className="form-control form-white" value={update.gstNumber} onChange={handleUpdateValue}
                      // placeholder="GST number"
                      type="text" name="gstNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.gstNumber}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label mb-0">Email</label>
                    <input className="form-control form-white" value={update.email} onChange={handleUpdateValue}
                      // placeholder="Email"
                      type="text" name="email" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.email}</span>
                  </div>
                  {/* </div> */}

                  {/* <div className="row"> */}
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label mb-0">Phone number</label>
                    <input className="form-control form-white" value={update.phoneNumber} onChange={handleUpdateValue}
                      // placeholder="Phone number"
                      type="text" name="phoneNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.phoneNumber}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="address" className="form-label mb-0">Address</label>
                    <input className="form-control form-white" value={update.address} onChange={handleUpdateValue}
                      // placeholder=" Address"
                      type="text" name="address" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.address}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label mb-0">City</label>
                    <input className="form-control form-white" value={update.city} onChange={handleUpdateValue}
                      // placeholder=" City"
                      type="text" name="city" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.city}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="state" className="form-label mb-0">State</label>
                    <input className="form-control form-white" value={update.state} onChange={handleUpdateValue}
                      // placeholder=" State"
                      type="text" name="state" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.state}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="country" className="form-label mb-0">Country</label>
                    <input className="form-control form-white" value={update.country} onChange={handleUpdateValue}
                      // placeholder=" Country"
                      type="text" name="country" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.country}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pinCode" className="form-label mb-0">Pin code</label>
                    <input className="form-control form-white" value={update.pinCode} onChange={handleUpdateValue}
                      // placeholder=" Pin code"
                      type="text" name="pinCode" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.pinCode}</span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="payment" className="form-label mb-0">Payment type</label>
                    <select className="form-control form-white" value={update.payment} onChange={handleUpdateValue}
                      // data-placeholder="Choose a color..."
                      name="payment" >
                      <option value="">--Select Payment---</option>
                      <option value="Fixed">Fixed</option>
                      <option value="non-fixed">non-fixed</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.payment}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="paymentRate" className="form-label mb-0">Payment rate</label>
                    <input className="form-control form-white" value={update.paymentRate} onChange={handleUpdateValue}
                      // placeholder="Payment rate"
                      type="text" name="paymentRate" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.paymentRate}</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="branch" className="form-label mb-0">Branch</label>
                    <select className="form-control form-white" value={update.branch} onChange={handleUpdateValue}
                      // data-placeholder="Choose a color..."
                      name="branch" >
                      <option value="">--Select Branch---</option>
                      <option value="Surat">Surat</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.branch}</span>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="remarks" className="form-label mb-0">Remarks</label>
                    <input className="form-control form-white" value={update.remarks} onChange={handleUpdateValue}
                      // placeholder="Remarks"
                      type="text" name="remarks" />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal view Category --> */}
      <div className="modal fade none-border" id="view-category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                style={{ textTransform: "uppercase" }}
                className="modal-title"
              >
                <strong>
                  {update.companyName} ({update.initalName})
                </strong>
                <br />
                <p
                  style={{ fontSize: "11px", color: "#999" }}
                  className="text-small"
                >
                  GST No: {update.gstNumber}
                </p>
              </h4>
              {/* <p>Created on <br />{update.date}</p> */}
              <p>
                Created on <br />
                {update.date && update.date.slice(0, 10)} at{" "}
                {update.date && update.date.slice(11, 16)}
              </p>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">Owner Name:</div>
                <div className="col-sm-6">
                  <b>{update.fullName}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">Phone Number:</div>
                <div className="col-sm-6">
                  <b>{update.phoneNumber}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">Owner Email:</div>
                <div className="col-sm-6">
                  <b>{update.email}</b>
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
                      {update.address}, {update.city}, {update.state},{" "}
                      {update.country}
                    </b>
                  </p>
                  {/* <p><b>PLOT NO-1026/27, LAXMI TEXTILE PARK, SACHIN GIDC, SURAT</b></p> */}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p>Payment Type:</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>
                      {update.payment} @ {update.paymentRate}
                    </b>
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
              <button
                type="button"
                className="btn btn-default waves-effect"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
