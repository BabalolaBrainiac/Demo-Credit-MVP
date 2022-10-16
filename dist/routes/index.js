"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testRoutes_1 = __importDefault(require("../routes/testRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.default.Router();
router.use('/', testRoutes_1.default);
router.use('/api/users', userRoutes_1.default);
router.use('/health', (req, res) => {
    res.send({ status: 'OK' });
});
exports.default = router;
