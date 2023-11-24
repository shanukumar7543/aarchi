import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.scss";
import { height } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { loginUserAPI } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setUserDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const loginUser = async (userDetails) => {
    console.log("loginDetails", userDetails);
    try {
      const response = await loginUserAPI(userDetails);
      localStorage.setItem("token", response.data.result.jwtToken);
      // alert("Loggedin Sucessfully");
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    const regData = JSON.parse(localStorage.getItem("loginDetails"));

    const { email, password } = regData;

    if (regData) {
      if (email === userDetails.email && password === userDetails.password) {
        alert("Loggedin Sucessfully");
        navigate("/admin/dashboard");
      } else {
        alert("Wrong Credential");
      }
    }
  };

  const handleClick = () => {
    toast.success("Login SuccessFully!");
  };

  return (
    <>
      <div className="img1 Login">
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
              height: "450px",
              width: "400px",
              borderRadius: "5px",
              backgroundColor: "white",
              padding: "25px",
              boxShadow: "20px 10px 20px 10px solid green",
              margin: "0 auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h3>
                <b>Login Here</b>
              </h3>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="">Email</label>
              <TextField
                fullWidth
                id="fullWidth"
                placeholder="Enter Your Email"
                className="input"
                name="email"
                onChange={(e) => {
                  inputHandler(e);
                }}
                value={userDetails.email}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="">Password</label>
              <TextField
                fullWidth
                type="password"
                placeholder="Enter Your Password"
                id="fullWidth"
                className="input"
                name="password"
                onChange={(e) => {
                  inputHandler(e);
                }}
                value={userDetails.password}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  loginUser(userDetails);
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
              <Link style={{ float: "left" }} to="/admin/register">
                Forget Password!!
              </Link>
              <Link style={{ float: "right" }} to="/admin/register">
                Register here!!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
