import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import {
  fetchTasks,
  updateTaskOnDrop,
  fetchTaskboardStages,
} from "./TaskUtilities";
import "./TaskBoard.css";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStages, setTaskStages] = useState([]);

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
        category: parseInt(destinationStatus), // Update task category
      });

      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, category: parseInt(destinationStatus) }
          : task
      );
      setTasks(updatedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        <h2>Task Management Projects</h2>
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
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
