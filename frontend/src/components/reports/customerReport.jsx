import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import $ from 'jquery'
window.$ = $
toast.configure();

let customerPerAmount = [];
// let customerTotalMonthAmount = 0;

const CustomerReport = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const initialFormValues = {
        companyName: "",
        startDate: "",
        endDate: "",
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [designData, setDesignData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perAmount, setPerAmount] = useState({});
    const [customerTotalMonthAmount, setCustomerTotalMonthAmount] = useState(0);

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleCustomerReportSearch = (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            searchCustomerReport();
        }
    }

    const handlePerAmount = (e) => {
        const { name, value } = e.target;
        setPerAmount({ ...perAmount, [name]: value });
    }

    const searchCustomerReport = async () => {
        setLoading(true);
        try {
            await axios.post(`${base_url}/searchCustomerReport`, { formValues })
                .then((res) => {
                    setLoading(false);
                    const result = res.data.data;
                    setDesignData(result);
                    if (res.data.data.length > 0) {
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
                    }
                    if (res.data.data.length === 0) {
                        toast.error(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            pauseOnFocusLoss: false,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                });
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomerData = async () => {
        try {
            await axios.get(`${base_url}/getCustomerData`).then((res) => {
                const result = res.data;
                setCustomerList(result);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCustomerData();
        $(document).ready(function () {
            $("#example5").DataTable();
        });
    }, []);

    if (Object.keys(perAmount).length == 0) {
        designData.map((items, index) => {
            perAmount[items._id] = items.perAmount;
            setCustomerTotalMonthAmount(preState => preState + parseInt(perAmount[items._id]))
        })
    }

    const handleUpdateCustomereport = async () => {
        await setCustomerTotalMonthAmount(0);
        for (var keyName in perAmount) {
            var ele = {};
            ele.id = keyName;
            ele.amount = perAmount[keyName]
            setCustomerTotalMonthAmount(preState => preState + parseInt(perAmount[keyName]))
            customerPerAmount.push(ele);
        }
        // console.log("customerPerAmount: ", customerPerAmount, customerTotalMonthAmount);

        try {
            await axios.post(`${base_url}/updateCustomerReport`, { customerPerAmount })
                .then((res) => {
                    setLoading(false);
                    const result = res.data.message;
                    customerPerAmount = [];
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

                });
        } catch (error) {
            console.log(error);
        }


    }

    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.companyName) {
            errors.companyName = "field is required";
            isValid = false;
        }
        if (!values.startDate) {
            errors.startDate = "field is required";
            isValid = false;
        }
        if (!values.endDate) {
            errors.endDate = "field is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // console.log("designData: ", designData);
    // console.log("customerList: ", customerList);
    // console.log("perAmount: ", perAmount);
    // console.log("customerPerAmount: ", customerPerAmount);
    // console.log("formValues: ", formValues);

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Customer Report Search</h4>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleCustomerReportSearch}>
                                        <div className="row">

                                            <div className="col-md-12">
                                                <label htmlFor="companyName" className="form-label mb-0">Customer companyName</label>
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
                                                <label htmlFor="startDate" className="form-label mb-0">Start Date</label>
                                                <div className="input-group">
                                                    <input type="date" value={formValues.startDate} onChange={handleFormValues} className="form-control" title="Start Date" name="startDate" />
                                                </div>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.startDate}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="endDate" className="form-label mb-0">End Date</label>
                                                <div className="input-group">
                                                    <input type="date" className="form-control" value={formValues.endDate} onChange={handleFormValues} title="End Date" name="endDate" />
                                                </div>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.endDate}</span>
                                            </div>

                                        </div>

                                        <hr />

                                        <div className="col-md-12 d-flex justify-content-center">
                                            <button className="btn btn-primary" type="submit" >
                                                {loading ? "Loading..." : "Search"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0 d-flex align-items-center">
                            <div className="welcome-text">
                                <h4>Customer Report Deatils</h4>
                            </div>
                        </div>
                        {/* <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div className="d-flex">
                                <p className="btn btn-rounded btn-info mr-1 mb-0" onClick={() => exportToExcel("DesignData.csv")} style={{ cursor: "pointer" }}>
                                    <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
                                </p>
                            </div>
                        </div> */}
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="example5" className="display" style={{ minWidth: "845px" }}>
                                            <thead>
                                                <tr>
                                                    <th data-orderable="false">Action</th>
                                                    <th id="select" data-orderable="false">Final Date</th>
                                                    <th id="select" data-orderable="false">Company</th>
                                                    <th id="select" data-orderable="false">Customer</th>
                                                    <th id="select" data-orderable="false">Main</th>
                                                    <th id="select" data-orderable="false">Sub</th>
                                                    <th id="select" data-orderable="false">designFullName</th>
                                                    <th id="select" data-orderable="false">Modify Final Image</th>
                                                    <th id="select" data-orderable="false">Final Design image</th>
                                                    <th id="select" data-orderable="false">Card No</th>
                                                    <th id="select" data-orderable="false">Per</th>
                                                    <th id="select" data-orderable="false">Customer pay amount</th>
                                                    <th id="select" data-orderable="false">Direct type</th>
                                                    <th id="select" data-orderable="false">type</th>
                                                    <th id="select" data-orderable="false">Employee Name</th>
                                                    <th id="select" data-orderable="false">Deisgn Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    designData.length > 0
                                                        ? designData.map((items, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    <button type='button' className='btn btn-primary btn-sm'>Edit</button>
                                                                </td>
                                                                <td id="selected-data">
                                                                    {items.submittedDate?.slice(0, 10)}
                                                                </td>
                                                                <td id="selected-data">{items.companyName}</td>
                                                                <td id="selected-data">{items.customerName}</td>
                                                                <td id="selected-data">{items.designMainType}</td>
                                                                <td id="selected-data">{items.designMainSubType}</td>
                                                                <td id="selected-data">{items.designFullName}</td>
                                                                <td id="selected-data">
                                                                    <img src={items.designSamplePhoto} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                                                </td>
                                                                <td id="selected-data">
                                                                    <img src={items.finalDesignImage} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                                                </td>
                                                                <td id="selected-data">{items.designTotoalCard}</td>
                                                                <td id="selected-data">
                                                                    <input type="number" name={items._id} defaultValue={items.perAmount} onChange={handlePerAmount} value={perAmount.per} className='w-100' />
                                                                </td>
                                                                <td id="selected-data">
                                                                    {
                                                                        perAmount[items._id] !== undefined
                                                                            ? perAmount[items._id]
                                                                            : items.perAmount
                                                                    }
                                                                    {/* {
                                                                        console.log("perAmount[items._id]: ", perAmount[items._id])
                                                                    } */}
                                                                    {/* {
                                                                        customerList.map((customer, index) => {
                                                                            return customer.companyName === items.companyName ?
                                                                                customer.paymentRate : null
                                                                        })
                                                                    } */}
                                                                </td>
                                                                <td id="selected-data">
                                                                    <select name="" id="">
                                                                        <option value="Fixed">Fixed</option>
                                                                        <option value="Not Fixed">Not Fixed</option>
                                                                    </select>
                                                                </td>
                                                                <td id="selected-data">
                                                                    {
                                                                        customerList.map((customer, index) => {
                                                                            return customer.companyName === items.companyName ?
                                                                                customer.payment : null
                                                                        })
                                                                    }
                                                                </td>
                                                                <td id="selected-data">{items.EmployeeName}</td>
                                                                <td id="selected-data">{items.status}</td>
                                                            </tr>
                                                        })
                                                        :
                                                        ""
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="11">Total</td>
                                                    <td>{customerTotalMonthAmount}</td>
                                                    <td colSpan="4"></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className='text-center'>
                                        <button className='btn btn-info mt-4' onClick={handleUpdateCustomereport} disabled={designData.length > 0 ? false : true}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CustomerReport;