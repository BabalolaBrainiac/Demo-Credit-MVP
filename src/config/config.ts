import config from 'config';
import dotenv from "dotenv";
dotenv.config();

export const connectionOpts = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
};
//
