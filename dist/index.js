"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const knex_1 = __importDefault(require("./db/knex/knex"));
const port = process.env.PORT;
knex_1.default.raw("Select Version()").then(() => {
    const server = app_1.default.listen(port, () => {
        console.log('DB Connection established');
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});
module.exports = knex_1.default;
