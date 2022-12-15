import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../component.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import $ from 'jquery'
window.$ = $
toast.configure();

const BillsList = () => {
    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";
    const navigate = useNavigate();

    const initialFormValues = {
        companyName: "",
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [billsData, setBillsData] = useState([]);
    const [loading, setLoading] = useState({ searchAll: false, searchOne: false });

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSearchAllBills = async () => {
        setLoading({ ...loading, searchAll: true });
        try {
            await axios.get(`${base_url}/getBills`).then((res) => {
                const result = res.data;
                if (res.data.length > 0) {
                    toast.success("Data Found", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        pauseOnFocusLoss: false,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("No Data Found", {
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
                setBillsData(result);
                setLoading({ ...loading, searchAll: false });
            });
        } catch (error) {
            toast.error("SERVER ERROR!!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
            });
            setLoading({ ...loading, searchAll: false });
            console.log(error);
        }
    }

    const handleSearchOneCompanyBills = (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            searchOneComapnyBill();
        }
    }

    const searchOneComapnyBill = async () => {
        setLoading({ ...loading, searchOne: true });
        try {
            await axios.post(`${base_url}/getOneCompanyBills`, { formValues }).then((res) => {
                const result = res.data;
                if (res.data.length > 0) {
                    toast.success("Data Found", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        pauseOnFocusLoss: false,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("No Data Found", {
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
                setBillsData(result);
                setLoading({ ...loading, searchOne: false });
            });
        } catch (error) {
            toast.error("SERVER ERROR!!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
            });
            setLoading({ ...loading, searchOne: false });
            console.log(error);
        }
    }

    const handleViewBillDetails = (bill) => {
        navigate('/accounting/BillsList/view', { state: bill });
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
            $("#clientTable").DataTable();
        });
    }, []);


    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.companyName) {
            errors.companyName = "field is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

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

    // console.log("billsData: ", billsData);
    // console.log("formValues: ", formValues);

    return (
        <>

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0 align-self-center">
                            <div className="welcome-text">
                                <h4>Search Bill</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div>
                                <span id="responce"></span>
                            </div>
                            <div className="d-flex">
                                <button onClick={handleSearchAllBills} className="btn btn-rounded btn-info mr-1" >
                                    {loading.searchAll ? "Loading..." : "Search All"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSearchOneCompanyBills}>
                                        <div className="row">

                                            <div className="col-md-12">
                                                <label htmlFor="companyName" className="form-label mb-0">Customer Name</label>
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

                                        </div>

                                        <hr />

                                        <div className="col-md-12 d-flex justify-content-around">
                                            <button className="btn btn-primary" type="submit" >
                                                {loading.searchOne ? "Loading..." : "Search"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="content-body pt-0" >
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0 d-flex align-items-center">
                            <div className="welcome-text">
                                <h4>Bill List Data</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div>
                                <span id="responce"></span>
                            </div>
                            <div className="d-flex">
                                <a href="#" onClick={() => exportToExcel("Bills.csv")} className="btn btn-rounded btn-primary mr-1" >
                                    <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
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
                                                    <th id="select" data-orderable="true">Invoice No</th>
                                                    <th id="select" data-orderable="false">Invoice Date</th>
                                                    <th id="select" data-orderable="false">Customer</th>
                                                    <th id="select" data-orderable="false">Invoice Start Date</th>
                                                    <th id="select" data-orderable="false">Invoice End Date</th>
                                                    <th id="select" data-orderable="false">Paid Type</th>
                                                    <th data-orderable="false">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    billsData.length > 0 ?
                                                        billsData.map((bill, index) => {
                                                            return <tr key={index}>
                                                                <td id="selected-data">{bill.invoiceNumber}</td>
                                                                <td id="selected-data">{bill.invoiceDate}</td>
                                                                <td id="selected-data">{bill.companyName}</td>
                                                                <td id="selected-data">{bill.startDate}</td>
                                                                <td id="selected-data">{bill.endDate}</td>
                                                                <td id="selected-data" className={`${bill.paymentType === "Unpaid" ? "text-danger" : "text-success"}`}>{bill.paymentType}</td>
                                                                <td>
                                                                    <p onClick={() => handleViewBillDetails(bill)} className="btn btn-info shadow btn-xs sharp mb-0" style={{ cursor: "pointer" }}>
                                                                        <i className="fa fa-eye"></i>
                                                                    </p>
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


        </>
    );
};

export default BillsList;
