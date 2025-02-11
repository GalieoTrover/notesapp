import axiosInstance from "../../app/axiosCore";
import { NOTES_POINT } from "../../app/constants";

const getNotes = async () => {
  const response = axiosInstance.get(NOTES_POINT);

  return response?.data;
};

const createNote = async () => {
  const response = await axiosInstance.post(NOTES_POINT);

  return response?.data;
};

export const notesService = { getNotes, createNote };
