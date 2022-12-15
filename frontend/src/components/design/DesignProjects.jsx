import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { Link } from 'react-router-dom';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import $ from 'jquery'
window.$ = $

toast.configure()

const DesignProjects = () => {

    // const base_url = "http://localhost:9002";
    // const base_url = "https://rkbm.herokuapp.com";
    const base_url = "https://rkmb-backend.vercel.app";

    const [designProjectList, setDesignProjectList] = useState([]);
    const [switchView, setSwitchView] = useState(true);

    const getDesignData = async () => {
        try {
            await axios.get(`${base_url}/getDesignData`)
                .then(res => {
                    const result = res.data;
                    setDesignProjectList(result);
                })
        } catch (error) {
            console.log(error);
        }
    }

    let event1 = [];
    if (designProjectList.length > 0) {
        for (let i = 0; i < designProjectList.length; i++) {
            for (let j = 0; j < designProjectList[i].templateNo.length; j++) {
                event1[i] = {
                    title: designProjectList[i].companyName + " : " + designProjectList[i].templateNo[j].mainType + " (" + designProjectList[i].templateNo[j].subType + ")",
                    start: designProjectList[i].templateNo[j].startDate,
                }
            }
        }
    }
    let event2 = [];
    if (designProjectList.length > 0) {
        for (let i = 0; i < designProjectList.length; i++) {
            for (let j = 0; j < designProjectList[i].templateNo.length; j++) {
                event2[i] = {
                    title: designProjectList[i].companyName + " : " + designProjectList[i].templateNo[j].mainType + " (" + designProjectList[i].templateNo[j].subType + ")",
                    start: designProjectList[i].templateNo[j].designsEndDate[designProjectList[i].templateNo[j].designsEndDate.length - 1],
                    color: "#f25767"
                }
            }
        }
    }

    const events = [...event1, ...event2];
    // console.log("events", events);
    const handleDeleteDesignProject = async (id) => {
        try {
            await axios.post(`${base_url}/designProject/delete`, { id })
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
                    getDesignData();
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDesignData();
        $(document).ready(function () {
            $('#DesignTable').DataTable();
        });
    }, [switchView])

    const handleDateClick = () => {
        alert('click')
    }

    // console.log("designProjectList", designProjectList);

    return (
        <>

            <div className="content-body">
                <div className="container-fluid">

                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0 d-flex align-items-center">
                            <div className="welcome-text">
                                <h4>Design Projects</h4>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
                            <div><span id="responce"></span></div>
                            <div className="d-flex">
                                <a href="#"
                                    // onClick={() => exportToExcel("Clients.csv")} 
                                    className="btn btn-rounded btn-primary mr-1">
                                    <i className="fa fa-download"></i> &nbsp;&nbsp;Export Excel
                                </a>
                                <a href="#"
                                    //  onClick={importFromExcel}
                                    className="btn btn-rounded btn-danger mr-1">
                                    <i className="fa fa-upload"></i>&nbsp;&nbsp;Import Excel
                                </a>
                                <Link to="/design/projects/addNewDesignProject" className="btn btn-rounded btn-success mr-1">
                                    <i className="fa fa-plus"></i>&nbsp; Add Design Project
                                </Link>
                                <a href='#' onClick={() => { setSwitchView(!switchView) }} className="btn btn-rounded btn-info mr-1">
                                    <i className="fa fa-refresh"></i>&nbsp; Switch View
                                </a>
                            </div>
                        </div>
                    </div>


                    {switchView ?
                        <div style={{ marginTop: "-20px" }} className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive" id="excel_data">
                                            <table id="DesignTable" className="display" style={{ minWidth: "845px" }}>
                                                <thead>
                                                    <tr>
                                                        <th id="select">S.No</th>
                                                        <th id="select" data-orderable="false">Company Name</th>
                                                        <th id="select" data-orderable="false">Inital Name</th>
                                                        <th id="select" data-orderable="false">Start Date</th>
                                                        <th id="select" data-orderable="false">Main</th>
                                                        <th id="select" data-orderable="false">Sub</th>
                                                        <th id="select" data-orderable="false">Design No</th>
                                                        <th id="select" data-orderable="false">Priority</th>
                                                        <th id="select" data-orderable="false">End date</th>
                                                        <th data-orderable="false">Status</th>
                                                        <th data-orderable="false">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        designProjectList.length > 0 ?
                                                            designProjectList.map((items, index) => {
                                                                return <tr key={index} >
                                                                    <td id="selected-data">{index + 1}</td>
                                                                    <td id="selected-data">{items.companyName}</td>
                                                                    <td id="selected-data">{items.initalName}</td>
                                                                    <td id="selected-data">
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} >{design.startDate}</div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td id="selected-data">
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} >{design.mainType}</div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td id="selected-data">
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} >{design.subType !== "" ? design.subType : "-"}</div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td id="selected-data">
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} >{design.noOfDesign}</div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td id="selected-data">
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} >{design.priority}</div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td id="selected-data">
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} >{design.designsEndDate[design.designsEndDate.length - 1]}</div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            items.templateNo.map((design, idx) => {
                                                                                return <div key={idx} ><b className='text-warning' >Pending</b></div>
                                                                            })
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <a href="/" data-toggle="modal" data-target="#update-category" className="btn btn-primary shadow btn-xs sharp mr-1">
                                                                                <i className="fa fa-pencil"></i>
                                                                            </a>
                                                                            <a href="#" onClick={() => handleDeleteDesignProject(items._id)} className="btn btn-danger shadow btn-xs sharp mr-1">
                                                                                <i className="fa fa-trash"></i>
                                                                            </a>
                                                                            <a href="/" data-toggle="modal" data-target="#view-category" className="btn btn-success shadow btn-xs sharp">
                                                                                <i className="fa fa-eye"></i>
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
                        :
                        <div className="card">
                            <div className="card-body">
                                <FullCalendar
                                    headerToolbar={{
                                        start: 'today',
                                        center: 'title',
                                        end: 'prev,next'
                                    }}
                                    initialView="dayGridMonth"
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    events={events}
                                    dateClick={handleDateClick}
                                />
                            </div>
                        </div>

                    }

                </div>
            </div>
        </>

    )
}

export default DesignProjects;

