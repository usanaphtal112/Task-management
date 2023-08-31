import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import AddTaskPopup from "./AddTaskPopup";
import {
  fetchTasks,
  updateTaskOnDrop,
  fetchTaskboardStages,
} from "./TaskUtilities";
import "./Styles/TaskBoard.css";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStages, setTaskStages] = useState([]);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    fetchTasks(setTasks);
    fetchTaskboardStages(setTaskStages);
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    if (sourceStatus !== destinationStatus) {
      const taskId = parseInt(result.draggableId, 10);

      await updateTaskOnDrop(taskId, {
        category: parseInt(destinationStatus),
      });

      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, category: parseInt(destinationStatus) }
          : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleAddTask = (stage) => {
    setSelectedStage(stage);
    setShowAddTaskPopup(true);
  };

  const handleTaskAdded = (newTask) => {
    // setTasks([...tasks, newTask]);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (deletedTask) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== deletedTask.id)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {/* <h2>Task Management Projects</h2> */}
        <div className="status-row">
          {taskStages.map((stage) => (
            <Droppable
              key={stage.id}
              droppableId={stage.id.toString()}
              direction="vertical"
            >
              {(provided) => (
                <div
                  className="status-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{stage.name}</h2>
                  {tasks
                    .filter((task) => task.category === stage.id)
                    .map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onTaskUpdated={handleTaskUpdated} // Pass onTaskUpdated function
                              onTaskDeleted={handleTaskDeleted} // Pass onTaskDeleted function
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <button onClick={() => handleAddTask(stage)}>
                    Add New Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
        {showAddTaskPopup && (
          <AddTaskPopup
            stage={selectedStage} // Pass the selected stage here
            onClose={() => {
              setSelectedStage(null); // Reset selected stage
              setShowAddTaskPopup(false);
            }}
            onTaskAdded={handleTaskAdded}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
