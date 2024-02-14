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
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const nocache_1 = __importDefault(require("nocache"));
dotenv.config();
const server_1 = require("./server");
const routes_1 = __importDefault(require("./routes"));
const db = __importStar(require("./db1"));
const api_1 = require("./api");
const categories_model_1 = __importDefault(require("./models/categories.model"));
(0, api_1.cls)();
const db1 = db.dbConnect(process.env.MONGO_URI, process.env.DB_NAME);
const options = {
    allowedHeaders: ["Content-Type"],
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    origin: "*",
    preflightContinue: false,
};
server_1.app.use((0, cors_1.default)(options));
server_1.app.use(express_1.default.json({ limit: "50mb" }));
server_1.app.use(express_1.default.urlencoded({ limit: "50mb", extended: false }));
server_1.app.use((0, nocache_1.default)());
server_1.app.use((0, morgan_1.default)("dev"));
server_1.app.use(function (req, res, next) {
    console.log(new Date().toLocaleTimeString());
    next();
});
// app.get("/", async function (req: Request, res: Response, next: NextFunction) {
//   const db0 = db.default("Kishurit");
//   try {
//     const CategoriesModel: Model<Category> = db0.model<Category>(
//       "Category",
//       categoriesSchema
//     );
//     const newCategory = new CategoriesModel({
//       name: generateRandomText(3, 9),
//       desc: generateRandomText(3, 9),
//     });
//     await newCategory.save();
//     console.log(newCategory);
//     res.json(newCategory);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while saving the category." });
//   }
// });
server_1.app.get('/wc2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.default.find(); // Find all categories
        res.json(categories); // Send the categories as a JSON response
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error'); // Send a 500 error response if there's an error
    }
}));
routes_1.default.forEach((route) => {
    server_1.app.use("/", route);
});
server_1.app.post("/*", function (req, res, next) {
    res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
server_1.app.get("/*", function (req, res, next) {
    res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
//# sourceMappingURL=index.js.map