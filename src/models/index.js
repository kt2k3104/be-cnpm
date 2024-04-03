import { Sequelize, DataTypes } from "sequelize";
import { userSchema } from "./user.model.js";
import { raceSchema } from "./race.model.js";
import { racerSchema } from "./racer.model.js";
import { teamSchema } from "./team.model.js";
import { teamStandingsSchema } from "./teamStandings.model.js";
import { racerStandingsSchema } from "./racerStandings.model.js";
import { resultsSchema } from "./results.model.js";
import { managerSchema } from "./manager.model.js";
import { seasonSchema } from "./season.model.js";
import { committeeSchema } from "./committee.model.js";

import dotenv from "dotenv";
dotenv.config(); // su dung bien env trong file .env

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
    logging: false,
    operatorsAliases: false,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("connect to database successfully");
  })
  .catch((err) => {
    console.log("unable to connect to database", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = userSchema(sequelize, DataTypes);
db.Race = raceSchema(sequelize, DataTypes);
db.Racer = racerSchema(sequelize, DataTypes);
db.Team = teamSchema(sequelize, DataTypes);
db.TeamStandings = teamStandingsSchema(sequelize, DataTypes);
db.RacerStandings = racerStandingsSchema(sequelize, DataTypes);
db.Results = resultsSchema(sequelize, DataTypes);
db.Manager = managerSchema(sequelize, DataTypes);
db.Season = seasonSchema(sequelize, DataTypes);
db.Committee = committeeSchema(sequelize, DataTypes);

const createOneToManyRelation = function (manyModel, oneModel, foreignKey, as) {
  oneModel.hasMany(manyModel, {
    foreignKey: foreignKey,
    as: as,
  });

  manyModel.belongsTo(oneModel, {
    foreignKey: foreignKey,
    as: as,
  });
};

const createOneToOneRelation = function (model1, model2, foreignKey, as) {
  model1.hasOne(model2, {
    foreignKey: foreignKey,
    as: as,
  });

  model2.belongsTo(model1, {
    foreignKey: foreignKey,
    as: as,
  });
};

const createManyToManyRelation = function (
  model1,
  model2,
  modelRelation,
  as1,
  as2
) {
  model1.belongsToMany(model2, { through: modelRelation, as: as1 });
  model2.belongsToMany(model1, { through: modelRelation, as: as2 });
};

createOneToManyRelation(db.Song, db.User, "userId", "user_songs");
createOneToManyRelation(db.Racer, db.Team, "teamId", "team_racers");
createOneToOneRelation(db.Manager, db.Team, "teamId", "team_manager");

// createManyToManyRelation(
//   db.Song,
//   db.Playlist,
//   "playlist_songs_song",
//   "song_playlists",
//   "playlist_songs"
// );

db.sequelize.sync({ alter: true }).then(() => {
  console.log("re-sync database done.");
});

export default db;
