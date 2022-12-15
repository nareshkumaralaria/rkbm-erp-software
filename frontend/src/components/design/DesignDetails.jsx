import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from 'jquery'
window.$ = $
toast.configure();

const DesignDetails = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const initialFormValues = {
        statusType: "",
        companyName: "",
        startDate: "",
        endDate: "",
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [designData, setDesignData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleDesignDataSearch = (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            searchDesignData();
        }
    }

    const searchDesignData = async () => {
        setLoading(true);
        try {
            await axios.post(`${base_url}/searchDesignData`, { formValues })
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

    const validate = (values) => {
        const errors = {};
        let isValid = true;
        if (!values.statusType) {
            errors.statusType = "field is required";
            isValid = false;
        }
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
        if (designData.length <= 0) {
            toast.error("No Data Found for Export!!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
            });
            return;
        }
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

    // console.log(designData);

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Design Information Search</h4>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleDesignDataSearch}>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label htmlFor="statusType" className="form-label mb-0">Status</label>
                                                <select className="form-control form-white" value={formValues.statusType} onChange={handleFormValues} name="statusType">
                                                    <option value="">-- Select --</option>
                                                    <option value="completed">Success</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="assigned">Working in Process</option>
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.statusType}</span>
                                            </div>

                                            <div className="col-md-6">
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
                                                    <input type="date" className="form-control" title="Start Date" name="startDate" />
                                                </div>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} ></span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="endDate" className="form-label mb-0">End Date</label>
                                                <div className="input-group">
                                                    <input type="date" className="form-control" title="End Date" name="endDate" />
                                                </div>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} ></span>
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
                                <h4>Design Data</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div className="d-flex">
                                <p className="btn btn-rounded btn-info mr-1 mb-0" onClick={() => exportToExcel("DesignData.csv")} style={{ cursor: "pointer" }}>
                                    <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
                                </p>
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
                                                    <th data-orderable="false">Action</th>
                                                    <th id="select" data-orderable="false">Form</th>
                                                    <th id="select" data-orderable="false">Date</th>
                                                    <th id="select" data-orderable="false">Design Entry Type</th>
                                                    <th id="select" data-orderable="false">Employee</th>
                                                    <th id="select" data-orderable="false">Main</th>
                                                    <th id="select" data-orderable="false">Sub</th>
                                                    <th id="select" data-orderable="false">DesignFullName</th>
                                                    <th id="select" data-orderable="false">DesignDetail</th>
                                                    <th id="select" data-orderable="false">Photo</th>
                                                    <th id="select" data-orderable="false">Design Submission Date</th>
                                                    <th id="select" data-orderable="false">Customer Company Name</th>
                                                    <th id="select" data-orderable="false">LastCustomer InitialsNumber</th>
                                                    <th id="select" data-orderable="false">Remark</th>
                                                    <th id="select" data-orderable="false">Display</th>
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
                                                                <td id="selected-data">19621</td>
                                                                <td id="selected-data">
                                                                    {items.date.slice(0, 10)}
                                                                </td>
                                                                <td id="selected-data">{items.designEntryType}</td>
                                                                <td id="selected-data">{items.EmployeeName}</td>
                                                                <td id="selected-data">{items.designMainType}</td>
                                                                <td id="selected-data">{items.designMainSubType}</td>
                                                                <td id="selected-data">{items.designFullName}</td>
                                                                <td id="selected-data">{items.designDetail}</td>
                                                                <td id="selected-data">
                                                                    <img src={items.designSamplePhoto} alt="" className="img-responsive img-round" style={{ height: "60px" }} />
                                                                </td>
                                                                <td id="selected-data">{items.designSubmissionDate}</td>
                                                                <td id="selected-data">{items.companyName}</td>
                                                                <td id="selected-data"></td>
                                                                <td id="selected-data">{items.remark}</td>
                                                                <td id="selected-data">True</td>
                                                                <td id="selected-data" className='font-weight-bold'>{items.status}</td>
                                                            </tr>

                                                        })
                                                        :
                                                        ""
                                                }
                                            </tbody>
                                        </table>
                                    </div >
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DesignDetails;