import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskDetails } from "./TaskUtilities";
import "./TaskDetails.css"; // Import your CSS for styling

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      const details = await fetchTaskDetails(id);
      setTask(details);
    }

    fetchDetails();
  }, [id]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Description: {task.description}</p>

      {/* Button to open the details modal */}
      <button
        className="show-details-button"
        onClick={() => setShowModal(true)}
      >
        Show Details
      </button>

      {/* The modal overlay */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Task Details</h2>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Description: {task.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
