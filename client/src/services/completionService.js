import axios from "axios";

const API = "http://localhost:5009/api/completions";

export const submitCompletion = async (formData) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/submit`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};