import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Login = (props) => {
  // const base_url = "http://localhost:9002";
  // const base_url = "https://rkbm.herokuapp.com";
  const base_url = "https://rkmb-backend.vercel.app";

  const { updateUserId } = props;

  const initialFormValues = {
    email: "admin@admin.com",
    password: "admin",
  };

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [loading, setLoading] = useState(false);

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signin();
  };

  const signin = async () => {
    try {
      await axios.post(`${base_url}/signin`, { formValues }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }).then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.data.message === "Please signin with valid credentials") {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
          })
        } else if (res.data.message === "user doesn't exist") {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
          })
        }

        if (res.data.message === "Sign in success") {
          updateUserId(res.data.userToken);
          localStorage.setItem("userPrivilege", res.data.userPrivilege);
          localStorage.setItem("userName", res.data.userName);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div style={{ transform: "translateY(40%)" }}>
        <div className="authincation h-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-md-6 text-center">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div style={{ textAlign: "left" }} className="auth-form">
                        <h4 className="text-center mb-4">Sign in your account</h4>

                        <form onSubmit={handleSubmit}>

                          <div className="form-group">
                            <label className="mb-1">
                              <strong>Email</strong>
                            </label>
                            <input type="email" name="email" value={formValues.email} onChange={handleFormValue} className="form-control" placeholder="hello@example.com" />
                          </div>

                          <div className="form-group">
                            <label className="mb-1">
                              <strong>Password</strong>
                            </label>
                            <input type="password" name="password" value={formValues.password} onChange={handleFormValue} className="form-control" placeholder="Password" />
                          </div>

                          <div className="form-row d-flex justify-content-between mt-4 mb-2">
                            <div className="form-group">
                              <div className="custom-control custom-checkbox ml-1">
                                <input type="checkbox" className="custom-control-input" id="basic_checkbox_1" />
                                <label className="custom-control-label" htmlFor="basic_checkbox_1">Remember my preference</label>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-block">
                              {loading ? "Loading..." : "Sign Me In"}
                            </button>
                          </div>

                        </form>

                      </div>
                    </div>
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

export default Login;