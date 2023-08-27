import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "0",
  };

  return (
    <div style={cardStyle}>
      <Link
        to={`/tasks/${task.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3 style={titleStyle}>{task.title}</h3>
      </Link>
    </div>
  );
};

export default TaskCard;
