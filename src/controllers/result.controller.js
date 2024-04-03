import { validationResult } from "express-validator";
import { resultService } from "../services/result.service.js";

export const resultController = {
  getAllResult: async (req, res, next) => {
    try {
      const resultId = req.result.id;
      const data = await resultService.getAllResult(resultId);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getResultById: async (req, res, next) => {
    try {
      const data = await resultService.getResultById(req.params.id);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateResult: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
      }

      const data = await resultService.updateResult(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Update result success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteResult: async (req, res, next) => {
    try {
      const data = await resultService.deleteResult(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete result success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
