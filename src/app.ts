"use strict";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import dbConnectionOptions from './config/mysql'
import ApiRoutes from './routes/index';
import {createConnection} from "typeorm";
const app = express();
dotenv.config();

app.set('port', process.env.APP_PORT);
app.set('env', process.env.NODE_ENV);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(helmet());
const router = express.Router();
router.use(ApiRoutes);

app.use(router);
app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        const secureUrl = 'https://' + req.hostname + req.originalUrl;
        res.redirect(302, secureUrl);
    }

    next();
});


app.disable('x-powered-by');
const port = process.env.PORT;

(async () => await createConnection(dbConnectionOptions).then(() => {
    app.listen(port, () => {
        console.log('DB Connection established')
        return console.log(`Express is listening at http://localhost:${port}`);
    });
}))();


export default app;
