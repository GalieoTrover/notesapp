import express from "express";
import userRoute from "./routes/userRoute.js";
import notesRoute from "./routes/notesRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoute);
app.use("/api/notes", notesRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
