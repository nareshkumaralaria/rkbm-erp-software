import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const DesignForm = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const initialFormValues = {
        designEntryType: "",
        companyName: "",
        initalName: "",
        customerGSTno: "",
        customerName: "",
        customerNumber: "",
        customerEmail: "",
        designMainType: "",
        designMainSubType: "",
        designDetail: "",
        designSamplePhoto: undefined,
        designSubmissionDate: "",
        remark: "",
        EmployeeName: "",
        authorizedName: "",
        date: "",
        designFormId: ""
    }

    const [image, setImage] = useState();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [mainTypeList, setMainTypeList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmitAddNewDesignForm = (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            addNewDesignForm();
        }
    }

    const addNewDesignForm = async () => {
        setLoading(true);
        try {

            let imageUrl = undefined;
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", "dketytum");
                const dataRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/nareshkumarcloud/image/upload",
                    formData
                );
                imageUrl = dataRes.data.url;
            }

            await axios.post(`${base_url}/addNewDesignForm`, { formValues, imageUrl })
                .then(res => {
                    setLoading(false)
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        pauseOnFocusLoss: false,
                        draggable: true,
                        progress: undefined,
                    })
                    setFormValues(initialFormValues);
                })
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getCustomerData = async () => {
        try {
            await axios.get(`${base_url}/getCustomerData`)
                .then(res => {
                    const result = res.data;
                    setCustomerList(result);
                    // console.log(customerList);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getConfigurationData = async () => {
        try {
            await axios.get(`${base_url}/getConfigurationData`)
                .then(res => {
                    const result = res.data;
                    setMainTypeList(result);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeData = async () => {
        try {
            await axios.get(`${base_url}/getEmployeeData`)
                .then(res => {
                    const result = res.data;
                    setEmployeeList(result);
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomerData();
        getConfigurationData();
        getEmployeeData();
    }, [])

    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.designEntryType) {
            errors.designEntryType = "Design Entry Type is required";
            isValid = false;
        }
        if (!values.companyName) {
            errors.companyName = "Company Name is required";
            isValid = false;
        }
        if (!values.designMainType) {
            errors.designMainType = "Design Main Type is required";
            isValid = false;
        }
        if (!values.designSubmissionDate) {
            errors.designSubmissionDate = "Design Submission Date is required";
            isValid = false;
        }
        if (!values.EmployeeName) {
            errors.EmployeeName = "Employer Name is required";
            isValid = false;
        }
        if (!values.authorizedName) {
            errors.authorizedName = "Authorized Name is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    }

    // console.log("Employee Data: ", employeeList);

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Design Form</h4>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmitAddNewDesignForm}>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label htmlFor="designEntryType" className="form-label mb-0">Design Entry Type</label>
                                                <select className="form-control form-white" value={formValues.designEntryType} onChange={handleFormValues} name="designEntryType" >
                                                    <option value="">-- Select --</option>
                                                    <option value="Creation">CREATION</option>
                                                    <option value="Copy">COPY</option>
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.designEntryType}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="companyName" className="form-label mb-0">Company Name</label>
                                                <select className="form-control form-white" value={formValues.companyName} onChange={handleFormValues} name="companyName">
                                                    <option value="">-- Select --</option>
                                                    {
                                                        customerList.length > 0 ?
                                                            customerList.map((items, index) => {
                                                                return <option key={index} value={items.companyName}>{items.companyName}</option>
                                                            })
                                                            : ""
                                                    }
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.companyName}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="initalName" className="form-label mb-0">Inital Name</label>
                                                <input type="text"
                                                    value={
                                                        customerList.length > 0 ?
                                                            customerList.filter((item) => {
                                                                return item.companyName === formValues.companyName
                                                            }).map((curEle) => {
                                                                formValues.initalName = curEle.initalName
                                                                return curEle.initalName;
                                                            })
                                                            : ""
                                                    }
                                                    onChange={handleFormValues} className="form-control form-white" disabled={true} name="initalName" style={{ background: "#eee" }} />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="customerGSTno" className="form-label mb-0">Customer GSTNO</label>
                                                <input type="text"
                                                    value={
                                                        customerList.length > 0 ?
                                                            customerList.filter((item) => {
                                                                return item.companyName === formValues.companyName
                                                            }).map((curEle) => {
                                                                formValues.customerGSTno = curEle.gstNumber
                                                                return curEle.gstNumber;
                                                            })
                                                            : ""
                                                    }
                                                    onChange={handleFormValues} className="form-control form-white" disabled={true} name="customerGSTno" style={{ background: "#eee" }} />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="customerName" className="form-label mb-0">Customer Name</label>
                                                <input type="text"
                                                    value={
                                                        customerList.length > 0 ?
                                                            customerList.filter((item) => {
                                                                return item.companyName === formValues.companyName
                                                            }).map((curEle) => {
                                                                formValues.customerName = curEle.fullName
                                                                return curEle.fullName;
                                                            })
                                                            : ""
                                                    }
                                                    onChange={handleFormValues} className="form-control form-white" disabled={true} name="customerName" style={{ background: "#eee" }} />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="customerNumber" className="form-label mb-0">Customer Number</label>
                                                <input type="text"
                                                    value={
                                                        customerList.length > 0 ?
                                                            customerList.filter((item) => {
                                                                return item.companyName === formValues.companyName
                                                            }).map((curEle) => {
                                                                formValues.customerNumber = curEle.phoneNumber
                                                                return curEle.phoneNumber;
                                                            })
                                                            : ""
                                                    }
                                                    onChange={handleFormValues} className="form-control form-white" disabled={true} name="customerNumber" style={{ background: "#eee" }} />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="customerEmail" className="form-label mb-0">Customer Email</label>
                                                <input type="text"
                                                    value={
                                                        customerList.length > 0 ?
                                                            customerList.filter((item) => {
                                                                return item.companyName === formValues.companyName
                                                            }).map((curEle) => {
                                                                formValues.customerEmail = curEle.email
                                                                return curEle.email;
                                                            })
                                                            : ""
                                                    }
                                                    onChange={handleFormValues} className="form-control form-white" disabled={true} name="customerEmail" style={{ background: "#eee" }} />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="designMainType" className="form-label mb-0">Design MainType</label>
                                                <select className="form-control form-white" value={formValues.designMainType} onChange={handleFormValues} name="designMainType">
                                                    <option value="">-- Select --</option>
                                                    {
                                                        mainTypeList.length > 0 ?
                                                            mainTypeList.map((items, index) => {
                                                                return <option key={index} value={items.mainType}>{items.mainType}</option>
                                                            })
                                                            : ""
                                                    }
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.designMainType}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="designMainSubType" className="form-label mb-0">Design Main SubType</label>
                                                <select className="form-control form-white" value={formValues.designMainSubType} onChange={handleFormValues} name="designMainSubType">
                                                    <option value="">-- Select --</option>
                                                    {
                                                        mainTypeList.length > 0 ?
                                                            mainTypeList.filter((item) => {
                                                                return item.mainType === formValues.designMainType
                                                            }).map((curEle) => {
                                                                return curEle.subType.map((ele, i) => {
                                                                    return <option key={i} value={ele}>{ele}</option>
                                                                })
                                                            })
                                                            : ""
                                                    }
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="designDetail" className="form-label mb-0">Deisgn detail</label>
                                                <textarea className="form-control" value={formValues.designDetail} onChange={handleFormValues} style={{ height: "40px" }} name="designDetail"></textarea>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="designSamplePhoto" className="form-label mb-0">Design Sample Photo</label>
                                                <div className="input-group">
                                                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="designSubmissionDate" className="form-label mb-0">Design Submission Date</label>
                                                <div className="input-group">
                                                    <input type="date" className="form-control" title="design submission date" value={formValues.designSubmissionDate} onChange={handleFormValues} name="designSubmissionDate" />
                                                </div>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.designSubmissionDate}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="remark" className="form-label mb-0">Remark</label>
                                                <textarea className="form-control" value={formValues.remark} onChange={handleFormValues} style={{ height: "40px" }} name="remark"></textarea>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="EmployeeName" className="form-label mb-0">Employee Name</label>
                                                <select className="form-control form-white" value={formValues.EmployeeName} onChange={handleFormValues} name="EmployeeName">
                                                    <option value="">-- Select --</option>
                                                    {
                                                        employeeList.length > 0 ?
                                                            employeeList.map((items, index) => {
                                                                return items.privilege === "employee" && <option key={index} value={items.fullName}>{items.fullName}</option>
                                                            })
                                                            : ""
                                                    }
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.EmployeeName}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="authorizedName" className="form-label mb-0">Authorized Name</label>
                                                <input type="text" className="form-control" value={formValues.authorizedName} onChange={handleFormValues} name="authorizedName" />
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.authorizedName}</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="col-md-12 d-flex justify-content-center">
                                            <button className="btn btn-primary" type="submit" >
                                                {loading ? "Loading..." : "Submit"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DesignForm;