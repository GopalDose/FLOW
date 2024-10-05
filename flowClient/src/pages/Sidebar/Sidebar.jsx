import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="navigationBar">
      <div className="top">
        <div className="design">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="collapseBtn">
          <i className="bx bx-chevrons-left"></i> {/* Use className instead of class */}
        </div>
      </div>
      <div className="brand"></div>
      <div className="main-menu">
        <div className="title">Main-menu</div>
        <ul>
          <li>
            <Link to="/personal-task">
              <i className="bx bx-user"></i> Personal Task
            </Link>
          </li>
          <li>
            <Link to="/team-task">
              <i className="bx bxs-bar-chart-alt-2"></i> Team Task
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="bx bx-cog"></i> Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
