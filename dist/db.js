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
exports.collection = exports.collections = exports.default = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnectionString = process.env.MONGO_URI;
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
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect(dbConnectionString, options);
        console.log("\ndatabase connected. Ready state:", connection.connection.readyState);
        return connection;
    }
    catch (error) {
        console.log("CONNECTION ERROR:", error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
const connectToDatabase1 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = mongoose_1.default.createConnection(dbConnectionString, options);
        connection.on('connected', () => {
            console.log('Database connected.');
        });
        connection.on('error', (error) => {
            console.error('Connection error:', error);
        });
        return connection;
    }
    catch (error) {
        console.error('CONNECTION ERROR:', error);
        throw error;
    }
});
const db = mongoose_1.default.connection;
exports.default = db;
exports.collections = db.collections;
exports.collection = db.collection;
//# sourceMappingURL=db.js.map