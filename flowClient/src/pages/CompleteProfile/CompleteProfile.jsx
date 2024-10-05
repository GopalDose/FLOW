import React, { useState, useEffect } from "react";
import "./CompleteProfile.css";
import { useNavigate } from "react-router-dom";
import profile from '../../assets/images/uploadprof.jpg'

const CompleteProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [mobile, setMobile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [facebook, setFacebook] = useState("");
  const [skills, setSkills] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/user/${sessionStorage.getItem("loggedin")}`
        );
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
        setProfileComplete(data.profile_complete === 1);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedin");
    setUsername(loggedInUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileExtension = profilePhoto.name.split(".").pop();
    formData.append("file", profilePhoto, `${username}.${fileExtension}`);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("instagram", instagram);
    formData.append("github", github);
    formData.append("facebook", facebook);
    formData.append("skills", skills);

    try {
      const response = await fetch("http://localhost:3001/saveProfile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.message) {
        alert("Profile saved successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="profile-sec">
          <div className="left-profile">
            <div className="username-label">{username}</div>
            <div className="email-label">{email}</div>
            <div className="profile-image">
              <img src={profile} alt="" />
            </div>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
          </div>
          <div className="right-profile">
            <h2>Complete Profile</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

              <div className="basic-details">
                <h4>User Info</h4>
                <div className="details">
                  <div className="left">
                    <div className="form-control">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="mobileNo">Mobile No</label>
                      <input
                        type="text"
                        id="mobileNo"
                        name="mobileNo"
                        placeholder="Enter Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="form-control">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basic-details">
                <h4>Social Info</h4>
                <div className="details">
                  <div className="left">
                    <div className="social-control">
                      <i className="bx bxl-linkedin"></i>
                      <input
                        type="text"
                        placeholder="LinkedIn Profile Link"
                        name="linkedin"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                    <div className="social-control">
                      <i className="bx bxl-github"></i>
                      <input
                        type="text"
                        placeholder="GitHub Profile Link"
                        name="github"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="social-control">
                      <i className="bx bxl-instagram-alt"></i>
                      <input
                        type="text"
                        placeholder="Instagram Profile Link"
                        name="instagram"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </div>
                    <div className="social-control">
                      <i className="bx bxl-facebook-square"></i>
                      <input
                        type="text"
                        placeholder="Facebook Profile Link"
                        name="facebook"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="basic-details">
                <h4>Skills Info</h4>
                <textarea
                  name="skills"
                  id="skills"
                  rows="10"
                  placeholder="Enter comma separated skills (e.g., HTML, CSS, JS)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                ></textarea>
              </div>
              <input
                className="submit-btn"
                type="submit"
                value="Save Profile"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
