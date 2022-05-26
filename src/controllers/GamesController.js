import GamesService from "../services/GamesService.js";
import toResponse from "../utils/toResponse.js";

export default class GamesController {
  constructor() {
    this.gamesService = new GamesService();
  }

  async getAll(req, res, next) {
    try {
      const games = await this.gamesService.getAll(req.query);

      res.json(toResponse(games, "Games loaded successfully"));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const gameBody = req.body;

      const game = await this.gamesService.create(gameBody);

      res.json(toResponse(game, "Game created successfully", 201));
    } catch (error) {
      next(error);
    }
  }
}
