import React, { useState } from "react";
import TaskDetailsPopup from "./TaskDetailsPopup";

import "./Styles/TaskCard.css";

const TaskCard = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="card" onClick={openPopup}>
        <h3 className="title">{task.title}</h3>
      </div>
      {isPopupOpen && (
        <TaskDetailsPopup
          task={task}
          onClose={closePopup}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />

        // <TaskDetailsPopup
        //   task={task}
        //   onClose={closePopup}
        //   onTaskUpdated={onTaskUpdated}
        //   onTaskDeleted={(deletedTask) => {
        //     onTaskDeleted(deletedTask);
        //     closePopup();
        //   }}
        // />
      )}
    </div>
  );
};

export default TaskCard;
