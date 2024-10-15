import Notes from "../models/notesModel.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

export const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.status(200).json(notes);
});

export const createNote = expressAsyncHandler(async (req, res) => {
  const { body } = req.body;

  if (!body) {
    res.status(400);
    throw new Error("Please provide a title");
  }

  const note = await Notes.create({
    body: req.body.body,
    user: req.user.id,
  });
  res.status(200).json(note);
});

export const updateNote = expressAsyncHandler(async (req, res) => {
  const noteId = req.params.id;

  const note = await Notes.findById(noteId);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  //   const user = await User.findById(req.user.id);

  if (note.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  if (!req.body) {
    res.status(400);
    throw new Error("Please provide updated text");
  }

  const updatedNote = await Notes.findByIdAndUpdate(noteId, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

export const deleteNote = expressAsyncHandler(async (req, res) => {
  const noteId = req.params.id;

  const note = await Notes.findById(noteId);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  const user = await User.findById(req.user.id);

  if (note.user.toString() !== user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  await note.deleteOne({ noteId });
  res.status(200).json(`Note deleted: ${note.id}`);
});
