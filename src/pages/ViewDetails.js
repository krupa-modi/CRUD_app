import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const ViewDetails = () => {
  const [items, setItems] = useState([]);

  const loc = useLocation();
  const variable = loc.state;
  console.log(variable);

  const testData = () => {
    const getUser = localStorage.getItem("item");

    if (getUser && getUser.length) {
      const user = JSON.parse(getUser);
      setItems(user);
    }
  };
  useEffect(() => {
    testData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container content mt-4">
        <h3 className="text-center bg-info p-2 mb-3">
          Welcome To View Details Page
        </h3>
        <Link className="btn btn-primary my-3" to="/users">
          Back To Home
        </Link>
        <div className="row border p-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                value={variable.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={variable.email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone No
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={variable.phoneno}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={variable.gender}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
