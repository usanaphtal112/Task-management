import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TaskCard from "./TaskCard";
import AddTaskPopup from "./AddTaskPopup";
import {
  fetchTasks,
  updateTaskOnDrop,
  fetchTaskboardStages,
  deleteTaskboardStage,
  updateTaskboardStage,
  createTaskboardStage,
} from "./TaskUtilities";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import FormDialogBox from "./FormDialogBox";
import "./Styles/TaskBoard.css";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskStages, setTaskStages] = useState([]);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [showAddStageModal, setShowAddStageModal] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [newStageName, setNewStageName] = useState("");

  const [editingStageId, setEditingStageId] = useState(null);
  const [showAddStageDialog, setShowAddStageDialog] = useState(false);

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedStageToDelete, setSelectedStageToDelete] = useState(null);

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
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = async () => {
    try {
      await fetchTasks(setTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStageOptionsClick = (stageId) => {
    if (selectedStageId === stageId) {
      setSelectedStageId(null);
    } else {
      setSelectedStageId(stageId);
    }
  };

  const handleEditStage = (stageId) => {
    setEditingStageId(stageId);
  };

  const handleEditStageConfirmed = async (newName) => {
    try {
      const updatedStage = await updateTaskboardStage(editingStageId, {
        name: newName,
      });
      setTaskStages((prevStages) =>
        prevStages.map((stage) =>
          stage.id === updatedStage.id ? updatedStage : stage
        )
      );
    } catch (error) {
      console.error("Error updating stage:", error);
    } finally {
      setEditingStageId(null);
    }
  };

  const handleDeleteStage = (stageId) => {
    setSelectedStageToDelete(stageId);
    setDeleteConfirmationOpen(true);
  };
  const handleDeleteStageConfirmed = async () => {
    try {
      await deleteTaskboardStage(selectedStageToDelete);
      setTaskStages((prevStages) =>
        prevStages.filter((stage) => stage.id !== selectedStageToDelete)
      );
    } catch (error) {
      console.error("Error deleting stage:", error);
    } finally {
      // Close the delete confirmation dialog
      setDeleteConfirmationOpen(false);
      setDropdownOpen(false); // Close the dropdown menu
    }
  };

  const handleAddStage = async () => {
    try {
      if (newStageName.trim() === "") {
        alert("Please enter a valid stage name.");
        return;
      }

      const newStage = await createTaskboardStage(newStageName);

      setTaskStages((prevStages) => [...prevStages, newStage]);
      setNewStageName("");
      setShowAddStageDialog(false);
    } catch (error) {
      console.error("Error adding new stage:", error);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
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
                  <div className="stage-header">
                    <h2>{stage.name}</h2>
                    <div className="stage-options">
                      <div
                        className="ellipsis"
                        onClick={() => handleStageOptionsClick(stage.id)}
                      >
                        &gt;&gt;&gt;
                      </div>
                      {selectedStageId === stage.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => handleEditStage(stage.id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteStage(stage.id)}>
                            Delete
                          </button>
                        </div>
                      )}
                      {/* Edit Stage Dialog */}
                      {editingStageId && (
                        <FormDialogBox
                          open={Boolean(editingStageId)}
                          onClose={() => setEditingStageId(null)}
                          onConfirm={handleEditStageConfirmed}
                          initialValue={
                            taskStages.find(
                              (stage) => stage.id === editingStageId
                            )?.name
                          }
                        />
                      )}
                      <DeleteConfirmationDialog
                        open={isDeleteConfirmationOpen}
                        onClose={() => setDeleteConfirmationOpen(false)}
                        onConfirm={handleDeleteStageConfirmed}
                      />
                    </div>
                  </div>

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
                              onTaskUpdated={handleTaskUpdated}
                              onTaskDeleted={handleTaskDeleted}
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
          <div className="add-stage-button-container">
            <button
              className="add-stage-button"
              onClick={() => setShowAddStageDialog(true)} // Open the dialog
            >
              Add New Stage
            </button>
          </div>
        </div>
        {showAddTaskPopup && (
          <AddTaskPopup
            stage={selectedStage}
            onClose={() => {
              setSelectedStage(null);
              setShowAddTaskPopup(false);
            }}
            onTaskAdded={handleTaskAdded}
          />
        )}
      </div>

      {showAddStageModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Stage</h2>
            <input
              type="text"
              placeholder="Stage Name"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
            />
            <button onClick={handleAddStage}>Add Stage</button>
            <button onClick={() => setShowAddStageModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Add New Stage dialog */}
      {showAddStageDialog && (
        <div className="add-stage-dialog">
          <div className="modal-content">
            <h2>Add New Stage</h2>
            <input
              type="text"
              placeholder="Stage Name"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
            />
            <button onClick={handleAddStage}>Add Stage</button>
            <button onClick={() => setShowAddStageDialog(false)}>Cancel</button>
          </div>
        </div>
      )}
    </DragDropContext>
  );
};

export default TaskBoard;
