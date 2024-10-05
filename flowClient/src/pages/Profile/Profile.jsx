import React, { useState, useEffect } from 'react';
import './Profile.css';
import profile from '../../assets/images/profile.jpg';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedin");
    if (loggedInUser) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/getuser/${loggedInUser}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="top-back">
          <Link to="/personal-task">Dashboard</Link>
        </div>
        <div className="profile-page">
          <div className="details">
            <div className="profileimg">
              {userData && (
                <img
                  src={`http://localhost:3001/${userData.profile_photo}`}
                  alt="Profile"
                />
              )}
              <div className="edit">
                <button className='edit-btn'><i className='bx bxs-edit-alt'></i> Edit Profile</button>
              </div>
            </div>
            <div className="inner">
              {userData && (
                <>
                  <h3>{userData.name}</h3>
                  <p className='username'>{userData.username}</p>
                  <div className="content">
                    <ul>
                      <li><i className='bx bxs-envelope'></i> {userData.email}</li>
                      <li><i className='bx bxs-phone-call'></i> {userData.mobile_no}</li>
                    </ul>
                    <div className="gender">
                      <h4>Gender: </h4>
                      <div className="gender1 active"><i className='bx bx-male' ></i> {userData.gender}</div>
                    </div>
                  </div>

                  <div className="social-contact">
                    <h4>Social Links</h4>
                    <div className="links">
                      <a href={userData.facebook_link}><i className='bx bxl-facebook'></i></a>
                      <a href={userData.linkedin_link}><i className='bx bxl-linkedin' ></i></a>
                      <a href={userData.github_link}><i className='bx bxl-github'></i></a>
                      <a href={userData.instagram_link}><i className='bx bxl-instagram' ></i></a>
                    </div>
                  </div>

                  {userData.skills && (
                    <div className="social-contact">
                      <h4>Skills</h4>
                      <div className="links">
                        {userData.skills.split(',').map((skill, index) => (
                          <div className="skill" key={index}><i className='bx bxs-star'></i>{skill.trim()}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
