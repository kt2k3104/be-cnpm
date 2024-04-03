import { validationResult } from "express-validator";
import { seasonService } from "../services/season.service.js";

export const seasonController = {
  getAllSeason: async (req, res, next) => {
    try {
      const seasonId = req.season.id;
      const data = await seasonService.getAllSeason(seasonId);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getSeasonById: async (req, res, next) => {
    try {
      const data = await seasonService.getSeasonById(req.params.id);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateSeason: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
      }

      const data = await seasonService.updateSeason(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Update season success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteSeason: async (req, res, next) => {
    try {
      const data = await seasonService.deleteSeason(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete season success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
