import "dotenv/config";

export const postgresEnvs = {
  url: process.env.URL_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  databaseName: process.env.DB_DATABASE,
};
