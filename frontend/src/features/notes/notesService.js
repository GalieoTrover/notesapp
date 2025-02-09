import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
const API_URL = "/api/notes/";

const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = axios.get(API_URL, config);
  console.log("response", response);
  return response?.data;
};

const createNote = async () => {
  const response = await axios.post(API_URL);

  console.log(response);
  return response?.data;
};

export const notesService = { getNotes, createNote };
