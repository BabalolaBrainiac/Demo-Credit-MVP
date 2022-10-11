import mysql from 'mysql2';
import config from 'config';
import dotenv from "dotenv";
import {Connection, ConnectionOptions, createConnection} from 'typeorm';


let connection: Connection;
dotenv.config();

const connectionOpts: ConnectionOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
};

export default connectionOpts;

    // const connection = await createPool({
    //     host: process.env.MYSQL_HOST,
    //     user: process.env.MYSQL_HOST,
    //     port: Number(process.env.MYSQL_PORT) || 3306,
    //     password: process.env.MYSQL_PASSWORD,
    //     database: process.env.DB,
    //     connectionLimit: 10
    // })
