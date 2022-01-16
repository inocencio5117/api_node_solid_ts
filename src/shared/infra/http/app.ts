import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Response, Request } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import "../../container";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import cors from "cors";

import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

createConnection();
const app = express();

// app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

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
