import express from "express";
import { racerController } from "../controllers/racer.controller.js";
import isAuth from "../middlewares/AuthMiddleware.js";
import passport from "passport";
const racerRoute = express.Router();

const {
  getAllRacer,
  getRacerById,
  updateRacer,
  deleteRacer,
  uploadAvatar,
  getCurrentRacer,
} = racerController;

// /api/racers
racerRoute.get("", isAuth, getAllRacer);

// /api/racers/:id
racerRoute.get("/:id", isAuth, getRacerById);

// /api/racers/:id
racerRoute.put("/:id", isAuth, updateRacer);

// /api/racers/:id
racerRoute.delete("/:id", isAuth, deleteRacer);

// /api/racers/upload-avt
racerRoute.post("/upload-avt", isAuth, uploadAvatar);

// /api/racers/curr/info
racerRoute.get("/curr/info", isAuth, getCurrentRacer);

export default racerRoute;
