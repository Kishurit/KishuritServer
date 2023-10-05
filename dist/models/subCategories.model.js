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
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const categories_model_1 = require("./categories.model");
const subCategoriesSchema = new mongoose_1.Schema({
    catRefId: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: false,
        required: true,
        ref: "Category",
        autopopulate: true,
    },
    ...categories_model_1.categoriesSchema.obj,
});
// Apply the uniqueValidator plugin to the schema
subCategoriesSchema.plugin(mongoose_unique_validator_1.default, {
    message: "Error, expected {PATH} to be unique.",
});
subCategoriesSchema.plugin(mongoose_autopopulate_1.default);
const SubCategoryModel = mongoose_1.default.model("SubCategories", subCategoriesSchema);
exports.default = SubCategoryModel;
//# sourceMappingURL=subCategories.model.js.map