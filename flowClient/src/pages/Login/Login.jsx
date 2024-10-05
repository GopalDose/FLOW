import React, { useState } from "react";
import loginSide from "../../assets/images/login-side.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        swal({
          title: "Warning",
          text: "Username or password is invalid!!",
          icon: "error",
          buttons: true,
        });
      } else if (data.message) {
        sessionStorage.setItem("loggedin", username); // Set username in session storage
        swal({
          title: "Login Successful",
          text: "Redirecting to profile...",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        setTimeout(() => {
          navigate("/complete-profile");
        }, 2000);
      }
    } catch (error) {
      swal({
        title: "Error",
        text: "Something went wrong....!!",
        icon: "error",
        buttons: true,
      });
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="two-div">
          <div className="left-box">
            <img src={loginSide} alt="" />
          </div>
          <div className="right-div">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="heading">
                  <div className="highlight">Sign in</div>
                  <h2>Get started</h2>
                  <p>
                    Login to access F.L.O.W. the best tool to manage your all
                    workloads.
                  </p>
                </div>
                <div className="form-control">
                  <label>UserName </label>
                  <input
                    type="text"
                    placeholder="Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label>Password </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input className="submit-btn" type="submit" value="Login" />
              </form>
              <div className="socialLogin">
                <i className="bx bxl-google"></i>
                <i className="bx bxl-meta"></i>
                <i className="bx bxl-github"></i>
              </div>
              <p>
                Don't have an account? <Link to="/registration">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
