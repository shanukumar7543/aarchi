import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "./style.scss";
import { height } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { registerUserAPI } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INIT_STATE = {
  email: "",
  password: "",
};

function Index() {
  const [loginDetails, setLoginDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setLoginDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const registerUser = async (logindata) => {
    console.log("loginDetails", logindata);
    try {
      const response = await registerUserAPI(logindata);
      console.log("38", response.data);
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    toast.success("Register SuccessFully!");
  };

  // const submitHandler = async (e) => {
  //   localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
  //   alert("Register Successfully");
  //   navigate("/admin/login");
  // };
  return (
    <>
      <div className="img1 Register">
        <ToastContainer />
        <div
          className="imp"
          style={{
            padding: "2rem",
            paddingTop: "120px",
            borderRadius: "20px",
            margin: "0 auto",
            // "margin-bottom": "50px",
            // "margin-right": "500px",
            minHeight: "100vh",
            width: "100wh",
          }}
        >
          <div
            className="form-div"
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "550px",
              width: "400px",
              //   border: "2px solid black",
              backgroundColor: "white",
              padding: "25px",
              //   boxShadow: "20px 10px 20px 10px solid green",
              margin: "0 auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h3>
                <b>Register Here</b>
              </h3>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="">Name</label>
              <TextField
                fullWidth
                value={loginDetails.name}
                name="name"
                placeholder="Enter Your Name"
                id="fullWidth"
                className="input"
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="">Email</label>
              <TextField
                fullWidth
                value={loginDetails.email}
                name="email"
                placeholder="Enter Your Email"
                id="fullWidth"
                className="input"
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="">Password</label>
              <TextField
                fullWidth
                id="fullWidth"
                placeholder="Enter Your Password"
                name="password"
                type="password"
                className="input"
                value={loginDetails.password}
                onChange={(e) => {
                  inputHandler(e);
                }}
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  registerUser(loginDetails);
                  handleClick();
                }}
                className="Login"
                variant="primary"
                type="submit"
                fullWidth
                size="large"
              >
                Submit
              </Button>
              <br />
              <br />
            </div>
            <Link style={{ float: "right" }} to="/admin/login">
              Login here!!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
