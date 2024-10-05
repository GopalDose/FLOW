import React, { useState } from "react";
import "./AddPersonalTask.css";
import swal from "sweetalert";

const AddPersonalTask = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtasks: [],
    priority: "High",
    dueDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const username = sessionStorage.getItem("loggedin");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: "", status: "Not Started" }],
    });
  };

  const handleSubtaskChange = (e, index) => {
    const { name, value } = e.target;
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
  
    // Inside the handleSubmit function in AddPersonalTask.jsx
  
    const formDataWithUsername = { ...formData, username };
  
    fetch("http://localhost:3001/savePersonalTask", {
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
          <div className="heading">Add New Personal Task</div>
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
                  <label htmlFor="">Subtask Desc</label>
                  <input
                    type="text"
                    name="title"
                    value={subtask.title}
                    onChange={(e) => handleSubtaskChange(e, index)}
                    required
                  />
                  <br/>
                  <br/>
                  <label htmlFor="">Subtask status</label>

                  <select
                    name="status"
                    value={subtask.status}
                    onChange={(e) => handleSubtaskChange(e, index)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
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

export default AddPersonalTask;
