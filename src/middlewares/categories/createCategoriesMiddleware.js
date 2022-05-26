import joi from "joi";
import AppError from "../../errors/AppError.js";
import CategoriesService from "../../services/CategoriesService.js";

export default async function createCategoriesMiddleware(req, res, next) {
  const schema = joi.object({
    name: joi.string().required(),
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

  const categoriesService = new CategoriesService();

  try {
    const categoriesWithSameName = await categoriesService.getByName(req.body);

    if (categoriesWithSameName.length > 0) {
      throw new AppError("Category with this name already exists", 409);
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
}
