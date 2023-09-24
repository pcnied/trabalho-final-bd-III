import "dotenv/config";
import { DataSource } from "typeorm";
import { appEnvs, postgresEnvs } from "../../app/envs";

const basePath = appEnvs.enviroment === "dev" ? "src" : "dist";

export const typeorm = new DataSource({
  type: "postgres",
  url: postgresEnvs.url,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [`${basePath}/database/entities/**/*`],
  migrations: [`${basePath}/database/migrations/**/*`],
  ssl: {
    rejectUnauthorized: false,
  },
});
