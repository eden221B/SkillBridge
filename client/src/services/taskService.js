import axios from "axios";

const API = "http://localhost:5009/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(API); // ✅ correct
  return response.data;
};

export const createTask = async (taskData) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(API, taskData, { // ✅ correct
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};