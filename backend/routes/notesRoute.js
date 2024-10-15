import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getNotes).post(protect, createNote);
router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

// router.get("/", protect, getNotes);
// router.post("/", protect, createNote);
// router.put("/:id", protect, updateNote);
// router.delete("/:id", protect, deleteNote);

export default router;
