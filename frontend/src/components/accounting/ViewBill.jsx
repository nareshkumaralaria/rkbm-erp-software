import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import $ from 'jquery'
window.$ = $;
toast.configure();


const ViewBill = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const { state } = useLocation();
    // console.log("state: ", state);

    const componentRef = useRef();

    const [billDetails, setBillDetails] = useState(state);
    const [loading, setLoading] = useState(false);

    // console.log("billDetails :", billDetails);

    const handleUpdateBillDate = async () => {
        setLoading(true);
        try {
            await axios.post(`${base_url}/updateBillDate`, { billDetails }).then((res) => {
                const result = res.data;
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
                setLoading(false);
                state.invoiceDate = billDetails.invoiceDate;
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
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0 mb-0">
                        <div className="col-sm-6 p-md-0 align-self-center">
                            <div className="welcome-text">
                                <h4>Print Bill</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div>
                                <span id="responce"></span>
                            </div>
                            <div className="d-flex">
                                <ReactToPrint
                                    trigger={() => (
                                        <button className="btn btn-primary">Generate PDF!</button>
                                    )}
                                    content={() => componentRef.current}
                                    bodyClass="ReactToPrint"
                                />
                            </div>
                            <div className="d-flex ml-2">
                                <button onClick={handleUpdateBillDate} className="btn btn-info">{loading ? "Updating..." : "Update Date"}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <BillLayout billdata={state} componentRef={componentRef} setBillDetails={setBillDetails} billDetails={billDetails} />

        </>
    )
}

export default ViewBill;


// Bill Layout
const BillLayout = ({ billdata, componentRef, setBillDetails, billDetails }) => {

    const handleInvoiceDate = (e) => {
        const { name, value } = e.target;
        setBillDetails({ ...billDetails, [name]: value });
    }


    return (
        <>
            <div className="content-body pt-1" ref={componentRef}>
                <div className="container-fluid">
                    <div className="row">
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
                                            <p className="mb-0">{billdata.invoiceNumber}</p>
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
                                            <p className="mb-0">{billdata.companyName}</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">Address: </p>
                                        </div>
                                        <div className="col-10 py-1 border">
                                            <p className="mb-0">{billdata.companyAddress}</p>
                                        </div>

                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">GSTIN: </p>
                                        </div>
                                        <div className="col-10 py-1 border">
                                            <p className="mb-0">{billdata.gstNumber}</p>
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
                                            <p className="mb-0">{billdata.billValues.quantity}</p>
                                        </div>
                                        <div className="col-5 py-1 border">
                                            <p className="mb-0">{billdata.billValues.taxableValue}</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billdata.billValues.cgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billdata.billValues.sgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billdata.billValues.total}</p>
                                        </div>

                                        <div className="col-1 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">Total</p>
                                        </div>
                                        <div className="col-5 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billdata.billValues.taxableValue}</p>
                                        </div>
                                        <div className="col-2 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billdata.billValues.cgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billdata.billValues.sgst}</p>
                                        </div>
                                        <div className="col-2 py-1 border" style={{ background: "#f9f9f9" }}>
                                            <p className="mb-0">{billdata.billValues.total}</p>
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
                                            <p className="mb-0">{billdata.billValues.taxableValue}</p>
                                        </div>

                                        <div className="col-6 py-1">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Add: CGST:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billdata.billValues.cgst}</p>
                                        </div>

                                        <div className="col-6 py-1">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Add: SGST:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billdata.billValues.sgst}</p>
                                        </div>

                                        <div className="col-6 py-1">
                                            <p className="mb-0"></p>
                                        </div>
                                        <div className="col-4 py-1 border">
                                            <p className="mb-0">Total Tax Amount:</p>
                                        </div>
                                        <div className="col-2 py-1 border">
                                            <p className="mb-0">{billdata.billValues.cgst + billdata.billValues.sgst}</p>
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
                                            <p className="mb-0">{billdata.billValues.total}</p>
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