import joi from "joi";
import AppError from "../../errors/AppError.js";
import CustomersService from "../../services/CustomersService.js";
import RentalsService from "../../services/RentalsService.js";
import GamesService from "../../services/GamesService.js";

export default async function createRentalsMiddleware(req, res, next) {
  const schema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().greater(0).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message.replace(/['"]+/g, "");
    }

    next(new AppError(errors, 400));
    return;
  }

  const customersService = new CustomersService();

  try {
    const customer = await customersService.getById({
      id: req.body.customerId,
    });

    if (!customer) {
      next(new AppError("Customer not found", 400));
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  const gamesService = new GamesService();
  let game;

  try {
    game = await gamesService.getById({ id: req.body.gameId });

    if (!game) {
      next(new AppError("Game not found", 400));
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  const rentalsService = new RentalsService();

  try {
    const gameRentals = await rentalsService.getByGameId(req.body);

    const openGameRentals = gameRentals.filter(
      (rental) => rental.returnDate === null
    );

    if (openGameRentals.length >= game.stockTotal) {
      next(new AppError("Game is out of stock", 400));
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
}
