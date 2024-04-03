import db from "../models/index.js";
import { renameKeys } from "../helpers/renameKeys.helper.js";

export const resultService = {
  getAllResult: async (resultId) => {
    const currentResult = await db.Result.findOne({
      where: {
        id: resultId,
      },
      attributes: { exclude: ["password", "refresh_token"] },
    });
    if (currentResult.role !== "admin") {
      return "You are not admin";
    }
    const data = await db.Result.findAll();
    return data;
  },
  getResultById: async (id) => {
    const result = await db.Result.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["password", "refresh_token"] },
      // attributes: ["email", "first_name", "last_name", "avatar", "role"],
      include: [
        {
          model: db.Song,
          as: "result_songs",
        },
        {
          model: db.Song,
          as: "result_songFavorite",
          attributes: { exclude: ["resultId", "result_favorite_songs_song"] },
        },
      ],
    });
    if (!result) {
      return "Result not found";
    }
    const newResult = renameKeys(result.dataValues, {
      result_songs: "songs",
      result_songFavorite: "favoriteSongs",
    });

    return newResult;
  },
  updateResult: async (id, body) => {
    const { first_name, last_name, email } = body;
    const data = await db.Result.update(
      {
        first_name,
        last_name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return data;
  },
  deleteResult: async (id) => {
    const data = await db.Result.destroy({
      where: {
        id: id,
      },
    });
    return data;
  },
};
