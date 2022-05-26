import joi from "joi";
import AppError from "../../errors/AppError.js";
import CustomersService from "../../services/CustomersService.js";

export default async function createAndPutCustomersMiddleware(req, res, next) {
  const schema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().min(11).max(11).regex(/^\d+$/).required(),
    birthday: joi.date().required(),
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
    const categoriesWithSameCpf = await customersService.getByCpf(
      req.body,
      req.params
    );

    if (categoriesWithSameCpf.length > 0) {
      throw new AppError("Customer with this cpf already exists", 409);
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
}
