import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import notesReducer from "../features/notes/notesSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export default store;
