import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewPersonal.css";
import swal from "sweetalert";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ViewPersonal = () => {
  const { taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    fetchTaskDetails(taskId);
  }, [taskId]);

  const fetchTaskDetails = (taskId) => {
    fetch(`http://localhost:3001/getTaskDetails/${taskId}`)
      .then((response) => response.json())
      .then((data) => {
        // Parse the subtasks string to JSON
        data.subtasks = JSON.parse(data.subtasks);
        setTaskDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching task details:", error);
      });
  };

  const handleStatusChange = (index, event) => {
    const newSubtasks = [...taskDetails.subtasks];
    newSubtasks[index].status = event.target.value;
    setTaskDetails({
      ...taskDetails,
      subtasks: newSubtasks,
    });
  };

  const handleCancel = () => {
    // Redirect to /personal-task
    history.push("/personal-task");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the task details in the database
    fetch(`http://localhost:3001/updateSubtasks/${taskDetails.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subtasks: taskDetails.subtasks }),
    })
      .then((response) => {
        console.log("Response from server:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Updated Task Details:", data);
        // Show success SweetAlert
        swal({
          title: "Success!",
          text: "Task details updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to /personal-task
          history.push("/personal-task");
        });
      })
      .catch((error) => {
        console.error("Error updating task details:", error);
      });
  };

  if (!taskDetails) {
    return <div>Loading...</div>;
  }



  return (
    <div className="main-container">
      <div className="cont">
        <div className="displaydiv">
          <h2>{taskDetails.title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="">Title</label>
              <input type="text" value={taskDetails.title} readOnly />
            </div>
            <div className="form-control">
              <label htmlFor="">Description</label>
              <textarea
                value={taskDetails.description}
                rows="10"
                readOnly
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="">Due Date</label>
              <input type="text" value={taskDetails.dueDate} readOnly />
            </div>
            <div className="group-control">
              {taskDetails.subtasks.map((subtask, index) => (
                <div key={index} className="form-control">
                  <label>{`Subtask ${index + 1}`}</label>
                  <input type="text" value={subtask.title} readOnly />
                  <label>Status</label>
                  <select
                    name={`status-${index}`}
                    value={subtask.status}
                    onChange={(e) => handleStatusChange(index, e)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Progress">Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              ))}
            </div>
            <input className="submit-btn" type="submit" value="Save Profile" />

          </form>
          
        </div>
      </div>
    </div>
  );
};

export default ViewPersonal;
