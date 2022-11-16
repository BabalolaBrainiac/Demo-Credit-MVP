require('dotenv').config()
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import ApiRoutes from './routes/index';
const app = express();

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


export default app;
