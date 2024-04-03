import authRoute from "./auth.route.js";

import express from "express";
import userRoute from "./user.route.js";
import notiRoute from "./noti.route.js";
import raceRoute from "./race.route.js";
import racerRoute from "./racer.route.js";
import teamRoute from "./team.route.js";
import resultRoute from "./result.route.js";
import seasonRoute from "./season.route.js";

const appRoute = express();

// /api/auth
appRoute.use("/auth", authRoute);

// /api/users
appRoute.use("/users", userRoute);

// /api/race
appRoute.use("/races", raceRoute);

// /api/racers
appRoute.use("/racers", racerRoute);

// /api/teams
appRoute.use("/teams", teamRoute);

// /api/results
appRoute.use("/results", resultRoute);

// /api/seasons
appRoute.use("/seasons", seasonRoute);

// /api/notifications
appRoute.use("/notifications", notiRoute);

export default appRoute;
