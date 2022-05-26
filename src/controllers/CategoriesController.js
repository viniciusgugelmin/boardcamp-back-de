import CategoriesService from "../services/CategoriesService.js";
import toResponse from "../utils/toResponse.js";

export default class CategoriesController {
  constructor() {
    this.categoriesService = new CategoriesService();
  }

  async getAll(req, res, next) {
    try {
      const categories = await this.categoriesService.getAll();

      res.json(toResponse(categories, "Categories loaded successfully"));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const categoryBody = req.body;

      const category = await this.categoriesService.create(categoryBody);

      res.json(toResponse(category, "Category created successfully", 201));
    } catch (error) {
      next(error);
    }
  }
}
