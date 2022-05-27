import { Router } from "express";
import RentalsController from "../controllers/RentalsController.js";
import createRentalsMiddleware from "../middlewares/rentals/createRentalsMiddleware.js";
import updateAndDeleteRentalsMiddleware from "../middlewares/rentals/updateAndDeleteRentalsMiddleware.js";

const rentalsRouter = Router();
const rentalsController = new RentalsController();

rentalsRouter.get("/", (req, res, next) =>
  rentalsController.getAll(req, res, next)
);
rentalsRouter.post("/", createRentalsMiddleware, (req, res, next) =>
  rentalsController.create(req, res, next)
);
rentalsRouter.post(
  "/:id/return",
  updateAndDeleteRentalsMiddleware,
  (req, res, next) => rentalsController.finish(req, res, next)
);
rentalsRouter.delete(
  "/:id",
  updateAndDeleteRentalsMiddleware,
  (req, res, next) => rentalsController.delete(req, res, next)
);

export default rentalsRouter;
