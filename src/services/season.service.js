import db from "../models/index.js";
import { renameKeys } from "../helpers/renameKeys.helper.js";

export const seasonService = {
  getAllSeason: async (seasonId) => {
    const currentSeason = await db.Season.findOne({
      where: {
        id: seasonId,
      },
      attributes: { exclude: ["password", "refresh_token"] },
    });
    if (currentSeason.role !== "admin") {
      return "You are not admin";
    }
    const data = await db.Season.findAll();
    return data;
  },
  getSeasonById: async (id) => {
    const season = await db.Season.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["password", "refresh_token"] },
      // attributes: ["email", "first_name", "last_name", "avatar", "role"],
      include: [
        {
          model: db.Song,
          as: "season_songs",
        },
        {
          model: db.Song,
          as: "season_songFavorite",
          attributes: { exclude: ["seasonId", "season_favorite_songs_song"] },
        },
      ],
    });
    if (!season) {
      return "Season not found";
    }
    const newSeason = renameKeys(season.dataValues, {
      season_songs: "songs",
      season_songFavorite: "favoriteSongs",
    });

    return newSeason;
  },
  updateSeason: async (id, body) => {
    const { first_name, last_name, email } = body;
    const data = await db.Season.update(
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
  deleteSeason: async (id) => {
    const data = await db.Season.destroy({
      where: {
        id: id,
      },
    });
    return data;
  },
};
