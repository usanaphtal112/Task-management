import React, { useState } from "react";
import TaskDetailsPopup from "./TaskDetailsPopup"; // Import your TaskDetailsPopup component

const TaskCard = ({ task }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0",
    cursor: "pointer", // Add cursor style to indicate clickability
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div style={cardStyle} onClick={openPopup}>
        <h3 style={titleStyle}>{task.title}</h3>
      </div>
      {isPopupOpen && <TaskDetailsPopup task={task} onClose={closePopup} />}
    </div>
  );
};

export default TaskCard;
