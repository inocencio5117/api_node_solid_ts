import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Response, Request } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import "../../container";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import cors from "cors";

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
