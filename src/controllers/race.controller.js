import { validationResult } from "express-validator";
import { raceService } from "../services/race.service.js";

export const raceController = {
  getAllRace: async (req, res, next) => {
    try {
      const raceId = req.race.id;
      const data = await raceService.getAllRace(raceId);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getRaceById: async (req, res, next) => {
    try {
      const data = await raceService.getRaceById(req.params.id);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateRace: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
      }

      const data = await raceService.updateRace(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Update race success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteRace: async (req, res, next) => {
    try {
      const data = await raceService.deleteRace(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete race success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
