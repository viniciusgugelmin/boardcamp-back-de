import AppError from "../../errors/AppError.js";
import CustomersService from "../../services/CustomersService.js";

export default async function putCustomersMiddleware(req, res, next) {
  const customersService = new CustomersService();

  try {
    const customer = await customersService.getById(req.params);

    if (customer) {
      next();
      return;
    }

    throw new AppError("Customer not found", 404);
  } catch (error) {
    next(error);
    return;
  }
}
