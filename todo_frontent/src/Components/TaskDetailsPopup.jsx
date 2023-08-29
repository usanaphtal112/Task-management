import React, { useState } from "react";
import { updateTask, deleteTask } from "./TaskUtilities"; // Import your updateTask and deleteTask functions

const TaskDetailsPopup = ({ task, onClose, onTaskUpdated }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateTask(editedTask.id, editedTask);
      setIsEditing(false);
      onTaskUpdated(); // Trigger the task re-fetch
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onClose();
      onTaskUpdated(); // Trigger the task re-fetch
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  return (
    <div style={popupStyle}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
};

export default TaskDetailsPopup;
