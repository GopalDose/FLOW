import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PersonalTask.css";
import AddPersonalTask from "../AddPersonalTask/AddPersonalTask";
import Sidebar from "../Sidebar/Sidebar";

const Personaltask = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [personalTasks, setPersonalTasks] = useState([]);

  useEffect(() => {
    fetchPersonalTasks();
  }, []);

  const fetchPersonalTasks = () => {
    const username = sessionStorage.getItem("loggedin");
    fetch("http://localhost:3001/getPersonalTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPersonalTasks(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching personal tasks:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(fetchPersonalTasks, 5000); // Polling every 5 seconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const handleAddTaskClick = () => {
    setIsAddTaskOpen(true);
  };

  const getStatusCategory = (subtasks) => {
    if (!subtasks) {
      return "Not Started";
    }

    const parsedSubtasks = JSON.parse(subtasks);
    const statuses = parsedSubtasks.map((subtask) => subtask.status);

    if (statuses.every((status) => status === "Not Started")) {
      return "Not Started";
    } else if (statuses.every((status) => status === "Completed")) {
      return "Completed";
    } else {
      return "In Progress";
    }
  };

  return (
    <>
      <div className="main-conatiner">
        <Sidebar />
        <div className="rightBody">
          <div className="pathIndicator">
            <div className="back">
              <i className="bx bx-chevron-left"></i>
            </div>
            <span>Task</span>/ Personal Task
          </div>
          <div className="headper">
            <h2>Personal Tasks</h2>
            <p>All the Personal task that you have added are listed below</p>
          </div>
          <div className="options">
            <div className="filter">
              <i className="bx bx-filter"></i> Filter
            </div>
            <div className="addtask" onClick={handleAddTaskClick}>
              <i className="bx bxs-add-to-queue"></i> New Task
            </div>
          </div>
          <div className="section-container">


            <div className="section">
              <div className="title">
                <div className="left">
                  <i className="bx bx-circle"></i> Not Started
                </div>
                <div className="right">
                  <i className="bx bx-plus"></i>
                </div>
              </div>
              {personalTasks
                .filter((task) => getStatusCategory(task.subtasks) === "Not Started")
                .map((task, index) => (
                  <div className="card" key={index}>
                    <div className="tag">
                      <div className="priority">
                        <i className="bx bxs-circle"></i> {task.priority}
                      </div>
                      <div className="ty">
                        <i className="bx bxs-circle"></i> Personal
                      </div>
                    </div>
                    <div className="heading">{task.title}</div>
                    <div className="desc">{task.description}</div>
                    <div className="selec">
                      <div className="users">
                        <div className="person">
                          <img
                            src={`http://localhost:3001/${task.username}.jpg`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="edit">
                      <Link to={`/ViewPersonal/${task.id}`} className="view-btn">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="section">
              <div className="title">
                <div className="left">
                  <i className="bx bx-circle"></i> In Progress
                </div>
                <div className="right">
                  <i className="bx bx-plus"></i>
                </div>
              </div>
              {personalTasks
                .filter((task) => getStatusCategory(task.subtasks) === "In Progress")
                .map((task, index) => (
                  <div className="card" key={index}>
                    <div className="tag">
                      <div className="priority">
                        <i className="bx bxs-circle"></i> {task.priority}
                      </div>
                      <div className="ty">
                        <i className="bx bxs-circle"></i> Personal
                      </div>
                    </div>
                    <div className="heading">{task.title}</div>
                    <div className="desc">{task.description}</div>
                    <div className="selec">
                      <div className="users">
                        <div className="person">
                          <img
                            src={`http://localhost:3001/${task.username}.jpg`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="edit">
                        <Link to={`/ViewPersonal/${task.id}`} className="view-btn">
                          View
                        </Link>

                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="section">
              <div className="title">
                <div className="left">
                  <i className="bx bx-circle"></i> Completed
                </div>
                <div className="right">
                  <i className="bx bx-plus"></i>
                </div>
              </div>
              {personalTasks
                .filter((task) => getStatusCategory(task.subtasks) === "Completed")
                .map((task, index) => (
                  <div className="card" key={index}>
                    <div className="tag">
                      <div className="priority">
                        <i className="bx bxs-circle"></i> {task.priority}
                      </div>
                      <div className="ty">
                        <i className="bx bxs-circle"></i> Personal
                      </div>
                    </div>
                    <div className="heading">{task.title}</div>
                    <div className="desc">{task.description}</div>
                    <div className="selec">
                      <div className="users">
                        <div className="person">
                          <img
                            src={`http://localhost:3001/${task.username}.jpg`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="edit">
                      <Link to={`/ViewPersonal/${task.id}`} className="view-btn">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isAddTaskOpen && (
        <AddPersonalTask onClose={() => setIsAddTaskOpen(false)} />
      )}
    </>
  );
};

export default Personaltask;
