import { validationResult } from "express-validator";
import { teamService } from "../services/team.service.js";
import uploadHelper from "../helpers/upload.helper.js";

export const teamController = {
  getAllTeam: async (req, res, next) => {
    try {
      const teamId = req.team.id;
      const data = await teamService.getAllTeam(teamId);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getTeamById: async (req, res, next) => {
    try {
      const data = await teamService.getTeamById(req.params.id);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateTeam: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
      }

      const data = await teamService.updateTeam(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Update team success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteTeam: async (req, res, next) => {
    try {
      const data = await teamService.deleteTeam(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete team success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },

  uploadLogo: async (req, res, next) => {
    try {
      const teamId = req.teamData.id;
      const imgURL = await uploadHelper.uploadImage(req.files.avatar[0], next);
      const data = await teamService.uploadLogo(imgURL, teamId, next);
      res.status(200).json({
        success: true,
        message: "Upload logo success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
