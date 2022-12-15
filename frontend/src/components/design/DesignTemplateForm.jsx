import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

const DesignTemplateForm = (props) => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const { templateNo } = props;

    const initialFormValues = {
        startDate: "",
        mainType: "",
        subType: "",
        noOfDesign: "",
        designsEndDate: [],
        priority: "",
    }

    const [designFormValues, setDesignFormValues] = useState(initialFormValues);
    const [mainTypeList, setMainTypeList] = useState([]);

    const handleDesignFormValues = (e) => {
        const { name, value } = e.target;
        setDesignFormValues({ ...designFormValues, [name]: value });
    }

    const handleDesignsEndDate = (e) => {
        let x = { ...designFormValues };
        const { name, value } = e.target;
        x.designsEndDate[name] = value;
        setDesignFormValues(x);
    }
    let noOfdates = _.range(1, parseInt(designFormValues.noOfDesign) + 1);

    const displayEndDates = () => {

        designFormValues.designsEndDate.splice(designFormValues.noOfDesign, designFormValues.designsEndDate.length - designFormValues.noOfDesign)
        setDesignFormValues({
            ...designFormValues,
        })
    }

    // console.log("noOfDates", noOfdates);

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

    useEffect(() => {
        getConfigurationData();
    }, [])

    useEffect(() => {
        localStorage.setItem(`DesignTemplateData${templateNo}`, JSON.stringify(designFormValues));
        return () => {
            localStorage.removeItem(`DesignTemplateData${templateNo}`);
        }
    }, [designFormValues]);

    // console.log("formvalues", designFormValues);

    return (
        <>
            <span className="badge bg-info mb-1 mt-3 text-white ">Design {templateNo}</span>
            {/* <button type="button" className="btn btn-danger shadow btn-xs sharp" style={{ float: "right" }} >
                <i className="fa fa-trash" ></i>
            </button> */}


            <div className="row">
                <div className="col-md-6">
                    <p className="text-start mb-0 fw-bold " style={{ fontSize: "14px", color: "#333", fontWeight: "600" }}  >Start Date</p>
                    <input className="form-control form-white" value={designFormValues.startDate} onChange={handleDesignFormValues} type="date" name="startDate" />
                    <span className="text-danger d-inline-block mb-2" style={{ fontSize: "12px", marginLeft: "2px" }} ></span>
                </div>

                <div className="col-md-6">
                    <p className="text-start mb-0 fw-bold " style={{ fontSize: "14px", color: "#333", fontWeight: "600", visibility: "hidden" }}  >Main Type</p>
                    <select className="form-control form-white" value={designFormValues.mainType} onChange={handleDesignFormValues} data-placeholder="Choose a color..." name="mainType">
                        <option value="">--Select Main Type---</option>
                        {
                            mainTypeList.length > 0 ?
                                mainTypeList.map((curEle, index) => {
                                    return <option key={index} value={curEle.mainType}>{curEle.mainType}</option>
                                })
                                : ""
                        }
                    </select>
                    <span className="text-danger d-inline-block mb-2" style={{ fontSize: "12px", marginLeft: "2px" }} ></span>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <select className="form-control form-white" value={designFormValues.subType} onChange={handleDesignFormValues} data-placeholder="Choose a subtype..." name="subType">
                        <option value="">--Select Sub Type---</option>
                        {
                            mainTypeList.length > 0 ?
                                mainTypeList.filter((item) => {
                                    return item.mainType === designFormValues.mainType
                                }).map((curEle) => {
                                    return curEle.subType.map((ele, i) => {
                                        return <option key={ele} value={ele}>{ele}</option>
                                    })
                                })
                                : ""
                        }
                    </select>
                    <span className="text-danger d-inline-block mb-2" style={{ fontSize: "12px", marginLeft: "2px" }} ></span>
                </div>
                <div className="col-md-6">
                    <select className="form-control form-white" value={designFormValues.priority} onChange={handleDesignFormValues} data-placeholder="Choose a priority..." name="priority">
                        <option value="">--Select priority---</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                    <span className="text-danger d-inline-block mb-2" style={{ fontSize: "12px", marginLeft: "2px" }} ></span>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <input className="form-control form-white" autoComplete="off" defaultValue={designFormValues.noOfDesign} data-toggle="modal" data-target={`#add-date${templateNo}`} placeholder='No of design' type="text" name="noOfDesign" />
                    {
                        designFormValues.designsEndDate.map((date, index) => {
                            return <span key={date + index} className="text-white p-2 rounded mt-4 mr-2 d-inline-block mb-0 bg-secondary" style={{ fontSize: "12px", marginLeft: "2px" }} >{date}</span>
                        })
                    }
                    <span className="text-danger d-inline-block mb-2" style={{ fontSize: "12px", marginLeft: "2px" }} ></span>
                </div>
            </div>



            {/* <!-- Modal Add date --> */}
            <div className="modal fade none-border" id={`add-date${templateNo}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>Add No of Design</strong></h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <input className="form-control form-white" value={designFormValues.noOfDesign} onChange={handleDesignFormValues} placeholder='No of design' type="text" name="noOfDesign" />
                                    <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} ></span>
                                </div>
                            </div>

                            <div className="row">
                                {
                                    noOfdates.map((item, index) => {
                                        return <div key={item + "1" + index} className="col-md-6">
                                            <p className="text-start mb-0 fw-bold " style={{ fontSize: "14px", color: "#333", fontWeight: "600" }} >End Date {item}</p>
                                            <input className="form-control form-white" value={designFormValues.designsEndDate.item} onChange={handleDesignsEndDate} placeholder="date" type="date" name={item - 1} />
                                            <span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} ></span>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                <button type="button" onClick={displayEndDates} className="btn btn-danger waves-effect waves-light save-category" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesignTemplateForm;