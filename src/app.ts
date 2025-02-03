import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./api/routes";
import {
  errorHandler,
  notFoundHandler,
} from "./api/middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/", routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
