import db from "../models/index.js";
import { renameKeys } from "../helpers/renameKeys.helper.js";

export const raceService = {
  getAllRace: async (raceId) => {
    const currentRace = await db.Race.findOne({
      where: {
        id: raceId,
      },
      attributes: { exclude: ["password", "refresh_token"] },
    });
    if (currentRace.role !== "admin") {
      return "You are not admin";
    }
    const data = await db.Race.findAll();
    return data;
  },
  getRaceById: async (id) => {
    const race = await db.Race.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["password", "refresh_token"] },
      // attributes: ["email", "first_name", "last_name", "avatar", "role"],
      include: [
        {
          model: db.Song,
          as: "race_songs",
        },
        {
          model: db.Song,
          as: "race_songFavorite",
          attributes: { exclude: ["raceId", "race_favorite_songs_song"] },
        },
      ],
    });
    if (!race) {
      return "Race not found";
    }
    const newRace = renameKeys(race.dataValues, {
      race_songs: "songs",
      race_songFavorite: "favoriteSongs",
    });

    return newRace;
  },
  updateRace: async (id, body) => {
    const { first_name, last_name, email } = body;
    const data = await db.Race.update(
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
  deleteRace: async (id) => {
    const data = await db.Race.destroy({
      where: {
        id: id,
      },
    });
    return data;
  },
};
