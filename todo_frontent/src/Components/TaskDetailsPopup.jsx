import React, { useState } from "react";
import { updateTask, deleteTask } from "./TaskUtilities";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import "./Styles/TaskDetailsPopup.css";

const TaskDetailsPopup = ({ task, onClose, onTaskUpdated, onTaskDeleted }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);

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

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteTask(task.id);
      onTaskDeleted();
      onClose();
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust options as needed
  };

  return (
    <div className="popup">
      {isEditing ? (
        <>
          <div className="edit-input">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="edit-input">
            <textarea
              value={editedTask.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{task.title}</h2>
          <div>
            <p>Description:</p>
            <p className="description">{task.description}</p>
          </div>
          <div>
            <p>Created At: {formatTimestamp(task.created_at)}</p>
            <p>Updated At: {formatTimestamp(task.updated_at)}</p>
          </div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Close</button>
        </>
      )}
      <DeleteConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
};

export default TaskDetailsPopup;
