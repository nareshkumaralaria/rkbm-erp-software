import React, { useEffect, useState } from 'react';
import axios from "axios";

import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import '../component.css';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import $ from 'jquery'
window.$ = $
toast.configure();


// const base_url = "http://localhost:9002";
// const base_url = "https://rkbm.herokuapp.com";
const base_url = "https://rkmb-backend.vercel.app";

const DesignStatus = () => {

    const [userPrivilege, setUserPrivilege] = useState(localStorage.getItem("userPrivilege"));

    const presidents = userPrivilege === "user" ? [
        {
            name: 'Pending',
            biography: <PendingDesign />
        },
        {
            name: 'Employee work pending',
            biography: <AssignedDesign />
        },
        {
            name: 'Confirm',
            biography: <ConfirmDesign />
        },
    ] : [
        {
            name: 'Pending',
            biography: <PendingDesignForEmployee />
        },
        {
            name: 'Confirm',
            biography: <DesignSubmitted />
        },
    ];

    function getTabs() {
        return presidents.map((president, index) => ({
            title: president.name,
            getContent: () => president.biography,
            /* Optional parameters */
            key: index,
            tabClassName: 'tab',
            panelClassName: 'panel',
        }));
    }

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Design Status</h4>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <Tabs tabsWrapperclassName="tab__Wrapper" showMore={true} items={getTabs()} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DesignStatus;


// Pending Design form component
const PendingDesign = () => {

    let count = false;

    const [designFormData, setDesignFormData] = useState([]);

    const getDesignFormData = async () => {
        try {
            await axios.get(`${base_url}/getDesignFormData`)
                .then(res => {
                    const result = res.data;
                    setDesignFormData(result);
                    // console.log(customerList);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const updateDesignForm = async (id) => {
        try {
            await axios.post(`${base_url}/updateDesignForm`, { id })
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
                    getDesignFormData();
                });
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(designFormData)

    useEffect(() => {
        getDesignFormData();
        $(document).ready(function () {
            $("#example5").DataTable();
        });
    }, []);

    return (
        <div className="table-responsive">
            <table id="example5" className="display" style={{ minWidth: "845px" }}>
                <thead>
                    <tr>
                        <th data-orderable="false">Status</th>
                        <th data-orderable="false">Form</th>
                        <th data-orderable="false">Date</th>
                        <th data-orderable="false">Customer</th>
                        <th data-orderable="false">Main</th>
                        <th data-orderable="false">Sub</th>
                        <th data-orderable="false">DesignFullName</th>
                        <th data-orderable="false">Photo</th>
                        <th data-orderable="false">Employee</th>
                        <th data-orderable="false">Design Submission Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        designFormData.length > 0
                            ? designFormData.map((items, index) => {
                                return items.status === "pending" ? <tr key={index}>
                                    {count = true}
                                    <td>
                                        <button type='button' onClick={() => updateDesignForm(items._id)} className='btn btn-primary btn-sm'>Work for Employee</button>
                                    </td>
                                    <td>19621</td>
                                    <td>
                                        {items.date.slice(0, 10)}
                                    </td>
                                    <td>{items.customerName}</td>
                                    <td>{items.designMainType}</td>
                                    <td>{items.designMainSubType}</td>
                                    <td></td>
                                    <td>
                                        <img src={items.designSamplePhoto} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                    </td>
                                    <td>{items.EmployeeName}</td>
                                    <td>{items.designSubmissionDate}</td>
                                </tr>
                                    : ""
                            })
                            :
                            ""
                    }
                    {
                        !count ?
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">No Data Found</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> : ""
                    }
                </tbody>
            </table>
        </div >
    )
}


// Employee Work Pending components
const AssignedDesign = () => {

    let count = false;

    const [designFormData, setDesignFormData] = useState([]);

    const getDesignFormData = async () => {
        try {
            await axios.get(`${base_url}/getDesignFormData`)
                .then(res => {
                    const result = res.data;
                    setDesignFormData(result);
                    // console.log(customerList);
                })
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(designFormData)

    useEffect(() => {
        getDesignFormData();
        $(document).ready(function () {
            $("#example5").DataTable();
        });
    }, []);

    return (
        <div className="table-responsive">
            <table id="example5" className="display" style={{ minWidth: "845px" }}>
                <thead>
                    <tr>
                        <th data-orderable="false">Status</th>
                        <th data-orderable="false">Form</th>
                        <th data-orderable="false">Date</th>
                        <th data-orderable="false">Customer</th>
                        <th data-orderable="false">Main</th>
                        <th data-orderable="false">Sub</th>
                        <th data-orderable="false">DesignFullName</th>
                        <th data-orderable="false">Photo</th>
                        <th data-orderable="false">Employee</th>
                        <th data-orderable="false">Design Submission Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        designFormData.length > 0
                            ? designFormData.map((items, index) => {
                                return items.status === "assigned" ? <tr key={index}>
                                    {count = true}
                                    <td className="text-warning">Assigned</td>
                                    <td>19621</td>
                                    <td>
                                        {items.date.slice(0, 10)}
                                    </td>
                                    <td>{items.customerName}</td>
                                    <td>{items.designMainType}</td>
                                    <td>{items.designMainSubType}</td>
                                    <td></td>
                                    <td>
                                        <img src={items.designSamplePhoto} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                    </td>
                                    <td>{items.EmployeeName}</td>
                                    <td>{items.designSubmissionDate}</td>
                                </tr>
                                    : ""
                            })
                            :
                            ""
                    }
                    {
                        !count ?
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">No Data Found</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> : ""
                    }
                </tbody>
            </table>
        </div >
    )
}

// Employee assigned pending work
const PendingDesignForEmployee = () => {

    let count = false;

    const userName = localStorage.getItem("userName");

    const initialUploadWorkFormValues = {
        up_customerName: "",
        up_designNumber: "",
        up_designFullName: "",
        up_mainType: "",
        up_subType: "",
        up_designCardUse: "",
        up_id: ""
    }

    const [designFormData, setDesignFormData] = useState([]);
    const [designNumber, setDesignNumber] = useState({ workID: "", generatedDesignNumber: null });
    const [formValues, setFormValues] = useState({ enterDesignNumber: "" });
    const [formErrors, setFormErrors] = useState({});
    const [uploadWorkFormValues, setUploadWorkFormValues] = useState(initialUploadWorkFormValues);
    const [image, setImage] = useState({ localURL: "", imageObject: null });

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleUploadWorkFormValues = (e) => {
        const { name, value } = e.target;
        setUploadWorkFormValues({ ...uploadWorkFormValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            updateDesignNumber();
        }
    }

    const handleUploadWorkSubmit = (e) => {
        e.preventDefault();
        const isValid = validateUploadWork(uploadWorkFormValues);
        if (isValid) {
            uploadWork();
        }
    }

    const uploadWork = async () => {
        try {

            let imageUrl = undefined;
            if (image.imageObject) {
                const formData = new FormData();
                formData.append("file", image.imageObject);
                formData.append("upload_preset", "dketytum");
                const dataRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/nareshkumarcloud/image/upload",
                    formData
                );
                imageUrl = dataRes.data.url;
            }

            await axios.post(`${base_url}/uploadWork`, { uploadWorkFormValues, imageUrl })
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
                    getDesignFormData();
                    setUploadWorkFormValues({
                        ...uploadWorkFormValues, up_designCardUse: ""
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    const updateDesignNumber = async (id) => {
        try {
            await axios.post(`${base_url}/updateDesignNumber`, designNumber)
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
                    getDesignFormData();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetNumber = (id) => {
        var randomNumber = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            randomNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setDesignNumber({ ...designNumber, generatedDesignNumber: randomNumber, workID: id });
    }

    const handleConfirmForAdmin = async (id) => {
        try {
            await axios.post(`${base_url}/confirmForAdmin`, { id, submittedDate: new Date() })
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
                    getDesignFormData();
                });
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(uploadWorkFormValues);

    const getDesignFormData = async () => {
        try {
            await axios.get(`${base_url}/getDesignFormData`)
                .then(res => {
                    const result = res.data;
                    setDesignFormData(result);
                    // console.log(designFormData);
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDesignFormData();
        $(document).ready(function () {
            $("#example5").DataTable();
        });
    }, []);

    const validateUploadWork = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.up_designCardUse) {
            errors.up_designCardUse = "field is requird";
            isValid = false;
        }
        if (!values.up_designNumber) {
            errors.up_designNumber = "Design Number is requird";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.enterDesignNumber || values.enterDesignNumber !== designNumber.generatedDesignNumber) {
            errors.notMatch = "Design no. not match";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return (
        <>
            <div className="table-responsive">
                <table id="example5" className="display" style={{ minWidth: "845px" }}>
                    <thead>
                        <tr>
                            <th data-orderable="false">Action</th>
                            <th data-orderable="false">Status</th>
                            <th data-orderable="false">Card</th>
                            <th data-orderable="false">Design No</th>
                            <th data-orderable="false">Final Design Image</th>
                            <th data-orderable="false">Form</th>
                            <th data-orderable="false">Date</th>
                            <th data-orderable="false">Main</th>
                            <th data-orderable="false">Sub</th>
                            <th data-orderable="false">Design Full Name</th>
                            <th data-orderable="false">Design Details</th>
                            <th data-orderable="false">Sample Photo</th>
                            <th data-orderable="false">Customer</th>
                            <th data-orderable="false">Design Submission Date</th>
                            <th data-orderable="false">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            designFormData.length > 0
                                ? designFormData.map((items, index) => {
                                    return (items.status === "assigned" && items.EmployeeName === userName) ? <tr key={index}>
                                        {count = true}
                                        <td>
                                            <button type='button' data-toggle="modal" data-target="#upload-work"
                                                onClick={() => setUploadWorkFormValues({
                                                    up_customerName: items.customerName,
                                                    up_designNumber: items.designNumber,
                                                    up_mainType: items.designMainType,
                                                    up_subType: items.designMainSubType,
                                                    up_id: items._id,
                                                })}
                                                className='btn btn-primary btn-sm'>UploadWork</button>
                                        </td>
                                        <td>
                                            {
                                                items.designNumber === ""
                                                    ?
                                                    <button type='button' onClick={() => handleGetNumber(items._id)} data-toggle="modal" data-target="#get-number" className='btn btn-success btn-sm'>GetNumber</button>
                                                    :
                                                    null
                                            }

                                        </td>
                                        <td>{items.designTotoalCard}</td>
                                        <td>{items.designNumber}</td>
                                        <td>
                                            <img src={items.finalDesignImage} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                        </td>
                                        <td>19621</td>
                                        <td>
                                            {items.date.slice(0, 10)}
                                        </td>
                                        <td>{items.designMainType}</td>
                                        <td>{items.designMainSubType}</td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <img src={items.designSamplePhoto} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                            {/* <a src={items.designSamplePhoto} className='btn btn-secondary btn-sm'>Download</a> */}
                                        </td>
                                        <td>{items.customerName}</td>
                                        <td>{items.designSubmissionDate}</td>
                                        <td>
                                            <button onClick={() => handleConfirmForAdmin(items._id)} className='btn btn-info btn-sm'>ConfirmForAdmin</button>
                                        </td>
                                    </tr>
                                        : ""
                                })
                                :
                                ""
                        }
                        {
                            !count ?
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-center">No Data Found</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> : ""
                        }
                    </tbody>
                </table>
            </div >

            {/* get number modal */}
            <div className="modal fade none-border" id="get-number">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                <strong>Get Number</strong>
                            </h4>
                        </div>
                        <div className="modal-body pb-0">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="yourDesignNumber" className="form-label mb-0">Your Design Number</label>
                                        <input type="text" disabled={true} style={{ backgroundColor: "#e9e9e9" }} className="form-control form-white" defaultValue={designNumber.generatedDesignNumber} name="yourDesignNumber" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}></span>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="enterDesignNumber" className="form-label mb-0">Enter Design Number</label>
                                        <input type="text" className="form-control form-white" value={formValues.enterDesignNumber} onChange={handleFormValues} name="enterDesignNumber" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.notMatch}</span>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" >Close</button>
                                    <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* upload work modal */}
            <div className="modal fade none-border" id="upload-work">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                <strong>Design Work Upload</strong>
                            </h4>
                        </div>
                        <div className="modal-body pb-0">
                            <form onSubmit={handleUploadWorkSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="up_customerName" className="form-label mb-0">Customer Name</label>
                                        <input type="text" disabled={true} style={{ backgroundColor: "#e9e9e9" }} className="form-control form-white" defaultValue={uploadWorkFormValues.up_customerName} name="up_customerName" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}></span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="up_designNumber" className="form-label mb-0">Design Number</label>
                                        <input type="text" disabled={true} style={{ backgroundColor: "#e9e9e9" }} className="form-control form-white" defaultValue={uploadWorkFormValues.up_designNumber} name="up_designNumber" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.up_designNumber}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="up_mainType" className="form-label mb-0">Main Type</label>
                                        <input type="text" disabled={true} style={{ backgroundColor: "#e9e9e9" }} className="form-control form-white" defaultValue={uploadWorkFormValues.up_mainType} name="up_mainType" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}></span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="up_subType" className="form-label mb-0">Sub Type</label>
                                        <input type="text" disabled={true} style={{ backgroundColor: "#e9e9e9" }} className="form-control form-white" defaultValue={uploadWorkFormValues.up_subType} name="up_subType" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}></span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="up_designFullName" className="form-label mb-0">Design Full Name</label>
                                        <input type="text" className="form-control form-white" onChange={handleUploadWorkFormValues} value={uploadWorkFormValues.up_designFullName} name="up_designFullName" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}></span>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="up_designCardUse" className="form-label mb-0">Total Design Card Use</label>
                                        <input type="text" className="form-control form-white" onChange={handleUploadWorkFormValues} value={uploadWorkFormValues.up_designCardUse} name="up_designCardUse" />
                                        <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }}>{formErrors.up_designCardUse}</span>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label mb-0">New Design</label>
                                        <div className="input-group">
                                            <input type="file" className="form-control" onChange={(e) => setImage({ imageObject: e.target.files[0], localURL: URL.createObjectURL(e.target.files[0]) })} />
                                        </div>

                                    </div>
                                    <div className="col-12 text-center">
                                        <img src={image.localURL} alt="" style={{ height: "120px", margin: "30px 0" }} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default waves-effect" data-dismiss="modal" >Close</button>
                                    <button type="submit" className="btn btn-danger waves-effect waves-light save-category">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// Employee submitted design for review components
const DesignSubmitted = () => {

    let count = false;

    const userName = localStorage.getItem("userName");

    const [designFormData, setDesignFormData] = useState([]);

    const getDesignFormData = async () => {
        try {
            await axios.get(`${base_url}/getDesignFormData`)
                .then(res => {
                    const result = res.data;
                    setDesignFormData(result);
                    // console.log(customerList);
                })
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(designFormData)

    useEffect(() => {
        getDesignFormData();
        $(document).ready(function () {
            $("#example5").DataTable();
        });
    }, []);

    return (
        <div className="table-responsive">
            <table id="example5" className="display" style={{ minWidth: "845px" }}>
                <thead>
                    <tr>
                        <th data-orderable="false">Date</th>
                        <th data-orderable="false">Customer</th>
                        <th data-orderable="false">Main</th>
                        <th data-orderable="false">Sub</th>
                        <th data-orderable="false">Card</th>
                        <th data-orderable="false">Design No</th>
                        <th data-orderable="false">Final Design Image</th>
                        <th data-orderable="false">Design Full Name</th>
                        <th data-orderable="false">Design Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        designFormData.length > 0
                            ? designFormData.map((items, index) => {
                                return (items.status === "completed" && items.EmployeeName === userName) ? <tr key={index}>
                                    {count = true}
                                    <td>{items.submittedDate.slice(0, 10)}</td>
                                    <td>{items.customerName}</td>
                                    <td>{items.designMainType}</td>
                                    <td>{items.designMainSubType}</td>
                                    <td>{items.designTotoalCard}</td>
                                    <td>{items.designNumber}</td>
                                    <td>
                                        <img src={items.finalDesignImage} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                    </td>
                                    <td>{items.designFullName}</td>
                                    <td>{items.designDetail}</td>
                                </tr>
                                    : ""
                            })
                            :
                            ""
                    }
                    {
                        !count ?
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">No Data Found</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr> : ""
                    }
                </tbody>
            </table>
        </div >
    )
}


// Employee assigned work submitted
const ConfirmDesign = () => {

    let count = false;
    const [designFormData, setDesignFormData] = useState([]);

    const getDesignFormData = async () => {
        try {
            await axios.get(`${base_url}/getDesignFormData`)
                .then(res => {
                    const result = res.data;
                    setDesignFormData(result);
                    // console.log(designFormData);
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDesignFormData();
        $(document).ready(function () {
            $("#example5").DataTable();
        });
    }, []);

    return (
        <>
            <div className="table-responsive">
                <table id="example5" className="display" style={{ minWidth: "845px" }}>
                    <thead>
                        <tr>
                            <th data-orderable="false">Design Entry Type</th>
                            <th data-orderable="false">Employee</th>
                            <th data-orderable="false">Card</th>
                            <th data-orderable="false">Design No</th>
                            <th data-orderable="false">Final Design Image</th>
                            <th data-orderable="false">Form</th>
                            <th data-orderable="false">Date</th>
                            <th data-orderable="false">Customer</th>
                            <th data-orderable="false">Main</th>
                            <th data-orderable="false">Sub</th>
                            <th data-orderable="false">Design Full Name</th>
                            <th data-orderable="false">Design Details</th>
                            <th data-orderable="false">Sample Photo</th>
                            <th data-orderable="false">Design Modify Status</th>
                            <th data-orderable="false">Modify Date</th>
                            <th data-orderable="false">Modify Status</th>
                            <th data-orderable="false">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            designFormData.length > 0
                                ? designFormData.map((items, index) => {
                                    return items.status === "completed" ? <tr key={index}>
                                        {count = true}
                                        <td>{items.designEntryType}</td>
                                        <td>{items.EmployeeName}</td>
                                        <td>{items.designTotoalCard}</td>
                                        <td>{items.designNumber}</td>
                                        <td>
                                            <img src={items.finalDesignImage} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                        </td>
                                        <td>19621</td>
                                        <td>
                                            {items.date.slice(0, 10)}
                                        </td>
                                        <td>{items.customerName}</td>
                                        <td>{items.designMainType}</td>
                                        <td>{items.designMainSubType}</td>
                                        <td>{items.designFullName}</td>
                                        <td>{items.designDetail}</td>
                                        <td>
                                            <img src={items.designSamplePhoto} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                        </td>
                                        <td>{items.designModifyStatus}</td>
                                        <td>{items.designModifyDate}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm'>DesignModify</button>
                                        </td>
                                        <td>
                                            <button className='btn btn-info btn-sm'>Reject</button>
                                        </td>
                                    </tr>
                                        : ""
                                })
                                :
                                ""
                        }
                        {
                            !count ?
                                "" : ""
                        }
                    </tbody>
                </table>
            </div >
        </>
    )
}