import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
// import { Link } from 'react-router-dom';

import $ from 'jquery'
window.$ = $
toast.configure()

const Configuration = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const initialFormValues = {
        mainType: "",
        subType: "",
        priority: "",
        date: "",
        configId: ""
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [update, setUpdate] = useState(initialFormValues);


    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleAddNewConfiguration = async (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            addNewConfiguration();
        }
    }

    const handleUpdateValue = (e) => {
        const { name, value } = e.target;
        setUpdate({ ...update, [name]: value });
    }

    const handleUpdateConfiguration = (e) => {
        e.preventDefault();
        const isValid = validate(update)
        if (isValid) {
            updateConfiguration();
        }
    }

    const updateConfiguration = async () => {
        try {
            await axios.post(`${base_url}/updateConfiguration`, { update })
                .then(res => {
                    // console.log(res.data.message);
                    res.data.message === "Sub type Already used" ?
                        toast.error(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            pauseOnFocusLoss: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        :
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
                        })
                    setUpdate(initialFormValues);
                    getConfigurationData();
                })
        } catch (error) {
            console.log(error)
        }
    }

    const addNewConfiguration = async () => {
        try {
            await axios.post(`${base_url}/addNewConfiguration`, { formValues })
                .then(res => {
                    // console.log("res", res);
                    // console.log(res.data.message);
                    res.data.message === "Sub Type Already Created" ?
                        toast.error(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            pauseOnFocusLoss: false,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        :
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
                        })
                })
            setFormValues(initialFormValues);
            getConfigurationData();
        } catch (error) {
            console.log(error);
        }
    }

    const getConfigurationData = async () => {
        try {
            await axios.get(`${base_url}/getConfigurationData`)
                .then(res => {
                    const result = res.data;
                    setCustomerList(result);
                    // console.log(customerList);
                })
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteConfiguration = async (id) => {
        try {
            await axios.post(`${base_url}/configuration/delete`, { id })
                .then(res => {
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
                    })
                    getConfigurationData();
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getConfigurationData();
        $(document).ready(function () {
            $('#ConfigTable').DataTable();
        });

    }, [])

    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.mainType) {
            errors.mainType = "Main Type is required";
            isValid = false;
        }

        if (!values.priority) {
            errors.priority = "priority is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    }


    return (
        <>

            <div className="content-body">
                <div className="container-fluid">

                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0 d-flex align-items-center">
                            <div className="welcome-text">
                                <h4>Configuration</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div><span id="responce"></span></div>
                            <div className="d-flex">
                                {/* <a href="#" onClick={() => exportToExcel("Clients.csv")} className="btn btn-rounded btn-primary mr-1">
                                    <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
                                </a>
                                <a href="#"
                                    //  onClick={importFromExcel}
                                    className="btn btn-rounded btn-danger mr-1">
                                    <i className="fa fa-upload"></i>&nbsp;&nbsp;Import Excel
                                </a> */}
                                <a href="/" data-toggle="modal" data-target="#add-configuration" className="btn btn-rounded btn-success mr-1">
                                    <i className="fa fa-plus"></i>&nbsp; Add Configuration
                                </a>
                            </div>
                        </div>
                    </div>



                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive" id="excel_data">
                                        <table id="ConfigTable" className="display" style={{ minWidth: "845px" }}>
                                            <thead>
                                                <tr>
                                                    <th id="select" data-orderable="false">Main Type</th>
                                                    <th id="select" data-orderable="false">Sub Type</th>
                                                    <th id="select" data-orderable="false">Priority</th>
                                                    <th data-orderable="false">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    customerList.length > 0 ?
                                                        customerList.map((items, index) => {
                                                            return <tr key={index} >
                                                                <td id="selected-data">{items.mainType}</td>
                                                                <td id="selected-data">
                                                                    {items.subType[0] === "" ? "-" : items.subType.map((curEle, idx) => {
                                                                        return <div key={idx} > {curEle} </div>
                                                                    })}
                                                                </td>
                                                                <td id="selected-data">{items.priority}</td>
                                                                <td >
                                                                    <div className="d-flex">
                                                                        <a href="/" data-toggle="modal"
                                                                            onClick={() => setUpdate({
                                                                                mainType: items.mainType,
                                                                                subType: items.subType,
                                                                                priority: items.priority,
                                                                                configId: items._id,
                                                                            })}
                                                                            data-target="#update-configuration" className="btn btn-primary shadow btn-xs sharp mr-1">
                                                                            <i className="fa fa-pencil"></i>
                                                                        </a>
                                                                        <a href="#" type="button" onClick={() => handleDeleteConfiguration(items._id)} className="btn btn-danger shadow btn-xs sharp mr-1">
                                                                            <i className="fa fa-trash"></i>
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        })
                                                        :
                                                        ""
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



            {/* <!-- Modal Add Configruration --> */}
            <div className="modal fade none-border" id="add-configuration">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>Add New Configuration</strong></h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddNewConfiguration}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <input className="form-control form-white" value={formValues.mainType} onChange={handleFormValues} placeholder="Main Type" type="text" name="mainType" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.mainType}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control form-white" value={formValues.subType} onChange={handleFormValues} placeholder="Sub Type" type="text" name="subType" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <input className="form-control form-white" value={formValues.priority} onChange={handleFormValues} placeholder="Priority" type="text" name="priority" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.priority}</span>
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

            {/* <!-- Modal Update configuration --> */}
            <div className="modal fade none-border" id="update-configuration">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>Update configuration</strong></h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateConfiguration}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <input className="form-control form-white" value={update.mainType} onChange={handleUpdateValue} placeholder="Main Type" type="text" name="mainType" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.mainType}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control form-white" value={update.subType} onChange={handleUpdateValue} placeholder="Sub Type" type="text" name="subType" />

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <input className="form-control form-white" value={update.priority} onChange={handleUpdateValue} placeholder="Priority" type="text" name="priority" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.priority}</span>
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
            {/* <div className="modal fade none-border" id="view-category">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 style={{ textTransform: "uppercase" }} className="modal-title"><strong>{update.companyName} (TO)</strong>
                                <br />
                                <p style={{ fontSize: "11px", color: "#999" }} className="text-small">GST No: {update.gstNumber}</p>

                            </h4>
                            <p>Created on <br />{update.date}</p>
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
                                    <p><b>{update.address}, {update.city}, {update.state}, {update.country}</b></p>
                                </div>

                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-6">
                                    <p>Payment Type:</p>
                                </div>
                                <div className="col-sm-6">
                                    <p><b>{update.payment} @ {update.paymentRate}</b></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p>Branch:</p>
                                </div>
                                <div className="col-sm-6">
                                    <p><b>{update.branch}</b></p>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Configuration;