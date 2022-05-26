import { Router } from "express";
import categoriesRoutes from "./categories.routes.js";
import customersRoutes from "./customers.routes.js";
import gamesRoutes from "./games.routes.js";
import rentalsRoutes from "./rentals.routes.js";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/customers", customersRoutes);
router.use("/games", gamesRoutes);
router.use("/rentals", rentalsRoutes);

export default router;
