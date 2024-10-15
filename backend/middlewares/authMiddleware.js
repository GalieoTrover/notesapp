import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      console.log(req.user);
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Cannot authorize, No token");
  }
});

export default protect;
