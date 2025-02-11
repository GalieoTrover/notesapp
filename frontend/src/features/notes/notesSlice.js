import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesService } from "./notesService";

const initialState = {
  notesData: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const getNotesThunk = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return notesService.getNotes();
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNoteThunk = createAsyncThunk(
  "notes/createNote",
  async (data, thunkAPI) => {
    try {
      return notesService.createNote(data);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Handlers to getNotes
      .addCase(getNotesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotesThunk.fulfilled, (state, action) => {
        state.notesData = action.payload;
        console.log(action);
        state.isLoading = false;
      })
      .addCase(getNotesThunk.rejected, (state) => {
        state.isLoading = true;
      })

      // Handlers to createNote
      .addCase(createNoteThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createNoteThunk.fulfilled, (state, action) => {
        state.notesData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createNoteThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default notesSlice.reducer;
