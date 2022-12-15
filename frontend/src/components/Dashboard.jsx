import React, { useEffect } from 'react'
import $ from 'jquery'
window.$ = $

const Dashboard = () => {

    useEffect(() => {
        $(document).ready(function () {
            $('#example5').DataTable();
        });
    }, [])



    return (
        <>
            <div className="content-body" style={{ height: "100vh" }}>
                <div className="container-fluid h-100" style={{ position: "relative" }}>
                    <div className="wrapper" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <h1 className="mb-0 fw-bold" style={{ fontSize: "50px", lineHeight: "1" }}>coming soon<span className="dot" style={{ color: "#4febfe" }}>.</span></h1>
                        <p className="text-center" style={{ marginTop: "18px" }}>Dashboard</p>
                    </div>
                </div>
            </div>
            {/* <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-9 col-xxl-12">
                            <div className="row">
                                <div className="col-xl-3 col-lg-3">
                                    <div className="card overflow-hidden">
                                        <div className="card-body px-4 py-4">
                                            <h5 className="mb-3">500 / <small className="text-primary">Total Design</small></h5>
                                            <div className="chart-point">
                                                <div className="check-point-area">
                                                    <canvas id="ShareProfit12"></canvas>
                                                </div>
                                                <ul className="chart-point-list">
                                                    <li><i className="fa fa-circle text-primary mr-1"></i> 250 Approved</li>
                                                    <li><i className="fa fa-circle text-success mr-1"></i> 125 Pending </li>
                                                    <li><i className="fa fa-circle text-success mr-1"></i> 125 Rejected </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                                    <div className="card bg-success	overflow-hidden">
                                        <div className="card-body pb-0 px-4 pt-4">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="text-white mb-1">Rs.14000</h5>
                                                    <span className="text-white">Total Profit Today</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chart-wrapper" style={{width: "100%"}}>
                                            <span className="peity-line" data-width="100%">6,2,8,4,3,8,4,3,6,5,9,2</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                                    <div className="card bg-primary overflow-hidden">
                                        <div className="card-body pb-0 px-4 pt-4">
                                            <div className="row">
                                                <div className="col text-white">
                                                    <h5 className="text-white mb-1">570</h5>
                                                    <span>Pending Approval</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chart-wrapper px-2">
                                            <canvas id="chart_widget_2" height="100"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-xxl-3 col-lg-6 col-sm-6">
                                    <div className="card overflow-hidden">
                                        <div className="card-body px-4 py-4">
                                            <h5 className="mb-3">500 / <small className="text-primary">Total Employee</small></h5>
                                            <div className="chart-point">
                                                <div className="check-point-area">
                                                    <canvas id="ShareProfit2"></canvas>
                                                </div>
                                                <ul className="chart-point-list">
                                                    <li><i className="fa fa-circle text-primary mr-1"></i> 60% Working</li>
                                                    <li><i className="fa fa-circle text-success mr-1"></i> 40% Free</li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-xxl-4 col-lg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-header border-0 pb-0">
                                            <h4 className="card-title">Recent Activies</h4>
                                        </div>
                                        <div className="card-body">
                                            <div id="DZ_W_TimeLine1" className="widget-timeline dz-scroll style-1" style={{height: "250px"}}>
                                                <ul className="timeline">
                                                    <li>
                                                        <div className="timeline-badge primary"></div>
                                                        <a className="timeline-panel text-muted" href="#">
                                                            <span>10 minutes ago</span>
                                                            <h6 className="mb-0">Design Assinged to <strong className="text-primary">Vinod</strong>.</h6>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div className="timeline-badge info">
                                                        </div>
                                                        <a className="timeline-panel text-muted" href="#">
                                                            <span>20 minutes ago</span>
                                                            <h6 className="mb-0">Design Approved <strong className="text-info">#XF-2356.</strong></h6>
                                                            <p className="mb-0">SK enterprises approved design</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div className="timeline-badge danger">
                                                        </div>
                                                        <a className="timeline-panel text-muted" href="#">
                                                            <span>3 hours ago</span>
                                                            <h6 className="mb-0">Mahesh submited new design <strong className="text-warning">for review</strong></h6>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-xxl-8 col-lg-12 col-md-12">
                                    <div className="card">
                                        <div className="card-header border-0 pb-0">
                                            <h4 className="card-title">Pending Payments Queue</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-responsive-sm mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{width: "20px"}}>
                                                                <div className="custom-control custom-checkbox checkbox-primary check-lg mr-3">
                                                                    <input type="checkbox" className="custom-control-input" id="checkAll" required="" />
                                                                        <label className="custom-control-label" htmlFor="checkAll"></label>
                                                                </div>
                                                            </th>
                                                            <th><strong>Amount</strong></th>
                                                            <th><strong>NAME</strong></th>
                                                            <th><strong>DATE</strong></th>
                                                            <th><strong>STATUS</strong></th>
                                                            <th style={{width: "85px"}}><strong>EDIT</strong></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="custom-control custom-checkbox check-lg mr-3">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheckBox2" required="" />
                                                                        <label className="custom-control-label" htmlFor="customCheckBox2"></label>
                                                                </div>
                                                            </td>
                                                            <td><b>Rs.542</b></td>
                                                            <td>Client Name</td>
                                                            <td>01 August 2020</td>
                                                            <td className="recent-stats d-flex align-items-center"><i className="fa fa-circle text-success mr-1"></i>Successful
                                                            </td>
                                                            <td>
                                                                <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="custom-control custom-checkbox check-lg mr-3">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheckBox3" required="" />
                                                                        <label className="custom-control-label" htmlFor="customCheckBox3"></label>
                                                                </div>
                                                            </td>
                                                            <td><b>Rs.2000</b></td>
                                                            <td>Client Name</td>
                                                            <td>01 August 2020</td>
                                                            <td className="recent-stats d-flex align-items-center"><i className="fa fa-circle text-danger mr-1"></i>Canceled</td>
                                                            <td>
                                                                <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="custom-control custom-checkbox check-lg mr-3">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheckBox4" required="" />
                                                                        <label className="custom-control-label" htmlFor="customCheckBox4"></label>
                                                                </div>
                                                            </td>
                                                            <td><b>Rs.300</b></td>
                                                            <td>Client Name</td>
                                                            <td>01 August 2020</td>
                                                            <td className="recent-stats d-flex align-items-center"><i className="fa fa-circle text-warning mr-1"></i>Pending</td>
                                                            <td>
                                                                <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div className="custom-control custom-checkbox check-lg mr-3">
                                                                    <input type="checkbox" className="custom-control-input" id="customCheckBox5" required="" />
                                                                        <label className="custom-control-label" htmlFor="customCheckBox5"></label>
                                                                </div>
                                                            </td>
                                                            <td><b>Rs.2000</b></td>
                                                            <td>Client Name</td>
                                                            <td>01 August 2020</td>
                                                            <td className="recent-stats d-flex align-items-center"><i className="fa fa-circle text-danger mr-1"></i>Canceled</td>
                                                            <td>
                                                                <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-xxl-12 col-lg-12 col-md-12">
                            <div id="user-activity" className="card">
                                <div className="card-header border-0 pb-0 d-sm-flex d-block">
                                    <div>
                                        <h4 className="card-title">Sales History 2022</h4>
                                        <p className="mb-1">All Design work sales</p>
                                    </div>
                                    <div className="card-action">
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#user" role="tab">
                                                    Day
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#bounce" role="tab">
                                                    Month
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#session-duration" role="tab">
                                                    Year
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="user" role="tabpanel">
                                            <canvas id="activity" className="chartjs"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Dashboard;