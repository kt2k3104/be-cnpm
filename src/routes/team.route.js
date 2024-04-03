import express from "express";
import { teamController } from "../controllers/team.controller.js";
import isAuth from "../middlewares/AuthMiddleware.js";
const teamRoute = express.Router();

const { getAllTeam, getTeamById, updateTeam, deleteTeam } = teamController;

// /api/teams
teamRoute.get("", isAuth, getAllTeam);

// /api/teams/:id
teamRoute.get("/:id", isAuth, getTeamById);

// /api/teams/:id
teamRoute.put("/:id", isAuth, updateTeam);

// /api/teams/:id
teamRoute.delete("/:id", isAuth, deleteTeam);

// /api/teams/upload-logo
teamRoute.post("/upload-logo", isAuth, uploadLogo);

export default teamRoute;
