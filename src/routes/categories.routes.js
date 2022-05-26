import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController.js";
import createCategoriesMiddleware from "../middlewares/categories/createCategoriesMiddleware.js";

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.get("/", (req, res, next) =>
  categoriesController.getAll(req, res, next)
);
categoriesRouter.post("/", createCategoriesMiddleware, (req, res, next) =>
  categoriesController.create(req, res, next)
);

export default categoriesRouter;
