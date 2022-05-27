import joi from "joi";
import CategoriesService from "../../services/CategoriesService.js";
import AppError from "../../errors/AppError.js";
import GamesService from "../../services/GamesService.js";

export default async function createCategoriesMiddleware(req, res, next) {
  const schema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().greater(0).required(),
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

  const categoryService = new CategoriesService();

  try {
    const category = await categoryService.getById({ id: req.body.categoryId });

    if (!category) {
      throw new AppError("Category not found", 400);
    }

    res.locals.category = category;
  } catch (error) {
    next(error);
    return;
  }

  const gamesService = new GamesService();

  try {
    const gamesWithSameName = await gamesService.getByName(req.body);

    if (gamesWithSameName.length > 0) {
      throw new AppError("Game with this name already exists", 409);
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
}
