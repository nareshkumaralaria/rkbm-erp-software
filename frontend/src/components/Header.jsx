import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {

    const { updateUserId } = props;
    const [userPrivilege, setUserPrivilege] = useState(localStorage.getItem("userPrivilege") || null);
    const [userName, setUserName] = useState(localStorage.getItem("userName") || null);

    const navigate = useNavigate();

    const handleLogout = () => {
        updateUserId(null);
        localStorage.removeItem("userPrivilege");
        localStorage.removeItem("userName");
        // localStorage.removeItem("userId");
        // updateRegister(false);
        navigate("/");
    }

    useEffect(() => {
        setUserPrivilege(localStorage.getItem("userPrivilege"));
        setUserName(localStorage.getItem("userName"));
    }, [])

    return (
        <>
            {/* <div id="main-wrapper"> */}

            <div className="nav-header">
                <Link to="/" className="brand-logo">

                    <img style={{ width: "30px" }} src={process.env.PUBLIC_URL + "/assets/images/favicon.png"} alt="" />
                    <font className="brand-title" style={{ color: "#333" }}>RK Bhowmick</font>
                </Link>
            </div>

            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">

                            </div>

                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown header-profile">
                                    <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                                        <img src={process.env.PUBLIC_URL + "/assets/images/profile/pic1.jpg"} width="20" alt="" />
                                        <div className="header-info">
                                            <span>Hey, <strong>{userName}</strong></span>
                                            <small>Surat Branch</small>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        {/* <Link to="/" className="dropdown-item ai-icon">
                                                Mumbai Branch
                                            </Link>
                                            <Link to="/" className="dropdown-item ai-icon">
                                                Jaipur Branch
                                            </Link> */}
                                        <Link to="/login" onClick={handleLogout} className="dropdown-item ai-icon">
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger"
                                                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                <polyline points="16 17 21 12 16 7"></polyline>
                                                <line x1="21" y1="12" x2="9" y2="12"></line>
                                            </svg>
                                            <span className="ml-2">Logout</span>
                                        </Link>

                                    </div>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>



            {
                userPrivilege === "user" ?

                    <div className="deznav">
                        <div className="deznav-scroll hideScrollbar" style={{ overflowY: "scroll" }}>
                            <ul className="metismenu" id="menu">

                                <li>
                                    <Link to="/dashboard" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
                                                <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                            </g>
                                        </svg>
                                        <span className="nav-text">Dashboard</span>
                                    </Link>

                                </li>

                                <li>
                                    <a href="#Design" className="ai-icon has-arrow" data-toggle="collapse" aria-expanded="false" aria-controls="Design" >
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M22,15 L22,19 C22,20.1045695 21.1045695,21 20,21 L8,21 C5.790861,21 4,19.209139 4,17 C4,14.790861 5.790861,13 8,13 L20,13 C21.1045695,13 22,13.8954305 22,15 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" fill="#000000" opacity="0.3" />
                                                <path d="M15.5421357,5.69999981 L18.3705628,8.52842693 C19.1516114,9.30947552 19.1516114,10.5758055 18.3705628,11.3568541 L9.88528147,19.8421354 C8.3231843,21.4042326 5.79052439,21.4042326 4.22842722,19.8421354 C2.66633005,18.2800383 2.66633005,15.7473784 4.22842722,14.1852812 L12.7137086,5.69999981 C13.4947572,4.91895123 14.7610871,4.91895123 15.5421357,5.69999981 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" fill="#000000" opacity="0.3" />
                                                <path d="M5,3 L9,3 C10.1045695,3 11,3.8954305 11,5 L11,17 C11,19.209139 9.209139,21 7,21 C4.790861,21 3,19.209139 3,17 L3,5 C3,3.8954305 3.8954305,3 5,3 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" fill="#000000" />
                                            </g>
                                        </svg>
                                        <span className="nav-text">Design</span>
                                    </a>
                                    <ul className="collapse" id="Design">
                                        <li><Link to="/design/designform">Design form</Link></li>
                                        <li><Link to="/design/designstatus">Design status</Link></li>
                                        <li><Link to="/design/designdetails">Design details</Link></li>
                                        <li><Link to="/design/projects">Projects</Link></li>
                                    </ul>
                                </li>


                                <li>
                                    <Link to="/clients/list" >
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3" />
                                                <path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000" />
                                            </g>
                                        </svg>
                                        <span className="nav-text">Clients</span>
                                    </Link>
                                </li>


                                <li>
                                    <a href="#Accounting" className="has-arrow ai-icon" data-toggle="collapse" aria-expanded="false" aria-controls="Accounting" >
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M5.5,4 L9.5,4 C10.3284271,4 11,4.67157288 11,5.5 L11,6.5 C11,7.32842712 10.3284271,8 9.5,8 L5.5,8 C4.67157288,8 4,7.32842712 4,6.5 L4,5.5 C4,4.67157288 4.67157288,4 5.5,4 Z M14.5,16 L18.5,16 C19.3284271,16 20,16.6715729 20,17.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,17.5 C13,16.6715729 13.6715729,16 14.5,16 Z" fill="#000000"></path>
                                                <path d="M5.5,10 L9.5,10 C10.3284271,10 11,10.6715729 11,11.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,12.5 C20,13.3284271 19.3284271,14 18.5,14 L14.5,14 C13.6715729,14 13,13.3284271 13,12.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z" fill="#000000" opacity="0.3"></path>
                                            </g>
                                        </svg>
                                        <span className="nav-text">Accounting</span>
                                    </a>
                                    <ul className="collapse" id='Accounting'>
                                        <li><Link to="/accounting/invoicing">Invoicing</Link></li>
                                        <li><Link to="/accounting/BillsList">Search Bills</Link></li>
                                    </ul>
                                </li>


                                <li>
                                    <Link to="/employees" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                <rect fill="#000000" x="6" y="11" width="9" height="2" rx="1" />
                                                <rect fill="#000000" x="6" y="15" width="5" height="2" rx="1" />
                                            </g>
                                        </svg>
                                        <span className="nav-text">Employees</span>
                                    </Link>
                                </li>


                                <li>
                                    <a href="#Settings" className="has-arrow ai-icon" data-toggle="collapse" aria-expanded="false" aria-controls="Settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M3,4 L20,4 C20.5522847,4 21,4.44771525 21,5 L21,7 C21,7.55228475 20.5522847,8 20,8 L3,8 C2.44771525,8 2,7.55228475 2,7 L2,5 C2,4.44771525 2.44771525,4 3,4 Z M3,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L3,14 C2.44771525,14 2,13.5522847 2,13 L2,11 C2,10.4477153 2.44771525,10 3,10 Z M3,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L3,20 C2.44771525,20 2,19.5522847 2,19 L2,17 C2,16.4477153 2.44771525,16 3,16 Z" fill="#000000" />
                                                <rect fill="#000000" opacity="0.3" x="16" y="10" width="5" height="10" rx="1" />
                                            </g>
                                        </svg>
                                        <span className="nav-text">Settings</span>
                                    </a>
                                    <ul className="collapse" id='Settings'>
                                        <li><Link to="/settings/user">User managment</Link></li>
                                        <li><Link to="/settings/access">Access managment</Link></li>
                                        <li><Link to="/settings/branch">Branch managment</Link></li>
                                        <li><Link to="/settings/config">Configuration</Link></li>

                                    </ul>
                                </li>

                                <li>
                                    <a href="#Reports" className="has-arrow ai-icon" data-toggle="collapse" aria-expanded="false" aria-controls="Reports">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"></rect>
                                                <path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#000000" opacity="0.3"></path>
                                                <path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#000000"></path>
                                            </g>
                                        </svg>
                                        <span className="nav-text">Reports</span>
                                    </a>
                                    <ul className="collapse" id='Reports'>
                                        <li><Link to="/reports/customerreport">Clients Report</Link></li>
                                        {/* <li><Link to="/reports/employeereport">Employee Reports</Link></li> */}
                                    </ul>
                                </li>


                            </ul>
                        </div>


                    </div>
                    :
                    <div className="deznav">
                        <div className="deznav-scroll hideScrollbar" style={{ overflowY: "scroll" }}>
                            <ul className="metismenu" id="menu">
                                <li>
                                    <a href="#Design" className="has-arrow ai-icon" data-toggle="collapse" aria-expanded="false" aria-controls="Design">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M22,15 L22,19 C22,20.1045695 21.1045695,21 20,21 L8,21 C5.790861,21 4,19.209139 4,17 C4,14.790861 5.790861,13 8,13 L20,13 C21.1045695,13 22,13.8954305 22,15 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" fill="#000000" opacity="0.3" />
                                                <path d="M15.5421357,5.69999981 L18.3705628,8.52842693 C19.1516114,9.30947552 19.1516114,10.5758055 18.3705628,11.3568541 L9.88528147,19.8421354 C8.3231843,21.4042326 5.79052439,21.4042326 4.22842722,19.8421354 C2.66633005,18.2800383 2.66633005,15.7473784 4.22842722,14.1852812 L12.7137086,5.69999981 C13.4947572,4.91895123 14.7610871,4.91895123 15.5421357,5.69999981 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" fill="#000000" opacity="0.3" />
                                                <path d="M5,3 L9,3 C10.1045695,3 11,3.8954305 11,5 L11,17 C11,19.209139 9.209139,21 7,21 C4.790861,21 3,19.209139 3,17 L3,5 C3,3.8954305 3.8954305,3 5,3 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" fill="#000000" />
                                            </g>
                                        </svg>
                                        <span className="nav-text">Designs</span>
                                    </a>
                                    <ul className="collapse" id='Design'>
                                        <li><Link to="/design/designstatus">Design status</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
            }
            {/* </div> */}

        </>
    )
}

export default Header;