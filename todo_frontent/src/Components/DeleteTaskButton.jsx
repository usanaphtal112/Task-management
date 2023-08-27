import React from "react";
import axios from "axios";

const DeleteTaskButton = ({ taskId, onDeleteTask }) => {
  const handleDelete = async () => {
    await axios.delete(`/api/tasks/${taskId}/`);
    onDeleteTask(taskId);
  };

  return <button onClick={handleDelete}>Delete Task</button>;
};

export default DeleteTaskButton;
