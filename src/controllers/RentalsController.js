import RentalsService from "../services/RentalsService.js";
import toResponse from "../utils/toResponse.js";
import GamesService from "../services/GamesService.js";

export default class RentalsController {
  constructor() {
    this.rentalsService = new RentalsService();
    this.gamesService = new GamesService();
  }

  async getAll(req, res, next) {
    try {
      const rentals = await this.rentalsService.getAll(req.query);

      res.json(toResponse(rentals, "Rentals loaded successfully"));
    } catch (error) {
      next(error);
    }
  }

  async finish(req, res, next) {
    try {
      const game = await this.gamesService.getById({ id: req.body.gameId });
      const rental = await this.rentalsService.finish(req.params, game);

      res.json(toResponse(rental, "Rental finished successfully"));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const game = await this.gamesService.getById({ id: req.body.gameId });
      const rental = await this.rentalsService.create(req.body, game);

      res.json(toResponse(rental, "Rental created successfully", 201));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const rental = await this.rentalsService.delete(req.body);

      res.json(toResponse(rental, "Rental deleted successfully", 201));
    } catch (error) {
      next(error);
    }
  }
}
