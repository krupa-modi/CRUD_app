// login page
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  // for email
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  // for password
  const [password, setPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  // for success message
  const [successmsg, setSuccessMsg] = useState("");

  // for redirect
  const navigate = useNavigate();

  // for notification
  const notify = () =>
    toast.success("Login Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  const notifyError = () =>
    toast.error("Invalid Email OR Password", {
      position: toast.POSITION.TOP_CENTER,
    });

  // check for localstorage
  const userName = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "admin@admin.com";
  const userPassword = localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === userName && password === userPassword) {
      notify();
      navigate("/profile");
    } else {
      notifyError();
    }
  };
  return (
    <>
      <div className="form__container d-flex felx-column align-items-center justify-content-center">
        <form>
          <h4 className="form__heading">CRUD OPERATION </h4>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              required
            />
          </div>

          <div className="form__signupLink mb-3">
            <p>
              Don't Have An Account? <Link to="/profile">Signup !</Link>
            </p>
          </div>
          <button type="submit" className="form__button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <div>
          <ToastContainer autoClose={2000} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;



// home page
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  // for navigate
  const navigate = useNavigate();

  const profileURL =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gender, setgender] = useState("");
  const [phoneno, setPhoneNumber] = useState("");
  const [img, setImg] = useState(profileURL);
  const [checked, setchecked] = useState(false);

  const [items, setItems] = useState([]);

  const fileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  //handle img
  const handleImg = (e) => {
    const file = e.target.files[0];
    fileData(file).then((fileData) => {
      localStorage["img"] = fileData;
      console.debug("File Store", fileData);
    });
  };

  // for notification
  const notifySuccess = () => toast.success("User Details Save!");
  const notifyNameError = () => toast.error("Name is required");
  const notifyEmailError = () => toast.error("Email is required");
  const notifyPhonenoError = () => toast.error("Phone No is required");
  const notifyPasswordError = () => toast.error("Password is required");
  const notifyGenderError = () => toast.error("Gender is required");
  const notifytermsError = () =>
    toast.error("Please checked terms and condition");

  //form submit handler
  const handleSubmit = (e) => {
    // let data = { data: [] };
    let storedData = JSON.parse(localStorage.getItem("item"));
    // console.log(storedData);
    // localStorage.setItem("item", JSON.stringify(arr));
    // console.log("dhskjj", localStorage.getItem("item"));
    const emailexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    e.preventDefault();
    if (name === "") {
      notifyNameError();
    } else if (email === "") {
      // if (email === "") {
      notifyEmailError();
      // } else if (!email.match(emailexp)) {
      //   notifyEmailError();
    } else if (password === "" && password.length < 5) {
      notifyPasswordError();
    } else if (gender === "") {
      notifyGenderError();
    } else if (phoneno === "" && phoneno < 10) {
      notifyPhonenoError();
    } else if (!checked) {
      notifytermsError();
    } else {
      const obj = {
        id: uuidv4(),
        name: name,
        email: email,
        password: password,
        gender: gender,
        phoneno: phoneno,
        terms: checked,
      };
      if (storedData === null) {
        storedData = [obj];
        localStorage.setItem("item", JSON.stringify(storedData));
      } else {
        storedData.push(obj);
        localStorage.setItem("item", JSON.stringify(storedData));
      }

      notifySuccess();
      navigate("/users");
    }
  };
  const handlerName = (e) => {
    const result = e.target.value.replace(/[0-9+@#$&%!~=*.//g/\-/]/gi, "");
    setname(result);
  };
  const handlerEmail = (e) => {
    const result1 = e.target.value;
    setemail(result1);
  };
  const handlerPhoneno = (e) => {
    const result2 = e.target.value.replace(
      /[A-Za-z+@#$&%!~=*./\s/g/\-/]/gi,
      ""
    );
    setPhoneNumber(result2);
  };

  const handlerPassword = (e) => {
    const result2 = e.target.value.replace(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g
    );
    setpassword(result2);
  };

  return (
    <>
      <Navbar />
      <div className="container content mt-4">
        <h5> 📝 Add New User</h5>
        <div className="row border p-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                value={name}
                onChange={handlerName}
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={handlerEmail}
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone No
              </label>
              <input
                type="text"
                value={phoneno}
                onChange={handlerPhoneno}
                className="form-control"
                id="address"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handlerPassword}
                className="form-control"
                id="password"
              />
            </div>
            <div className="d-flex flex-row">
              Gender :
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Male"
                  defaultChecked={gender === "Male"}
                  onClick={(e) => setgender(e.target.value)}
                  id="male"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Female"
                  defaultChecked={gender === "Female"}
                  onClick={(e) => setgender(e.target.value)}
                  id="female"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={(e) => setchecked(e.target.value)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I Accept Terms And Conditions
              </label>
            </div>
            <button
              type="submit"
              className="form__submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div className="col-md-4 ">
            <div className="profile_section">
              <p>Select Profile Picture :</p>
              <img
                src={profileURL}
                alt="profile_pic"
                name="file"
                className="img-thumbnail"
                height={250}
                width={250}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Default file input
              </label>
              <input
                className="form-control"
                type="file"
                onChange={handleImg}
                name="file"
                id="formFile"
              />
            </div> */}
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};

export default HomePage;

