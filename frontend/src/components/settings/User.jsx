import React, { useEffect, useState } from "react";
import "../component.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";

import { useSelector, useDispatch } from 'react-redux';
import { getUsersList, addUser, deleteUser } from "../../redux/actions/usersAction";
import $ from 'jquery'
window.$ = $
toast.configure();

const User = () => {
  // const base_url = "http://localhost:9002";
  // const base_url = "https://rkbm.herokuapp.com";
  const base_url = "https://rkmb-backend.vercel.app";

  const dispatch = useDispatch();

  // states from store.js
  const usersListState = useSelector(state => state.getUsersListReducer);

  const initialFormValues = {
    profilePhotoUrl: undefined,
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: [],
    branch: [],
    date: "",
    privilege: "user",
    // userId: "",
    employeeId: "",
  };

  const [image, setImage] = useState();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [branchList, setBranchList] = useState([]);
  const [update, setUpdate] = useState(initialFormValues);

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdateValue = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
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
  };

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    const isValid = validate(formValues);
    if (isValid) {
      dispatch(addUser(formValues));
      setFormValues(initialFormValues);
    }
  };


  const handleUpdateUser = (e) => {
    e.preventDefault();
    const isValid = validate(update);
    if (isValid) {
      updateUser();
    }
  };

  const handleDeleteUser = (id) => {
    const agreed = window.confirm(`Are you sure?`);
    if (agreed) {
      dispatch(deleteUser(id));
    }
  };

  const updateUser = async () => {
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
          // getEmployeeData();
          dispatch(getUsersList());
        });
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let isValid = true;
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
      errors.password = "Password is required";
      isValid = false;
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
      isValid = false;
    }
    if (!values.role) {
      errors.role = "Role is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
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

  useEffect(() => {
    getBranchData();
    dispatch(getUsersList());

    $(document).ready(function () {
      $("#example5").DataTable();
    });
  }, []);

  // console.log("Update: ", update);

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0 d-flex align-items-center">
              <div className="welcome-text">
                <h4>Users List</h4>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
              <div className="d-flex">
                <a href="/" data-toggle="modal" data-target="#add-category" className="btn btn-rounded btn-success mr-1" >
                  <i className="fa fa-plus"></i>&nbsp; Add User
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "-20px" }} className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="example5" className="display" style={{ minWidth: "845px" }} >
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th data-orderable="false">Email</th>
                          <th data-orderable="false">Role</th>
                          <th data-orderable="false">Status</th>
                          <th data-orderable="false">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          !usersListState.loading ?
                            usersListState.usersList.length > 0 ?
                              usersListState.usersList.map((items, index) => {
                                return items.privilege === "user" && (
                                  <tr key={index + items.fullName}>
                                    <td>
                                      <img src={items.profilePhotoUrl} alt="" className="img-responsive img-round" style={{ height: "80px" }} />
                                    </td>
                                    <td>{items.fullName}</td>
                                    <td>{items.email}</td>
                                    <td>{items.role.map(role => { return <span>{role}<br /></span> })}</td>
                                    <td>
                                      <label className="switch">
                                        <input defaultChecked={true} type="checkbox" />
                                        <span className="slider round"></span>
                                      </label>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <a href="/" data-toggle="modal"
                                          onClick={() =>
                                            setUpdate({
                                              profilePhotoUrl: items.profilePhotoUrl,
                                              fullName: items.fullName,
                                              email: items.email,
                                              password: items.password,
                                              confirmPassword: items.confirmPassword,
                                              phoneNumber: items.phoneNumber,
                                              role: items.role,
                                              // userId: items._id,
                                              employeeId: items._id,
                                            })
                                          }
                                          data-target="#update-category"
                                          className="btn btn-primary shadow btn-xs sharp mr-1" >
                                          <i className="fa fa-pencil"></i>
                                        </a>
                                        {
                                          items.email === "admin@admin.com" ? null :
                                            <a href="#" onClick={() => handleDeleteUser(items._id)} className="btn btn-danger shadow btn-xs sharp mr-1" >
                                              <i className="fa fa-trash"></i>
                                            </a>
                                        }

                                        <a href="/" data-toggle="modal" onClick={() =>
                                          setUpdate({
                                            profilePhotoUrl: items.profilePhotoUrl,
                                            fullName: items.fullName,
                                            email: items.email,
                                            password: items.password,
                                            confirmPassword: items.confirmPassword,
                                            phoneNumber: items.phoneNumber,
                                            role: items.role,
                                            date: items.date,
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
                              : ""
                            :
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td colSpan="9" className="text-center">
                                <img width={30} src={process.env.PUBLIC_URL + "/assets/images/loading-gif.gif"} alt="" />
                              </td>
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

      {/* <!-- Modal Add user --> */}
      <div className="modal fade none-border" id="add-category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>Add User</strong>
              </h4>
            </div>
            <div className="modal-body">

              <form onSubmit={handleAddNewUser}>
                <div className="row">

                  <div className="col-md-12">
                    <label htmlFor="UploadImage" className="form-label mb-0">Upload User photo</label>
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
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.fullName}
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
                    <label htmlFor="confirmPassword" className="form-label mb-0">Confirm Password</label>
                    <input className="form-control form-white" value={formValues.confirmPassword} onChange={handleFormValues} type="text" name="confirmPassword" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.confirmPassword}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label mb-0">Mobile Number</label>
                    <input className="form-control form-white" value={formValues.phoneNumber} onChange={handleFormValues} type="text" name="phoneNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.phoneNumber}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="role" className="form-label mb-0">Role</label>
                    <Multiselect
                      isObject={false}
                      // showArrow={true}
                      onKeyPressFn={function noRefCheck() { }}
                      placeholder="--Select Role--"
                      // onRemove={function noRefCheck() {}}
                      onRemove={(e) => handleMultiSelectRole(e)}
                      onSearch={function noRefCheck() { }}
                      onSelect={(e) => handleMultiSelectRole(e)}
                      options={[
                        "Admin",
                        "Surat Branch Admin",
                        "Mumbai Branch Admin",
                      ]}
                    />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.role}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="branch" className="form-label mb-0">Branch</label>
                    <Multiselect
                      isObject={false}
                      // showArrow={true}
                      onKeyPressFn={function noRefCheck() { }}
                      placeholder="--Select Branch--"
                      // onRemove={function noRefCheck() {}}
                      onRemove={(e) => handleMultiSelectBranch(e)}
                      onSearch={function noRefCheck() { }}
                      onSelect={(e) => handleMultiSelectBranch(e)}
                      options={branchList.map((branch) => {
                        return branch.branchName;
                      })}
                    />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.role}
                    </span>
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" >Close</button>
                  <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal update Category --> */}
      <div className="modal fade none-border" id="update-category">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <strong>update User</strong>
              </h4>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Upload</span>
                </div>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" />
                  <label className="custom-file-label">Choose Photo</label>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateUser}>
                <div className="row">
                  <div className="col-md-6">
                    <input className="form-control form-white" value={update.fullName} onChange={handleUpdateValue} placeholder="Full Name" type="text" name="fullName" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.fullName}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <input className="form-control form-white" value={update.email} onChange={handleUpdateValue} placeholder="Email / Userid" type="text" name="email" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.email}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <input className="form-control form-white" value={update.password} onChange={handleUpdateValue} placeholder="Password" type="text" name="password" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.password}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <input className="form-control form-white" value={update.confirmPassword} onChange={handleUpdateValue} placeholder="Confrim Password" type="text" name="confirmPassword" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.confirmPassword}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <input className="form-control form-white" value={update.phoneNumber} onChange={handleUpdateValue} placeholder="Mobile Number" type="text" name="phoneNumber" />
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.phoneNumber}
                    </span>
                  </div>

                  <div className="col-md-6">
                    <select className="form-control form-white" value={update.role} onChange={handleUpdateValue} data-placeholder="Choose a color..." name="role"  >
                      <option value="">--Select Role---</option>
                      <option value="Admin">Admin</option>
                      <option value="Surat Branch Admin">Surat Branch Admin</option>
                      <option value="Mumbai Branch Admin">Mumbai Branch Admin</option>
                    </select>
                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >
                      {formErrors.role}
                    </span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" >Close</button>
                  <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Save</button>
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
              <img src={update.profilePhotoUrl} alt="profile photo" className="img-responsive img-thumbnail" style={{ height: "90px" }} />
              <p> Created on <br /> {update.date} </p>
              {/* <p>Created on <br />{update.date.slice(0, 10)} at {update.date.slice(11, 16) }</p> */}
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">Full Name:</div>
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
                <div className="col-sm-6">User id/Email:</div>
                <div className="col-sm-6">
                  <b>{update.email}</b>
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p>Current Role</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>{update.role}</b>
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <p>Current Password</p>
                </div>
                <div className="col-sm-6">
                  <p>
                    <b>
                      ************** <li className="fa fa-eye"></li>{" "}
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
