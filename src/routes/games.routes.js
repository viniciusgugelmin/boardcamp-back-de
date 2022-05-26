import { Router } from "express";
import GamesController from "../controllers/GamesController.js";
import createGamesMiddleware from "../middlewares/games/createGamesMiddleware.js";

const gamesRouter = Router();
const gamesController = new GamesController();

gamesRouter.get("/", (req, res, next) =>
  gamesController.getAll(req, res, next)
);
gamesRouter.post("/", createGamesMiddleware, (req, res, next) =>
  gamesController.create(req, res, next)
);

export default gamesRouter;
