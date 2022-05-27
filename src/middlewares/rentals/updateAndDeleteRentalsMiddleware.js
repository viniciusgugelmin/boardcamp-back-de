import AppError from "../../errors/AppError.js";
import RentalsService from "../../services/RentalsService.js";

export default async function updateAndDeleteRentalsMiddleware(req, res, next) {
  const rentalsService = new RentalsService();

  try {
    const rental = await rentalsService.getById(req.params);

    if (!rental) {
      next(new AppError("Rental not found", 404));
      return;
    }

    if (rental.returnDate) {
      next(new AppError("Rental already finished", 400));
      return;
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
}
