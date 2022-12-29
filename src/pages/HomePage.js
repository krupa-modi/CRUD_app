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

  // ******************************************** for validation ***************************************************
  // for name
  const [name, setname] = useState("");
  const [nameerror, setNameError] = useState("");

  // for email
  const [email, setemail] = useState("");
  const [emailerror, setEmailError] = useState("");

  // for password
  const [password, setpassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  // for gender
  const [gender, setgender] = useState("");
  const [gendererror, setGenderError] = useState("");

  // for phoneno
  const [phoneno, setPhoneNumber] = useState("");
  const [phonenoerror, setPhoneNoError] = useState("");

  const [img, setImg] = useState(profileURL);

  // for check box
  const [checked, setchecked] = useState(false);
  const [checkederror, setCheckedError] = useState("");

  // for success
  const [successmsg, setSuccessMsg] = useState("");

  const handlerName = (e) => {
    setSuccessMsg("");
    setNameError("");
    setname(e.target.value);
  };

  const handlerEmail = (e) => {
    setSuccessMsg("");
    setEmailError("");
    setemail(e.target.value);
  };

  const handlerPhoneno = (e) => {
    setSuccessMsg("");
    setPhoneNoError("");
    setPhoneNumber(e.target.value);
  };

  const handlerPassword = (e) => {
    setSuccessMsg("");
    setPasswordError("");
    setpassword(e.target.value);
  };

  const handlerGender = (e) => {
    setSuccessMsg("");
    setGenderError("");
    setgender(e.target.value);
  };

  const handlerCheckBox = (e) => {
    setSuccessMsg("");
    setCheckedError("");
    setchecked(e.target.value);
  };

  // ********************************************************** end *****************************************************************
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

  //form submit handler
  const handleSubmit = (e) => {
    let storedData = JSON.parse(localStorage.getItem("item"));
    e.preventDefault();

    if (name !== "") {
      const nameRegex = /^[a-zA-Z]+$/;
      if (nameRegex.test(name)) {
        setNameError("");
        if (name.length > 6) {
          setNameError("");
        } else {
          setNameError("Name must be more than 6 character required");
        }
      } else {
        setNameError("please enter only character");
      }
    } else if (name === "") {
      setNameError("Name is required");
    }
    if (email !== "") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegex.test(email)) {
        setEmailError("");
      } else {
        setEmailError("Please enter valid email like:test@test.com");
      }
    } else if (email === "") {
      setEmailError("Email is required");
    }
    if (password !== "") {
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
      if (passwordRegex.test(password)) {
        setPasswordError("");
        if (password.length >= 8) {
          setPasswordError("");
        } else {
          setPasswordError("Password must have at least 8 characters");
        }
      } else {
        setPasswordError(
          "password must be only characters, numeric digits, underscore and first character must be a letter"
        );
      }
    } else if (password === "") {
      setPasswordError("Password is required");
    }
    if (phoneno !== "") {
      const phonenoRegex =
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
      if (phonenoRegex.test(phoneno)) {
        setPhoneNoError("");
        if (phoneno.length === 10) {
          setPhoneNoError("");
        } else {
          setPhoneNoError("Please Enter 10 digit Mobile Number");
        }
      } else {
        setPhoneNoError("Only required Number");
      }
    } else if (phoneno === "") {
      setPhoneNoError("PhoneNo is required");
    }
    if (gender === "") {
      setGenderError("Please select gender");
    }
    if (!checked) {
      setCheckedError("Please checked the check box");
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
      navigate("/users");
      // setSuccessMsg("Added Successfully");
      // setTimeout(() => {
      //   navigate("/users");
      // }, 1000);
    }
    // navigate("/users");
    // setSuccessMsg("Added Successfully");
    // setTimeout(() => {
    //   navigate("/users");
    // }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="container content mt-4">
        {successmsg && <div className="success-msg">{successmsg}</div>}

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
            {nameerror && <div className="error-msg">{nameerror}</div>}

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
            {emailerror && <div className="error-msg">{emailerror}</div>}

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
            {phonenoerror && <div className="error-msg">{phonenoerror}</div>}

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
            {passworderror && <div className="error-msg">{passworderror}</div>}

            <div className="d-flex flex-row">
              Gender :
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Gender"
                  value="Male"
                  defaultChecked={gender === "Male"}
                  onChange={handlerGender}
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
                  onChange={handlerGender}
                  id="female"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>
            {gendererror && <div className="error-msg">{gendererror}</div>}
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={handlerCheckBox}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                I Accept Terms And Conditions
              </label>
            </div>
            {checkederror && <div className="error-msg">{checkederror}</div>}
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
