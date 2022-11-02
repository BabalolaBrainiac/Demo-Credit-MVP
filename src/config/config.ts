import config from "config";
import dotenv from "dotenv";
dotenv.config();

export const connectionOpts = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

export const Keys = {
  JWT_TOKEN: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_TOKEN_REFRESH_SECRET as string,
  JWT_ISSUER: process.env.JWT_ISSUER as string,
};
