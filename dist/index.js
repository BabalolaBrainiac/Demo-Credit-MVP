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
const app_1 = __importDefault(require("./app"));
const typeorm_1 = require("typeorm");
const typeorm_2 = __importDefault(require("./config/typeorm"));
const port = process.env.PORT;
(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, typeorm_1.createConnection)(typeorm_2.default).then(() => {
        const server = app_1.default.listen(port, () => {
            console.log('DB Connection established');
            return console.log(`Express is listening at http://localhost:${port}`);
        });
        process.once('SIGUSR2', function () {
            server.close(function () {
                process.kill(process.pid, 'SIGUSR2');
            });
        });
    })
        .catch((error) => {
        console.log('TypeOrm Connection Not Established');
    });
}))();
