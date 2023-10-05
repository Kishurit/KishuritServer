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
exports.jsonDB = exports.getCnt = exports.deleteAllCollections = exports.cls = void 0;
const fs = __importStar(require("fs"));
const db_1 = __importDefault(require("./db"));
function cls() {
    console.log(`\x1Bc`);
}
exports.cls = cls;
const deleteAllCollections = async () => {
    const models = Object.values(db_1.default.models);
    try {
        //await db.dropDatabase();
        for (const model of models) {
            await model.deleteMany({});
            await model.remove();
            console.log(`Deleted collection: ${model.baseModelName}`);
        }
    }
    catch (error) {
        console.error(`Error deleting collections: ${error}`);
    }
};
exports.deleteAllCollections = deleteAllCollections;
// export const deleteAllCollections = async (): Promise<void> => {
//   try {
//     await db.dropDatabase();
//     console.log(`Deleted database: ${db.name}`);
//   } catch (error) {
//     console.error(`Error deleting database: ${error}`);
//   }
// };
const getCnt = async () => {
    const models = Object.values(db_1.default.models);
    const counts = await Promise.all(models.map(async (model) => {
        const modelName = model.collection.collectionName;
        const cnt = await model.collection.countDocuments();
        const obj = { [modelName]: cnt };
        return obj;
    }));
    const countsMerged = Object.assign({}, ...counts);
    return countsMerged;
};
exports.getCnt = getCnt;
const myJsonData = () => {
    try {
        const rawdata = fs.readFileSync("./src/db.json");
        const myData = JSON.parse(rawdata.toString());
        fs.closeSync;
        console.log("JSON data has been successfully parsed.");
        return myData;
    }
    catch (error) {
        console.error("An error occurred while reading or parsing the JSON file:", error);
        return null;
    }
};
exports.jsonDB = myJsonData();
//# sourceMappingURL=api.js.map