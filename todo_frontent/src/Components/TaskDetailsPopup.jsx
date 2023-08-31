import React, { useState } from "react";
import { updateTask, deleteTask } from "./TaskUtilities";
import "./Styles/TaskDetailsPopup.css";

const TaskDetailsPopup = ({ task, onClose, onTaskUpdated, onTaskDeleted }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateTask(editedTask.id, editedTask);
      setIsEditing(false);
      onTaskUpdated(editedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (shouldDelete) {
      try {
        await deleteTask(task.id);
        onClose();
        onTaskDeleted();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
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
    <div className="popup">
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
