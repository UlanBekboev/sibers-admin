// src/config/db.ts
import { Sequelize } from "sequelize-typescript";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

dotenv.config();

// Convert current module URL to a file path (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a Sequelize instance to connect to the database
export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5433,
  dialect: "postgres",
  models: [join(__dirname, "..", "models", "*.js")], // path to models
  logging: false,
});
