"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dbRoutes_1 = __importDefault(require("./dbRoutes"));
const mailRoutes_1 = __importDefault(require("./mailRoutes"));
const globalRouter = express_1.default.Router();
globalRouter.use(function (req, res, next) {
    if (( //req.method.toUpperCase() === "GET" ||
    req.method.toUpperCase() === "POST" ||
        req.method.toUpperCase() === "PUT" ||
        req.method.toUpperCase() === "DELETE") &&
        req.body.key !== process.env.API_KEY)
        res.status(404).json(null);
    else
        next();
});
const routes = [globalRouter, dbRoutes_1.default, mailRoutes_1.default, routes_1.default];
exports.default = routes;
//# sourceMappingURL=index.js.map