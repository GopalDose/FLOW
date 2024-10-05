import React, { useState, useEffect } from "react";
import "./AddTeamTask.css";
import swal from "sweetalert";

const AddTeamTask = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtasks: [],
    priority: "High",
    dueDate: "",
  });
  const [memberUsernames, setMemberUsernames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/getUsernames")
      .then((response) => response.json())
      .then((data) => {
        setMemberUsernames(data);
      })
      .catch((error) => {
        console.error("Error fetching member usernames:", error);
      });
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const username = sessionStorage.getItem("loggedin");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: "", status: "Not Started", teamMemberId: "" }],
    });
  };

  const handleSubtaskChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index][name] = value;
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const handleTeamMemberChange = (index, name, value) => {
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index][name] = value;
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const formDataWithUsername = { ...formData, username, subtasks: formData.subtasks.map(({ title, status, teamMemberId }) => ({ title, status, teamMemberId })) };

    fetch("http://localhost:3001/saveTeamTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithUsername),
    })
      .then((response) => {
        if (response.ok) {
          swal({
            icon: "success",
            title: "Task added successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            onClose();
          });
        } else {
          throw new Error("Failed to save task");
        }
      })
      .catch((error) => {
        console.error("Error saving task:", error);
        swal({
          icon: "error",
          title: "Oops...",
          text: "Failed to add task!",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <div className="addTaskForm">
        <div className="form-container">
          <div className="heading">Add New Team Task</div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                cols="30"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label>Subtasks</label>
              {formData.subtasks.map((subtask, index) => (
                <div key={index} className="subtask">
                  <label>Subtask Desc</label>
                  <input
                    type="text"
                    name="title"
                    value={subtask.title}
                    onChange={(e) => handleSubtaskChange(e, index)}
                    required
                  />
                  <br />
                  <br />
                  <label>Subtask status</label>
                  <select
                    name="status"
                    value={subtask.status}
                    onChange={(e) => handleSubtaskChange(e, index)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <br />
                  <br />
                  <label>Assign Team Member</label>
                  <select
                    name="teamMemberId"
                    value={subtask.teamMemberId}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "teamMemberId", e.target.value)
                    }
                    required
                  >
                    <option value="">Select</option>
                    {memberUsernames.map((username, idx) => (
                      <option key={idx} value={username}>
                        {username}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button type="button" className="addsubtask" onClick={handleAddSubtask}>
                Add Subtask
              </button>
            </div>
            <div className="form-control">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-control">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <input className="submit-btn" type="submit" value="Add Task" />
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTeamTask;
