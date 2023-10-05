"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const api_1 = require("./api");
dotenv.config();
const app = (0, express_1.default)();
(0, api_1.cls)();
//mongoose.set("debug", true);
mongoose_1.default.set("bufferCommands", true);
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    autoIndex: true,
    //promiseLibrary: global.Promise,
    useUnifiedTopology: true,
};
function db(dbConnectionString) {
    try {
        const connection = mongoose_1.default.createConnection(dbConnectionString, options);
        connection.on("connected", () => {
            console.log(`\ndatabase connected. Ready state: ${connection.readyState}`);
        });
        connection.on("error", (error) => {
            console.error("Connection error:", error);
        });
    }
    catch (error) {
        console.error("CONNECTION ERROR:", error);
        throw error;
    }
}
db(process.env.MONGO_URI);
//db1.dbConnect(process.env.MONGO_URI);
//db1.connectToDatabase;
app.get("/", async function (req, res, next) {
    (0, api_1.getCnt)().then((data) => res.json(data));
});
app.listen(8080);
//# sourceMappingURL=app.js.map