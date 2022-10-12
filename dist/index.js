"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        pool: { min: 0, max: 7 }
    },
});
const port = process.env.PORT;
knex.raw("Select Version()").then(() => {
    const server = app_1.default.listen(port, () => {
        console.log('DB Connection established');
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});
module.exports = knex;
