import express from "express";
import { seasonController } from "../controllers/season.controller.js";
import isAuth from "../middlewares/AuthMiddleware.js";
const seasonRoute = express.Router();

const { getAllSeason, getSeasonById, updateSeason, deleteSeason } =
  seasonController;

// /api/seasons
seasonRoute.get("", isAuth, getAllSeason);

// /api/seasons/:id
seasonRoute.get("/:id", isAuth, getSeasonById);

// /api/seasons/:id
seasonRoute.put("/:id", isAuth, updateSeason);

// /api/seasons/:id
seasonRoute.delete("/:id", isAuth, deleteSeason);

export default seasonRoute;
