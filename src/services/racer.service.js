import db from "../models/index.js";
import uploadHelper from "../helpers/upload.helper.js";
import { renameKeys } from "../helpers/renameKeys.helper.js";

export const racerService = {
  getAllRacer: async (racerId) => {
    const currentRacer = await db.Racer.findOne({
      where: {
        id: racerId,
      },
      attributes: { exclude: ["password", "refresh_token"] },
    });
    if (currentRacer.role !== "admin") {
      return "You are not admin";
    }
    const data = await db.Racer.findAll();
    return data;
  },
  getRacerById: async (id) => {
    const racer = await db.Racer.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["password", "refresh_token"] },
      // attributes: ["email", "first_name", "last_name", "avatar", "role"],
      include: [
        {
          model: db.Song,
          as: "racer_songs",
        },
        {
          model: db.Song,
          as: "racer_songFavorite",
          attributes: { exclude: ["racerId", "racer_favorite_songs_song"] },
        },
      ],
    });
    if (!racer) {
      return "Racer not found";
    }
    const newRacer = renameKeys(racer.dataValues, {
      racer_songs: "songs",
      racer_songFavorite: "favoriteSongs",
    });

    return newRacer;
  },
  updateRacer: async (id, body) => {
    const { first_name, last_name, email } = body;
    const data = await db.Racer.update(
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
  deleteRacer: async (id) => {
    const data = await db.Racer.destroy({
      where: {
        id: id,
      },
    });
    return data;
  },
  uploadAvatar: async (imgURL, racerId, next) => {
    const { avatar } = await db.Racer.findOne({
      where: {
        id: racerId,
      },
      attributes: ["avatar"],
    });

    if (avatar) {
      const publicId =
        "cnpm-app-express/images" +
        avatar.split("cnpm-app-express/images")[1].split(".")[0];
      await uploadHelper.deleteImage(publicId, next);
    }
    const data = await db.Racer.update(
      {
        avatar: imgURL,
      },
      {
        where: {
          id: racerId,
        },
      }
    );
    return data;
  },
};
