// AddTaskPopup.jsx

import React, { useState } from "react";
import { addTask } from "./TaskUtilities";
import "./Styles/AddTaskPopup.css";

const AddTaskPopup = ({ stage, onClose, onTaskAdded }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: stage.id,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addTask(newTask);
      onTaskAdded(response);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddTaskPopup;
