import express, { json } from "express";
import cors from "cors";
import router from "../routes/index.js";
import { errorMiddleware } from "../middlewares/errorMiddleware.js";

const app = express();
app.use(json());
app.use(cors());

app.use(router);

app.use(errorMiddleware);

export default app;
