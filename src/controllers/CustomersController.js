import AppError from "../errors/AppError.js";
import CostumersService from "../services/CustomersService.js";
import toResponse from "../utils/toResponse.js";

export default class CostumersController {
  constructor() {
    this.costumersService = new CostumersService();
  }

  async getAll(req, res, next) {
    try {
      const customers = await this.costumersService.getAll(req.query);

      res.json(toResponse(customers, "Customers loaded successfully"));
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const customer = await this.costumersService.getById(req.query);

      if (!customer) {
        throw new AppError("Customer not found", 404);
      }

      res.json(toResponse(customer, "Customer loaded successfully"));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const customerBody = req.body;

      const customer = await this.costumersService.create(customerBody);

      res.json(toResponse(customer, "Customer created successfully", 201));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const customer = await this.costumersService.update(req.body, req.params);

      res.json(toResponse(customer, "Customer updated successfully"));
    } catch (error) {
      next(error);
    }
  }
}
