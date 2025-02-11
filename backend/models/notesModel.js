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
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    body: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notes", notesSchema);
