import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import '../component.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'
window.$ = $
toast.configure()

const Access = () => {

	// const base_url = "http://localhost:9002";
	// const base_url = "https://rkbm.herokuapp.com";
	const base_url = "https://rkmb-backend.vercel.app";

	const initialFormValues = {
		roleName: "",
		dashboard: false,
		clients: false,
		accounting: false,
		reports: false,
		surat: false,
		mumbai: false,
		userId: ""
	}

	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState({});
	const [customerList, setCustomerList] = useState([]);
	const [update, setUpdate] = useState(initialFormValues);

	const handleFormValues = (e) => {
		const { name, checked } = e.target;
		setFormValues({ ...formValues, [name]: checked });
	}

	const handleFormValues2 = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	}

	const handleUpdateValue = (e) => {
		const { name, checked } = e.target;
		setUpdate({ ...update, [name]: checked });
	}

	const handleUpdateValue2 = (e) => {
		const { name, value } = e.target;
		setUpdate({ ...update, [name]: value });
	}

	const handleAddAccessRole = async (e) => {
		e.preventDefault();
		const isValid = validate(formValues);
		if (isValid) {
			addAccessRole();
		}
	}

	const addAccessRole = async () => {
		try {
			await axios.post(`${base_url}/addAccessRole`, { formValues })
				.then(res => {
					// console.log("res", res);
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
				})
			setFormValues(initialFormValues);
			getAccessRoleData();
		} catch (error) {
			console.log(error);
		}
	}

	const getAccessRoleData = async () => {
		try {
			await axios.get(`${base_url}/getAccessRoleData`)
				.then(res => {
					const result = res.data;
					setCustomerList(result);
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteAccessRole = async (id) => {
		try {
			await axios.post(`${base_url}/accessRole/delete`, { id })
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
					getAccessRoleData();
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleUpdateAccessRole = (e) => {
		e.preventDefault();
		const isValid = validate(update)
		if (isValid) {
			updateAccessRole();
		}
	}

	const updateAccessRole = async () => {
		try {
			await axios.post(`${base_url}/updateAccessRole`, { update })
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
					getAccessRoleData();
				})
		} catch (error) {
			console.log(error)
		}
	}

	const validate = (values) => {
		const errors = {};
		let isValid = true;
		if (!values.roleName) {
			errors.roleName = "Role Name is required";
			isValid = false;
		}

		setFormErrors(errors);
		return isValid;
	}

	useEffect(() => {
		getAccessRoleData();
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
								<h4>Access Roles</h4>
							</div>
						</div>
						<div className="col-sm-6 p-md-0 justify-content-sm-end mt-0 mt-sm-0 d-flex">
							<div className="d-flex">
								<a href="/" data-toggle="modal" data-target="#add-category" className="btn btn-rounded btn-success mr-1"><i className="fa fa-plus"></i>&nbsp; Add Role</a>

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
													<th>Role</th>

													<th data-orderable="false">Module Access</th>
													<th data-orderable="false">Branch Access</th>
													<th data-orderable="false">Status</th>

													<th data-orderable="false">Action</th>

												</tr>
											</thead>
											<tbody>

												{
													customerList.length > 0
														?
														customerList.map((items, index) => {
															return <tr key={index}>
																<td>{items.roleName}</td>
																<td>
																	{items.dashboard ? "Dashboard\n" : "\n"}
																	{items.clients ? "Clients\n" : "\n"}
																	{items.accounting ? "Accounting\n" : "\n"}
																	{items.reports ? "Reports\n" : "\n"}
																</td>
																<td>
																	{items.surat ? "Surat\n" : "\n"}
																	{items.mumbai ? "Mumbai\n" : "\n"}
																</td>
																<td>
																	<label className="switch">
																		<input defaultChecked={true} type="checkbox" />
																		<span className="slider round"></span>
																	</label>
																</td>
																<td>
																	<div className="d-flex">
																		<a href="/" data-toggle="modal"
																			onClick={() => setUpdate({
																				roleName: items.roleName,
																				dashboard: items.dashboard,
																				clients: items.clients,
																				accounting: items.accounting,
																				reports: items.reports,
																				surat: items.surat,
																				mumbai: items.mumbai,
																				userId: items._id
																			})}
																			data-target="#update-category" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
																		<a href="#" onClick={() => handleDeleteAccessRole(items._id)} className="btn btn-danger shadow btn-xs sharp mr-1"><i className="fa fa-trash"></i></a>

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

				</div>
			</div>


			{/* <!-- Modal Add Category --> */}
			<div className="modal fade none-border" id="add-category">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header ">
							<h4 className="modal-title"><strong>Add Role</strong></h4>
						</div>
						<div className="modal-body">
							<form onSubmit={handleAddAccessRole}>
								<div className="row">
									<div className="col-md-6">
										<input className="form-control form-white" value={formValues.roleName} onChange={handleFormValues2} placeholder="Role Name" type="text" name="roleName" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.roleName}</span>
									</div>


								</div>

								<div className="row">
									<div className="col-sm-6">
										<div className="card-header border-0 pb-0">
											<h4 className="card-title">Module Access</h4>
										</div>
										<div className="card-body">
											<table className="table table-responsive-sm">
												<tbody>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" checked={JSON.parse(formValues.dashboard)} onChange={handleFormValues} className="custom-control-input" id="customCheckBox1" name="dashboard" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox1"></label>
															</div>
														</td>
														<td>Dashboard</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="clients" checked={JSON.parse(formValues.clients)} onChange={handleFormValues} className="custom-control-input" id="customCheckBox2" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox2"></label>
															</div>
														</td>
														<td>Clients</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="accounting" checked={JSON.parse(formValues.accounting)} onChange={handleFormValues} className="custom-control-input" id="customCheckBox3" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox3"></label>
															</div>
														</td>
														<td>Accounting</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="reports" checked={JSON.parse(formValues.reports)} onChange={handleFormValues} className="custom-control-input" id="customCheckBox4" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox4"></label>
															</div>
														</td>
														<td>Reports</td>
													</tr>


												</tbody>
											</table>
										</div>
									</div>

								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="card-header border-0 pb-0">
											<h4 className="card-title">Branch Access</h4>
										</div>
										<div className="card-body">
											<table className="table table-responsive-sm">
												<tbody>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="surat" checked={JSON.parse(formValues.surat)} onChange={handleFormValues} className="custom-control-input" id="customCheckBox5" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox5"></label>
															</div>
														</td>
														<td>Surat</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="mumbai" checked={JSON.parse(formValues.mumbai)} onChange={handleFormValues} className="custom-control-input" id="customCheckBox6" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox6"></label>
															</div>
														</td>
														<td>Mumbai</td>
													</tr>


												</tbody>
											</table>
										</div>
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
				<div className="modal-dialog" style={{ maxWidth: "37.5rem" }}>
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title"><strong>Update Role</strong></h4>
						</div>
						<div className="modal-body">
							<form onSubmit={handleUpdateAccessRole}>
								<div className="row">
									<div className="col-md-6">
										<input className="form-control form-white" value={update.roleName} onChange={handleUpdateValue2} placeholder="Role Name" type="text" name="roleName" />
										<span className="text-danger" style={{ fontSize: "10px", marginLeft: "2px" }} >{formErrors.roleName}</span>
									</div>


								</div>

								<div className="row">
									<div className="col-sm-6">
										<div className="card-header border-0 pb-0">
											<h4 className="card-title">Module Access</h4>
										</div>
										<div className="card-body">
											<table className="table table-responsive-sm">
												<tbody>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" checked={update.dashboard} onChange={handleUpdateValue} className="custom-control-input" id="customCheckBox1" name="dashboard" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox1"></label>
															</div>
														</td>
														<td>Dashboard</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="clients" checked={update.clients} onChange={handleUpdateValue} className="custom-control-input" id="customCheckBox2" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox2"></label>
															</div>
														</td>
														<td>Clients</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="accounting" checked={update.accounting} onChange={handleUpdateValue} className="custom-control-input" id="customCheckBox3" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox3"></label>
															</div>
														</td>
														<td>Accounting</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="reports" checked={update.reports} onChange={handleUpdateValue} className="custom-control-input" id="customCheckBox4" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox4"></label>
															</div>
														</td>
														<td>Reports</td>
													</tr>


												</tbody>
											</table>
										</div>
									</div>

								</div>
								<div className="row">
									<div className="col-sm-6">
										<div className="card-header border-0 pb-0">
											<h4 className="card-title">Branch Access</h4>
										</div>
										<div className="card-body">
											<table className="table table-responsive-sm">
												<tbody>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="surat" checked={update.surat} onChange={handleUpdateValue} className="custom-control-input" id="customCheckBox5" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox5"></label>
															</div>
														</td>
														<td>Surat</td>
													</tr>
													<tr>
														<td>
															<div className="custom-control custom-checkbox check-lg mr-3">
																<input type="checkbox" name="mumbai" checked={update.mumbai} onChange={handleUpdateValue} className="custom-control-input" id="customCheckBox6" required="" />
																<label className="custom-control-label" htmlFor="customCheckBox6"></label>
															</div>
														</td>
														<td>Mumbai</td>
													</tr>


												</tbody>
											</table>
										</div>
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

		</>
	)
}

export default Access;