import { validationResult } from "express-validator";
import { racerService } from "../services/racer.service.js";
import uploadHelper from "../helpers/upload.helper.js";

export const racerController = {
  getAllRacer: async (req, res, next) => {
    try {
      const racerId = req.racer.id;
      const data = await racerService.getAllRacer(racerId);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getRacerById: async (req, res, next) => {
    try {
      const data = await racerService.getRacerById(req.params.id);
      res.status(200).json({
        success: true,
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  updateRacer: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
      }

      const data = await racerService.updateRacer(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Update racer success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteRacer: async (req, res, next) => {
    try {
      const data = await racerService.deleteRacer(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete racer success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },

  uploadAvatar: async (req, res, next) => {
    try {
      const racerId = req.racerData.id;
      const imgURL = await uploadHelper.uploadImage(req.files.avatar[0], next);
      const data = await racerService.uploadAvatar(imgURL, racerId, next);
      res.status(200).json({
        success: true,
        message: "Upload avatar success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },

  getCurrentRacer: async (req, res, next) => {
    try {
      const racerId = req.racerData.id;
      const data = await racerService.getCurrentRacer(racerId);
      res.status(200).json({
        success: true,
        message: "Get current racer success",
        result: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
