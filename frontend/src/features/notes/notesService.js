import axiosInstance from "../../app/axiosCore";
import { NOTES_POINT } from "../../app/constants";

const getNotes = async () => {
  const response = await axiosInstance.get(NOTES_POINT);

  return response?.data;
};

const createNote = async (data) => {
  const response = await axiosInstance.post(NOTES_POINT, data);

  return response?.data;
};

const updateNote = async (noteId, data) => {
  const response = await axiosInstance.put(NOTES_POINT + noteId, data);

  return response?.data;
};

const deleteNote = async (noteId) => {
  const response = await axiosInstance.delete(NOTES_POINT + noteId);

  return response?.data;
};

export const notesService = { getNotes, createNote, updateNote, deleteNote };
