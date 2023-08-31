import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/";

export const fetchTaskboardStages = async (setStages) => {
  try {
    const response = await axios.get(`${API_BASE_URL}taskboard_stage/`);
    setStages(response.data);
    // console.log(response);
  } catch (error) {
    console.error("Error fetching taskboard stages:", error);
  }
};

export const fetchTaskboardStageDetails = async (stageId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}taskboard_stage/${stageId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching taskboard stage details:", error);
    return null;
  }
};

export const updateTaskboardStage = async (stageId, newData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}taskboard_stage/${stageId}/`,
      newData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating taskboard stage:", error);
    throw error;
  }
};

export const deleteTaskboardStage = async (stageId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}taskboard_stage/${stageId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting taskboard stage:", error);
    throw error;
  }
};

export const fetchTasks = async (setTasks) => {
  try {
    const response = await axios.get(`${API_BASE_URL}tasks/`);
    setTasks(response.data);
    // console.log(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const categorizeTasks = (tasks) => {
  const statusCategories = {
    "To Do": [],
    Doing: [],
    Done: [],
  };

  tasks.forEach((task) => {
    if (statusCategories.hasOwnProperty(task.status)) {
      statusCategories[task.status].push(task);
    }
  });

  return statusCategories;
};

export const fetchTaskDetails = async (taskId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    return null;
  }
};

export const updateTask = async (taskId, newData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}tasks/${taskId}/`,
      newData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const updateTaskOnDrop = async (taskId, newData) => {
  try {
    const taskToUpdate = await fetchTaskDetails(taskId);
    const updatedTask = { ...taskToUpdate, ...newData };
    const response = await axios.put(
      `${API_BASE_URL}tasks/${taskId}/`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const addTask = async (newTaskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}tasks/`, newTaskData);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};
