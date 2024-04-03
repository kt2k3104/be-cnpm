import db from "../models/index.js";
import uploadHelper from "../helpers/upload.helper.js";
import { renameKeys } from "../helpers/renameKeys.helper.js";

export const teamService = {
  getAllTeam: async (teamId) => {
    const currentTeam = await db.Team.findOne({
      where: {
        id: teamId,
      },
      attributes: { exclude: ["password", "refresh_token"] },
    });
    if (currentTeam.role !== "admin") {
      return "You are not admin";
    }
    const data = await db.Team.findAll();
    return data;
  },
  getTeamById: async (id) => {
    const team = await db.Team.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["password", "refresh_token"] },
      // attributes: ["email", "first_name", "last_name", "logo", "role"],
      include: [
        {
          model: db.Song,
          as: "team_songs",
        },
        {
          model: db.Song,
          as: "team_songFavorite",
          attributes: { exclude: ["teamId", "team_favorite_songs_song"] },
        },
      ],
    });
    if (!team) {
      return "Team not found";
    }
    const newTeam = renameKeys(team.dataValues, {
      team_songs: "songs",
      team_songFavorite: "favoriteSongs",
    });

    return newTeam;
  },
  updateTeam: async (id, body) => {
    const { first_name, last_name, email } = body;
    const data = await db.Team.update(
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
  deleteTeam: async (id) => {
    const data = await db.Team.destroy({
      where: {
        id: id,
      },
    });
    return data;
  },
  uploadLogo: async (imgURL, teamId, next) => {
    const { logo } = await db.Team.findOne({
      where: {
        id: teamId,
      },
      attributes: ["logo"],
    });

    if (logo) {
      const publicId =
        "cnpm-app-express/images" +
        logo.split("cnpm-app-express/images")[1].split(".")[0];
      await uploadHelper.deleteImage(publicId, next);
    }
    const data = await db.Team.update(
      {
        logo: imgURL,
      },
      {
        where: {
          id: teamId,
        },
      }
    );
    return data;
  },
};
