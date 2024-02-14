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
const express_1 = __importDefault(require("express"));
const dbRouter = express_1.default.Router();
const api_1 = require("../api");
const copyToDB_1 = require("../copyToDB");
const categories_model_1 = __importDefault(require("../models/categories.model"));
dbRouter.get("/wc1", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, copyToDB_1.writeCatToDB)(api_1.jsonDB).then((result1) => {
                (0, copyToDB_1.writeSubCatToDB)(api_1.jsonDB, result1).then((result2) => res.json([result1, result2, { cat: `cat len ${result1.length}`, subCat: `sub-cat len ${result2.length}` }])
                // res.json(result1)
                );
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
});
// dbRouter.get('/wc2', function (req: Request, res: Response, next: NextFunction) {
//   CategoryModel.find({}).maxTimeMS(30000)
//     .then(result1 => {
//       res.json(result1);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });
dbRouter.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categories_model_1.default.find(); // Find all categories
        res.json(categories); // Send the categories as a JSON response
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error'); // Send a 500 error response if there's an error
    }
}));
exports.default = dbRouter;
//# sourceMappingURL=dbRoutes.js.map