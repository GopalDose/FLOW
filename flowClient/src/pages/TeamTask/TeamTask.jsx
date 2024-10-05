import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TeamTask.css";
import AddTeamTask from "../AddTeamTask/AddTeamTask";
import Sidebar from "../Sidebar/Sidebar";

const TeamTask = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [TeamTasks, setTeamTasks] = useState([]);

  useEffect(() => {
    fetchTeamTasks();
  }, []);

  const fetchTeamTasks = () => {
    const username = sessionStorage.getItem("loggedin");
    fetch("http://localhost:3001/getTeamTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTeamTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching team tasks:", error);
      });
  };
  

  useEffect(() => {
    const intervalId = setInterval(fetchTeamTasks, 5000); // Polling every 5 seconds
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const handleAddTaskClick = () => {
    setIsAddTaskOpen(true);
  };

  const getStatusCategory = (subtasks, username) => {
    if (!subtasks) {
      return "Not Started";
    }
  
    const parsedSubtasks = JSON.parse(subtasks);
    const hasNotStarted = parsedSubtasks.some((subtask) => subtask.status === "Not Started" && subtask.username === username);
    const hasInProgress = parsedSubtasks.some((subtask) => subtask.status === "In Progress" && subtask.username === username);
    const hasCompleted = parsedSubtasks.every((subtask) => subtask.status === "Completed" && subtask.username === username);
  
    if (hasNotStarted) {
      return "Not Started";
    } else if (hasInProgress) {
      return "In Progress";
    } else if (hasCompleted) {
      return "Completed";
    } else {
      return "Unknown";
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
            <span>Task</span>/ Team Task
          </div>
          <div className="headper">
            <h2>Team Tasks</h2>
            <p>All the Team task that you have added are listed below</p>
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
              {TeamTasks
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
                      <Link to={`/ViewTeam/${task.id}`} className="view-btn">
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
              {TeamTasks
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
                        <Link  to={`/ViewTeam/${task.id}`} className="view-btn">
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
              {TeamTasks
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
                      <Link to={`/ViewTeam/${task.id}`} className="view-btn">
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
        <AddTeamTask onClose={() => setIsAddTaskOpen(false)} />
      )}
    </>
  );
};

export default TeamTask;
