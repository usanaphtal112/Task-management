import React, { useState } from "react";
import axios from "axios";

const EditTaskForm = ({ task, onUpdateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description };
    await axios.put(`/api/tasks/${task.id}/`, updatedTask);
    onUpdateTask(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTaskForm;
