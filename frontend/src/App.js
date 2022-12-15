import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  Access,
  Branch,
  Configuration,
  Clients,
  Dashboard,
  DesignProjects,
  AddNewDesignProject,
  Employees,
  Header,
  Login,
  User,
  DesignForm,
  DesignStatus,
  Invoicing,
  DesignDetails,
  CustomerReport,
  BillsList,
  ViewBill,
} from "./components";

// import jwt from "jsonwebtoken";

function App() {
  // const base_url = "http://localhost:9002";
  // const base_url = "https://rkbm.herokuapp.com";
  const base_url = "https://rkmb-backend.vercel.app";

  const [user_id, setUser_id] = useState();

  const updateUserId = (user_id) => {
    localStorage.setItem("userID", JSON.stringify(user_id));
    setUser_id(user_id);
  };

  useEffect(() => {
    const authToken = async () => {
      try {
        const data = await axios.get(`${base_url}/auth`, {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userID")),
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (data.data.user) {
          setUser_id(JSON.parse(localStorage.getItem("userID")));
        } else {
          setUser_id(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    authToken();
  }, []);

  return (
    <>
      <Router>
        {user_id ? (
          <>
            <Header updateUserId={updateUserId} />
            <Routes>
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients/list" element={<Clients />} />
              <Route path="/employees" element={<Employees />} />

              <Route path="/settings/user" element={<User />} />
              <Route path="/settings/access" element={<Access />} />
              <Route path="/settings/branch" element={<Branch />} />
              <Route path="settings/config" element={<Configuration />} />

              <Route path="/design/projects" element={<DesignProjects />} />
              <Route path="/design/projects/addNewDesignProject" element={<AddNewDesignProject />} />
              <Route path="/design/designform" element={<DesignForm />} />
              <Route path="/design/designstatus" element={<DesignStatus />} />
              <Route path="/design/designdetails" element={<DesignDetails />} />

              <Route path="/accounting/invoicing" element={<Invoicing />} />
              <Route path="/accounting/BillsList" element={<BillsList />} />
              <Route path="/accounting/BillsList/view" element={<ViewBill />} />

              <Route path="/reports/customerreport" element={<CustomerReport />} />

              <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/login" />}></Route>
            <Route
              path="/login"
              element={<Login updateUserId={updateUserId} />}
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
