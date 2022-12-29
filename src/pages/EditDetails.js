import React, { useState, useEffect } from "react";
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditDetails = () => {
  const { id } = useParams();
  const loc = useLocation();

  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(loc.state);

  const [user, setuserData] = useState({
    name: edit.name,
    email: edit.email,
    phoneno: edit.phoneno,
    gender: edit.gender,
  });

  const navigate = useNavigate();

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

  const handlerEdit = (ele) => {
    const getUser = JSON.parse(localStorage.getItem("item"));
    // console.log("getuser", getUser);
    let newData = getUser.find((ele, index) => {
      return ele.id === id;
    });
    // console.log("newdata", newData);

    let val = getUser.findIndex((item) => item.id === edit.id);
    // console.log("val", val);
    // console.log(getUser[val].id);

    const obj = {
      id: edit.id,
      name: user.name,
      email: user.email,
      phoneno: user.phoneno,
      gender: user.gender,
    };
    getUser[val] = obj;
    // console.log("result", getUser);
    localStorage.setItem("item", JSON.stringify(getUser));
    setTimeout(() => {
      alert("Data Updated Successfully");
    }, 50);
    // testData();
    // setEdit(newData);
    navigate(`/users`);
  };

  return (
    <>
      <Navbar />
      <div className="container content mt-4">
        <h5> 📝 Edit User</h5>
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
                value={user.name}
                onChange={(e) => setuserData({ ...user, name: e.target.value })}
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
                value={user.email}
                onChange={(e) =>
                  setuserData({ ...user, email: e.target.value })
                }
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
                value={user.phoneno}
                onChange={(e) =>
                  setuserData({ ...user, phoneno: e.target.value })
                }
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
                value={user.gender}
                onChange={(e) =>
                  setuserData({ ...user, gender: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="form__submit-btn"
              onClick={handlerEdit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDetails;
