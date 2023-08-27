import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { fetchTasks, categorizeTasks } from "./TaskUtilities";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(setTasks);
  }, []);

  const statusCategories = categorizeTasks(tasks);

  return (
    <div className="task-board">
      <h2>Task Management Projects</h2>
      <div className="status-row">
        <div className="status-column">
          <h2>To Do</h2>
          {statusCategories["To Do"].map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div className="status-column">
          <h2>Doing</h2>
          {statusCategories.Doing.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div className="status-column">
          <h2>Done</h2>
          {statusCategories.Done.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
