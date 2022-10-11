"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let connection;
dotenv_1.default.config();
const connectionOpts = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
};
exports.default = connectionOpts;
// const connection = await createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_HOST,
//     port: Number(process.env.MYSQL_PORT) || 3306,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.DB,
//     connectionLimit: 10
// })
