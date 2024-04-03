import express from "express";
import { resultController } from "../controllers/result.controller.js";
import isAuth from "../middlewares/AuthMiddleware.js";
const resultRoute = express.Router();

const { getAllResult, getResultById, updateResult, deleteResult } =
  resultController;

// /api/results
resultRoute.get("", isAuth, getAllResult);

// /api/results/:id
resultRoute.get("/:id", isAuth, getResultById);

// /api/results/:id
resultRoute.put("/:id", isAuth, updateResult);

// /api/results/:id
resultRoute.delete("/:id", isAuth, deleteResult);

export default resultRoute;
