"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mysql_1 = __importDefault(require("./config/mysql"));
const index_1 = __importDefault(require("./routes/index"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.set('port', process.env.APP_PORT);
app.set('env', process.env.NODE_ENV);
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
const router = express_1.default.Router();
router.use(index_1.default);
app.use(router);
app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        const secureUrl = 'https://' + req.hostname + req.originalUrl;
        res.redirect(302, secureUrl);
    }
    next();
});
app.disable('x-powered-by');
const port = process.env.PORT;
(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, typeorm_1.createConnection)(mysql_1.default).then(() => {
        app.listen(port, () => {
            console.log('DB Connection established');
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    });
}))();
exports.default = app;
