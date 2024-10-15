import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please provide a title for note."],
    },
    description: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notes", notesSchema);
