import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesService } from "./notesService";

const initialState = {
  notesData: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return notesService.getNotes(token);
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
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notesData = action.payload;
        state.isLoading = false;
      })
      .addCase(getNotes.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default notesSlice.reducer;
