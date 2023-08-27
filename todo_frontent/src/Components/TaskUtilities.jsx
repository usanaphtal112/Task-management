import axios from "axios";

export const fetchTasks = async (setTasks) => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/tasks/");
    setTasks(response.data);
    console.log(response);
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
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/tasks/${taskId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    return null;
  }
};
