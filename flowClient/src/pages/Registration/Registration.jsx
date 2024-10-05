import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import loginSide from '../../assets/images/login-side.png';
import swal from 'sweetalert';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      swal({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        timer: 2000,
        buttons: false,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        swal({
          title: "Registration Successful",
          text: "Redirecting to login...",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      swal({
        title: "Error",
        text: error.message,
        icon: "error",
        timer: 2000,
        buttons: false,
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
                  <div className="highlight">Sign up</div>
                  <h2>Get started</h2>
                  <p>
                    Created account to access F.L.O.W. the best tool to manage your all
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
                  <label>Email </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <div className="form-control">
                  <label>Confirm Password </label>
                  <input
                    type="password"
                    placeholder="Re-Enter Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input className="submit-btn" type="submit" value="Register" />
              </form>
              <div className="socialLogin">
                <i className="bx bxl-google"></i>
                <i className="bx bxl-meta"></i>
                <i className="bx bxl-github"></i>
              </div>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
