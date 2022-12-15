import React, { useState, useEffect } from 'react';
import DesignTemplateForm from './DesignTemplateForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
window.$ = $
toast.configure()

let templateData = [];
let updatedFormValues = {};

const AddNewDesignProject = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const initialFormValues = {
        companyName: "",
        initalName: "",
        date: "",
        templateNo: null,
        designProjectId: ""
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [update, setUpdate] = useState(initialFormValues);
    const [designTemplateNo, setDesignTemplateNo] = useState([1]);

    const handleAddDesignTemplate = () => {
        setDesignTemplateNo([...designTemplateNo, designTemplateNo.push(designTemplateNo.length + 1)]);
    }

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const getCustomerData = async () => {
        try {
            await axios.get(`${base_url}/getCustomerData`)
                .then(res => {
                    const result = res.data;
                    setCustomerList(result);
                })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitAddNewDesign = (e) => {
        e.preventDefault();
        designTemplateNo.map((number, index) => {
            templateData = [...templateData, JSON.parse(localStorage.getItem(`DesignTemplateData${number}`))];
            return <>{index}</>
        })
        updatedFormValues = { ...formValues, templateNo: templateData }

        const isValid = validate(formValues);
        if (isValid) {
            addNewDesign();
        }
    }

    const addNewDesign = async () => {
        try {
            await axios.post(`${base_url}/addNewDesign`, { updatedFormValues })
                .then(res => {
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
                    })
                })
            setFormValues(initialFormValues);
            setDesignTemplateNo([1]);
            updatedFormValues = {};
            templateData = [];
            getCustomerData();
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getCustomerData();
    }, [])

    // console.log("formValues", formValues);
    // console.log("templateData", templateData);


    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.companyName) {
            errors.companyName = "Company Name is required";
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
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Add New Design Project</h4>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmitAddNewDesign}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <select className="form-control form-white" data-placeholder="Select Company Name..." name="companyName" value={formValues.companyName} onChange={handleFormValues} >
                                                    <option value="">--Select Company Name---</option>
                                                    {
                                                        customerList.length > 0 ?
                                                            customerList.map((curEle, index) => {
                                                                return <option key={index} value={curEle.companyName}>{curEle.companyName}</option>
                                                            })
                                                            : ""
                                                    }
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.companyName}</span>
                                            </div>
                                            <div className="col-md-6">
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
                                                    onChange={handleFormValues} className="form-control form-white" disabled={true} placeholder="Inital Name" name="initalName" />
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} ></span>
                                            </div>
                                        </div>
                                        <hr />

                                        {
                                            designTemplateNo.map((number, index) => {
                                                return <DesignTemplateForm key={index + "1" + index} templateNo={number} />;
                                            })
                                        }
                                        <button type="button" className='btn btn-sm btn-info' onClick={handleAddDesignTemplate} style={{ float: "right" }} >
                                            <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;Add Design</button>
                                        <br />
                                        <br />
                                        <br />
                                        <div className="col-md-12 d-flex justify-content-center">
                                            <button className="btn btn-primary" type="submit" >Submit</button>
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

export default AddNewDesignProject;