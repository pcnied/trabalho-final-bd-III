import cors from "cors";
import express from "express";
import { routesApp } from "./routes.config";

// Config de middlewares
export function createServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  routesApp(app);

  return app;
}
