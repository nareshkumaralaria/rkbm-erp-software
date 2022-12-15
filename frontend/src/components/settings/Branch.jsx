import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../component.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { getBranchList, addBranch, deleteBranch } from "../../redux/actions/branchAction.js";
import $ from 'jquery'
window.$ = $
toast.configure()

const Branch = () => {

	// const base_url = "http://localhost:9002";
	// const base_url = "https://rkbm.herokuapp.com";
	const base_url = "https://rkmb-backend.vercel.app";

	const dispatch = useDispatch();

	const branchListState = useSelector(state => state.getBranchListReducer);

	// console.log("branchListState: ", branchListState);

	const initialFormValues = {
		branchName: "",
		email: "",
		phoneNumber: "",
		gstNumber: "",
		address: "",
		city: "",
		state: "",
		date: "",
		branchId: ""
	}

	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState({});
	const [customerList, setCustomerList] = useState([]);
	const [update, setUpdate] = useState(initialFormValues);

	const handleFormValues = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	}

	const handleUpdateValue = (e) => {
		const { name, value } = e.target;
		setUpdate({ ...update, [name]: value });
	}

	const handleAddNewBranch = async (e) => {
		e.preventDefault();
		const isValid = validate(formValues);
		if (isValid) {
			dispatch(addBranch(formValues));
			setFormValues(initialFormValues);
		}
	}

	const getBranchData = async () => {
		try {
			await axios.get(`${base_url}/getBranchData`)
				.then(res => {
					const result = res.data;
					setCustomerList(result);
				})
		} catch (error) {
			console.log(error)
		}
	}


	const handleUpdateBranch = (e) => {
		e.preventDefault();
		const isValid = validate(update)
		if (isValid) {
			updateBranch();
		}
	}

	const updateBranch = async () => {
		try {
			await axios.post(`${base_url}/updateBranch`, { update })
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
					setUpdate(initialFormValues);
					getBranchData();
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteBranch = (id) => {
		const agreed = window.confirm(`Are you sure?`);
		if (agreed) {
			dispatch(deleteBranch(id));
		}
	}

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		let isValid = true;
		if (!values.branchName) {
			errors.branchName = "Branch Name is required";
			isValid = false;
		}

		if (!values.email) {
			errors.email = "Email is required";
			isValid = false;
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format";
		}

		if (!values.gstNumber) {
			errors.gstNumber = "GST Number is required";
			isValid = false;
		}

		if (!values.phoneNumber) {
			errors.phoneNumber = "Phone Number is required";
			isValid = false;
		}
		if (!values.address) {
			errors.address = "Address is required";
			isValid = false;
		}
		if (!values.city) {
			errors.city = "City is required";
			isValid = false;
		}
		if (!values.state) {
			errors.state = "State is required";
			isValid = false;
		}

		setFormErrors(errors);
		return isValid;
	}

	useEffect(() => {
		getBranchData();

		dispatch(getBranchList());

		$(document).ready(function () {
			$('#example5').DataTable();
		});
	}, [])

	return (
		<>
			<div className="content-body">
				<div className="container-fluid">

					<div className="row page-titles mx-0">
						<div className="col-sm-6 p-md-0 d-flex align-items-center">
							<div className="welcome-text">
								<h4>Branch List</h4>
							</div>
						</div>
						<div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
							<div className="d-flex">
								<a href="/" data-toggle="modal" data-target="#add-category" className="btn btn-rounded btn-success mr-1"><i className="fa fa-plus"></i>&nbsp; Add Branch</a>

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
													<th>Name</th>
													<th data-orderable="false">City</th>
													<th data-orderable="false">Address</th>
													<th data-orderable="false">GST</th>
													<th data-orderable="false">Status</th>
													<th data-orderable="false">Action</th>
												</tr>
											</thead>
											<tbody>
												{
													!branchListState.loading ?
														branchListState.branchList?.length > 0 ?
															branchListState.branchList.map((items, index) => {
																return <tr key={index}>
																	<td>{items.branchName}</td>
																	<td>{items.city}</td>
																	<td>{items.address}</td>
																	<td>{items.gstNumber}</td>
																	<td> <label className="switch">
																		<input defaultChecked={true} type="checkbox" />
																		<span className="slider round"></span>
																	</label></td>
																	<td>
																		<div className="d-flex">
																			<a href="/" data-toggle="modal"
																				onClick={() => setUpdate({
																					branchName: items.branchName,
																					email: items.email,
																					phoneNumber: items.phoneNumber,
																					gstNumber: items.gstNumber,
																					address: items.address,
																					city: items.city,
																					state: items.state,
																					date: items.date,
																					branchId: items._id
																				})}
																				data-target="#update-category" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
																			<a href="##" onClick={() => handleDeleteBranch(items._id)} className="btn btn-danger shadow btn-xs sharp mr-1"><i className="fa fa-trash"></i></a>

																		</div>
																	</td>
																</tr>
															})
															:
															""
														:
														<tr>
															<td></td>
															<td></td>
															<td colSpan="9" className="text-center">
																<img width={30} src={process.env.PUBLIC_URL + "/assets/images/loading-gif.gif"} alt="" />
															</td>
															<td></td>
															<td></td>
															<td></td>
														</tr>
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


			{/* <!-- Modal Add Category --> */}
			<div className="modal fade none-border" id="add-category">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title"><strong>Add Branch</strong></h4>
						</div>
						<div className="modal-body">
							<form onSubmit={handleAddNewBranch}>
								<div className="row">
									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.branchName} onChange={handleFormValues} placeholder="Branch Name" type="text" name="branchName" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.branchName}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.email} onChange={handleFormValues} placeholder="Email" type="text" name="email" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.email}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.phoneNumber} onChange={handleFormValues} placeholder="Phone Number" type="text" name="phoneNumber" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.phoneNumber}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.gstNumber} onChange={handleFormValues} placeholder="GST Number" type="text" name="gstNumber" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.gstNumber}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.address} onChange={handleFormValues} placeholder="Address" type="text" name="address" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.address}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.city} onChange={handleFormValues} placeholder="City" type="text" name="city" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.city}</span>

									</div>
									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.state} onChange={handleFormValues} placeholder="State" type="text" name="state" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.state}</span>
									</div>

								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
									<button type="submit" className="btn btn-danger waves-effect waves-light save-category">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>


			{/* <!-- Modal update Category --> */}
			<div className="modal fade none-border" id="update-category">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title"><strong>Add Branch</strong></h4>
						</div>
						<div className="modal-body">
							<form onSubmit={handleUpdateBranch}>
								<div className="row">
									<div className="col-md-6">
										<input className="form-control form-white" value={update.branchName} onChange={handleUpdateValue} placeholder="Branch Name" type="text" name="branchName" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.branchName}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={update.email} onChange={handleUpdateValue} placeholder="Email" type="text" name="email" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.email}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={update.phoneNumber} onChange={handleUpdateValue} placeholder="Phone Number" type="text" name="phoneNumber" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.phoneNumber}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={update.gstNumber} onChange={handleUpdateValue} placeholder="GST Number" type="text" name="gstNumber" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.gstNumber}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={update.address} onChange={handleUpdateValue} placeholder="Address" type="text" name="address" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.address}</span>
									</div>

									<div className="col-md-6">
										<input className="form-control form-white" value={update.city} onChange={handleUpdateValue} placeholder="City" type="text" name="city" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.city}</span>

									</div>
									<div className="col-md-6">
										<input className="form-control form-white" value={update.state} onChange={handleUpdateValue} placeholder="State" type="text" name="state" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.state}</span>
									</div>

								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
									<button type="submit" className="btn btn-danger waves-effect waves-light save-category">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>


			{/* <!-- Modal view Category --> */}
			{/* <div className="modal fade none-border" id="view-category">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<img src="<?php echo base_url('assets/images/avatar/1.jpg'); ?>" alt="" className="img-responsive img-thumbnail" />

							<p>Created on <br />11/11/2022 at 11:30 PM</p>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-sm-6">Full Name:</div>
								<div className="col-sm-6">
									<b>Ronak Vaya</b>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6">Phone Number:</div>
								<div className="col-sm-6">
									<b>9694 998693</b>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">User id/Email:</div>
								<div className="col-sm-6">
									<b>Ronakvaya@gmail.com</b>
								</div>
							</div>

							<hr />
							<div className="row">
								<div className="col-sm-6">
									<p>Current Role</p>
								</div>
								<div className="col-sm-6">
									<p><b>System Admin </b></p>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-6">
									<p>Current Password</p>
								</div>
								<div className="col-sm-6">
									<p><b>************** <li className="fa fa-eye"></li> </b></p>
								</div>
							</div>


						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default waves-effect" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div> */}
		</>
	)
}

export default Branch;