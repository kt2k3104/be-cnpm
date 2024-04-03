import express from "express";
import { raceController } from "../controllers/race.controller.js";
import isAuth from "../middlewares/AuthMiddleware.js";
const raceRoute = express.Router();

const { getAllRace, getRaceById, updateRace, deleteRace } = raceController;

// /api/races
raceRoute.get("", isAuth, getAllRace);

// /api/races/:id
raceRoute.get("/:id", isAuth, getRaceById);

// /api/races/:id
raceRoute.put("/:id", isAuth, updateRace);

// /api/races/:id
raceRoute.delete("/:id", isAuth, deleteRace);

export default raceRoute;
