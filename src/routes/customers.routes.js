import { Router } from "express";
import CostumersController from "../controllers/CustomersController.js";
import createAndPutCustomersMiddleware from "../middlewares/customers/createAndPutCustomersMiddleware.js";
import putCustomersMiddleware from "../middlewares/customers/putCustomersMiddleware.js";

const customersRouter = Router();
const customersController = new CostumersController();

customersRouter.get("/", (req, res, next) =>
  customersController.getAll(req, res, next)
);
customersRouter.get("/:id", (req, res, next) =>
  customersController.getById(req, res, next)
);
customersRouter.put(
  "/:id",
  putCustomersMiddleware,
  createAndPutCustomersMiddleware,
  (req, res, next) => customersController.update(req, res, next)
);
customersRouter.post("/", createAndPutCustomersMiddleware, (req, res, next) =>
  customersController.create(req, res, next)
);

export default customersRouter;
