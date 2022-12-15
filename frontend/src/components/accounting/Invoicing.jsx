import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactToPrint from 'react-to-print';
import '../component.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


const Invoicing = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const initialFormValues = {
        companyName: "",
        startDate: "",
        endDate: "",
    }

    const initialbBillValues = {
        quantity: 0,
        taxableValue: 0,
        cgst: 0,
        sgst: 0,
        total: 0,
    }

    const initialBillDetails = {
        startDate: "",
        endDate: "",
        invoiceNumber: 0,
        invoiceDate: "",
        companyName: "",
        companyAddress: "",
        gstNumber: "",
        billValues: {},
        paymentType: "",
        gstType: "",
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [generateBillErrors, setGenerateBillErrors] = useState({});
    const [billValues, setBillValues] = useState(initialbBillValues);
    const [designData, setDesignData] = useState([]);
    const [loading, setLoading] = useState({ search: false, generate: false });
    const [customerList, setCustomerList] = useState([]);
    const [billCount, setBillCount] = useState(0);
    const componentRef = useRef();
    const [billDetails, setBillDetails] = useState(initialBillDetails);


    const handleFormValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleBillFormValues = (e) => {
        const { name, value } = e.target;
        setBillDetails({ ...billDetails, [name]: value });
    }

    // console.log(formValues);

    const handleCustomerReportSearch = (e) => {
        e.preventDefault();
        const isValid = validate(formValues);
        if (isValid) {
            searchCustomerReport();
        }
    }

    const handleGenerateBill = (e) => {
        e.preventDefault();
        const isValid = validateBillDetails(billDetails);
        if (isValid) {
            generateBill();
        }
    }

    const searchCustomerReport = async () => {
        getBillsCount();
        setLoading({ ...loading, search: true });
        setBillDetails({
            ...billDetails,
            companyName: formValues.companyName,
            startDate: formValues.startDate,
            endDate: formValues.endDate,
        })
        try {
            await axios.post(`${base_url}/searchCustomerReport`, { formValues })
                .then((res) => {
                    setLoading({ ...loading, search: false });
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

    const generateBill = async () => {
        setLoading({ ...loading, generate: true });
        try {
            await axios.post(`${base_url}/addBill`, { billDetails })
                .then((res) => {
                    setLoading({ ...loading, generate: false });
                    const result = res.data.message;

                    toast.success(result, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        pauseOnFocusLoss: false,
                        draggable: true,
                        progress: undefined,
                    });

                    // setBillDetails(initialBillDetails);
                    // setFormValues(initialFormValues);
                    // setDesignData([]);
                    // setBillValues(initialbBillValues);

                });
        } catch (error) {
            setLoading({ ...loading, generate: false });
            toast.error("SERVER ERROR!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
            });
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

    const getBillsCount = async () => {
        try {
            await axios.get(`${base_url}/getBillsCount`).then((res) => {
                const result = res.data;
                // console.log("bill count: ", result);
                setBillDetails({ ...billDetails, invoiceNumber: result.billsCount + 1 });
                setBillCount(result.billsCount);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCustomerData();
        getBillsCount();
    }, []);

    useEffect(() => {
        let tempTotal = 0;
        let count = designData.length;
        designData.map((items, index) => {
            tempTotal = tempTotal + items.perAmount;
        });
        let tempGst = (tempTotal * 18) / 100;
        setBillValues({
            ...billValues,
            taxableValue: tempTotal,
            cgst: tempGst / 2,
            sgst: tempGst / 2,
            total: tempTotal + tempGst,
            quantity: count,
        })

        customerList.map((customer, index) => {
            customer.companyName === formValues.companyName &&
                setBillDetails({
                    ...billDetails,
                    companyAddress: `${customer.address}, ${customer.city}, ${customer.state} (${customer.country})`,
                    gstNumber: customer.gstNumber,
                    companyName: formValues.companyName,
                    startDate: formValues.startDate,
                    endDate: formValues.endDate,
                })
        })

    }, [designData])

    useEffect(() => {
        setBillDetails({
            ...billDetails,
            billValues: billValues,
        })
    }, [billValues])

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

    const validateBillDetails = (values) => {
        const errors = {};
        let isValid = true;

        if (!values.paymentType) {
            errors.paymentType = "field is required";
            isValid = false;
        }
        if (!values.gstType) {
            errors.gstType = "field is required";
            isValid = false;
        }

        setGenerateBillErrors(errors);
        return isValid;

    }

    // console.log("customerList: ", customerList);
    // console.log("billValues: ", billValues);
    // console.log("billDetails: ", billDetails);



    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Customer Report Search (BILL GENERATE)</h4>
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
                                                {loading.search ? "Loading..." : "Submit"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleGenerateBill}>
                                        <div className="row">

                                            <div className="col-md-6">
                                                <label htmlFor="paymentType" className="form-label mb-0">Payment Type</label>
                                                <select className="form-control form-white" onChange={handleBillFormValues} value={billDetails.paymentType} name="paymentType">
                                                    <option value="">-- Select --</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Unpaid">Unpaid</option>
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{generateBillErrors.paymentType}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="gstType" className="form-label mb-0">GST Type</label>
                                                <select className="form-control form-white" onChange={handleBillFormValues} value={billDetails.gstType} name="gstType">
                                                    <option value="">-- Select --</option>
                                                    <option value="GST">GST</option>
                                                </select>
                                                <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{generateBillErrors.gstType}</span>
                                            </div>

                                        </div>

                                        <hr />

                                        <div className="col-md-12 d-flex justify-content-center">
                                            <button className="btn btn-primary" type="submit" >
                                                {loading.generate ? "Loading..." : "Bill Generate"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <BillLayout customerList={customerList} componentRef={componentRef} formValues={formValues} billValues={billValues} billCount={billCount} billDetails={billDetails} setBillDetails={setBillDetails} />

            <ReactToPrint
                trigger={() => (
                    <div className="content-body" style={{ paddingTop: "0rem", paddingBottom: "2rem" }}>
                        <div className="container-fluid">
                            <div className="col-12 text-center">
                                <button className="btn btn-primary">Generate PDF!</button>
                            </div>
                        </div>
                    </div>
                )}
                content={() => componentRef.current}
                bodyClass="ReactToPrint"
            />
        </>
    )
}

export default Invoicing;

// Bill Layout
const BillLayout = ({ customerList, componentRef, formValues, billValues, billCount, billDetails, setBillDetails }) => {

    const handleInvoiceDate = (e) => {
        const { name, value } = e.target;
        setBillDetails({ ...billDetails, [name]: value });
    }


    return (
        <>
            <div className="content-body" style={{ paddingTop: "1rem" }} ref={componentRef}>
                <div className="container-fluid">
                    <div style={{ marginTop: "-20px" }} className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row border">

                                        <div className="col-12 text-center py-3 border" style={{ background: "#95b4d4" }}>
                                            <p className="mb-0 text-white" style={{ fontSize: "1.6rem" }}>RKBHOWMICK</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Address: </p>
                                        </div>
                                        <div className="col-8 py-1 border">
                                            <p className="mb-0">PLOT NO.- 419/4 FIRST FLOOR,PRASAD CINEMA CHAR RASTA,OPP- CROSS TO KOTAK MAHINDRA BANK,GATE NO.1,ROAD NO-4,SACHIN GIDC SURAT.</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Original</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">GSTIN: </p>
                                        </div>
                                        <div className="col-8 py-1 border">
                                            <p className="mb-0">24ADGPU2710E1ZW</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Duplicate</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">HSN: </p>
                                        </div>
                                        <div className="col-1 py-10 border">
                                            <p className="mb-0">998391</p>
                                        </div>

                                        <div className="col-12 py-2 text-center py-1 border" style={{ background: "#95b4d4" }}>
                                            <p className="mb-0 text-white" style={{ fontSize: "01rem" }}>TAX invoice</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">invoice no: </p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">{billCount + 1}</p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Place of supply:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Gujarat</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">invoice date: </p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <input type="date" name="invoiceDate" onChange={handleInvoiceDate} value={billDetails.invoiceDate} />
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">state code: </p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">24</p>
                                        </div>

                                        <div className="col-6 py-1 border">
                                            <p className="mb-0">REVERCE CHARGE(y/n) </p>
                                        </div>
                                        <div className="col-6 py-1 border">
                                            <p className="mb-0">NO </p>
                                        </div>

                                        <div className="col-12 py-2 text-center py-1 border" style={{ background: "#95b4d4" }}>
                                            <p className="mb-0 text-white" style={{ fontSize: "01rem" }}>BIll To Party</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Company: </p>
                                        </div>
                                        <div className="col-10 py-1 border">
                                            <p className="mb-0">
                                                {
                                                    customerList.map((customer, index) => {
                                                        return customer.companyName === formValues.companyName && formValues.companyName
                                                    })
                                                }
                                            </p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Address: </p>
                                        </div>
                                        <div className="col-10 py-1 border">
                                            <p className="mb-0">
                                                {
                                                    customerList.map((customer, index) => {
                                                        return customer.companyName === formValues.companyName && (`${customer.address}, ${customer.city}, ${customer.state} (${customer.country})`)
                                                    })
                                                }
                                            </p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">GSTIN: </p>
                                        </div>
                                        <div className="col-10 py-1 border">
                                            <p className="mb-0">
                                                {
                                                    customerList.map((customer, index) => {
                                                        return customer.companyName === formValues.companyName && customer.gstNumber
                                                    })
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row border mt-3">

                                        <div className="col-1 py-1 border">
                                            <p className="mb-0">Qty</p>
                                        </div>
                                        <div className="col-5 py-1 border">
                                            <p className="mb-0">Taxable Value</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">CGST</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">SGST</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Total</p>
                                        </div>

                                        <div className="col-1 py-1 border">
                                            <p className="mb-0">{billValues.quantity}</p>
                                        </div>
                                        <div className="col-5 py-1 border">
                                            <p className="mb-0">{billValues.taxableValue}</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.cgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.sgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.total}</p>
                                        </div>

                                        <div className="col-1 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">Total</p>
                                        </div>
                                        <div className="col-5 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billValues.taxableValue}</p>
                                        </div>
                                        <div className="col-2 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billValues.cgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billValues.sgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billValues.total}</p>
                                        </div>
                                    </div>

                                    <div className="row border mt-3">
                                        <div className="col-6 py-1 border">
                                            <p className="mb-0">Total invoice Amount in word</p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Total Amount Before Tax</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.taxableValue}</p>
                                        </div>

                                        <div className="col-6 py-1">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Add: CGST:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.cgst}</p>
                                        </div>

                                        <div className="col-6 py-1">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Add: SGST:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.sgst}</p>
                                        </div>

                                        <div className="col-6 py-1">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Total Tax Amount:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.cgst + billValues.sgst}</p>
                                        </div>

                                        <div className="col-6 py-1 border">
                                            <p className="mb-0">Make Payment in favour of "R. K. BHOWMICK"</p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Round Off</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">0.00</p>
                                        </div>

                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">Bank Details:</p>
                                        </div>
                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">ICICI BANK</p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Total Amount after Tax:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billValues.total}</p>
                                        </div>

                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">Branch:</p>
                                        </div>
                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">PUNA KUMBHARIA BRANCH</p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">GST on Reverse Charge</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">0</p>
                                        </div>

                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">Bank A/C:</p>
                                        </div>
                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">138905502180</p>
                                        </div>
                                        <div className="col-6 py-1">
                                            <p className="mb-0">Ceritified that the particulars given above are true and correct</p>
                                        </div>

                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">Bank IFSC:</p>
                                        </div>
                                        <div className="col-3 py-1 border">
                                            <p className="mb-0">ICIC0001389</p>
                                        </div>
                                    </div>

                                    <div className="row border">
                                        <div className="col-6 py-1 ">
                                            <p className="mb-0">Terms & conditions</p>
                                        </div>
                                        <div className="col-6 py-1 border">
                                            <p className="mb-0">For R. K. BHOWMICK</p>
                                        </div>
                                        <div className="col-6 py-1 border">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-6 py-1 border">
                                            <p className="mb-0">Authorised signatory</p>
                                            <img src={process.env.PUBLIC_URL + "/assets/images/signature-fake.png"} style={{ width: "140px" }} alt="" className="show-signature" />
                                        </div>
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