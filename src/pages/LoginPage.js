import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  // for email
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");

  // for password
  const [password, setPassword] = useState("");
  const [passworderror, setPasswordError] = useState("");

  // for success message
  const [successmsg, setSuccessMsg] = useState("");

  const handlerEmail = (e) => {
    setSuccessMsg("");
    setEmailError("");
    setEmail(e.target.value);
  };
  const handlerPassword = (e) => {
    setSuccessMsg("");
    setPasswordError("");
    setPassword(e.target.value);
  };

  // for redirect
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // for email error
    if (email !== "") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (emailRegex.test(email)) {
        setEmailError("");
        if (email === "admin@admin.com") {
          setEmailError("");
          if (password === "admin") {
            setSuccessMsg("you are successfully logged in");
            setTimeout(() => {
              navigate("/profile");
            }, 1000);
          } else {
            setPasswordError("password does not match with out database");
          }
        } else {
          setEmailError("Email does not match with out database");
        }
      } else {
        setEmailError("Invalid email");
      }
    } else {
      setEmailError("Email is required");
    }

    // for password error
    if (password !== "") {
    } else {
      setPasswordError("Password is required");
    }
  };
  return (
    <>
      <div className="form__container d-flex felx-column align-items-center justify-content-center">
        <form>
          <h4 className="form__heading">CRUD OPERATION </h4>
          {successmsg && <div className="success-msg">{successmsg}</div>}

          <hr />
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={handlerEmail}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          {emailerror && <div className="error-msg">{emailerror}</div>}

          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlerPassword}
              id="exampleInputPassword1"
              required
            />
          </div>
          {passworderror && <div className="error-msg">{passworderror}</div>}

          <div className="form__signupLink mb-3">
            <p>
              Don't Have An Account? <Link to="/profile">Signup !</Link>
            </p>
          </div>
          <button type="submit" className="form__button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        {/* <div>
          <ToastContainer autoClose={2000} />
        </div> */}
      </div>
    </>
  );
};

export default LoginPage;
