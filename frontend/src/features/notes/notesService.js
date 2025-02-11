import axiosInstance from "../../app/axiosCore";
const API_URL = "/api/notes/";

const getNotes = async () => {
  const response = axiosInstance.get(API_URL);

  return response?.data;
};

const createNote = async () => {
  const response = await axiosInstance.post(API_URL);

  return response?.data;
};

export const notesService = { getNotes, createNote };
