"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCollection = void 0;
const orgs_model_1 = __importDefault(require("../models/orgs.model"));
const verifyData = (data, res, next) => {
    !data ? next() : res.json(data);
};
const findCollection = async (req, res, next) => {
    try {
        // const result: Orgs[] = await OrgsModel.find()
        const result = await orgs_model_1.default.aggregate([
            {
                $group: {
                    _id: "$catRefId", // Group by catRefId
                    count: { $sum: 1 } // Count documents in each group
                }
            },
            {
                $lookup: {
                    from: "categories", // Name of the collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $project: {
                    totNum: "$count", // Rename the count field to totNum
                    name: { $arrayElemAt: ["$categories.name", 0] } // Assuming there's a field 'name' in CategoryModel
                }
            },
            {
                $sort: {
                    "name": 1 // Sort by categoryName in ascending order
                }
            }
        ]);
        console.log(result);
        const cnt = result.reduce((acc, cur) => {
            return acc + cur.totNum;
        }, 0);
        console.log(result);
        verifyData({ total: cnt, cat: result }, res, next);
    }
    catch (error) {
        console.error('Error counting documents:', error);
        throw error;
    }
};
exports.findCollection = findCollection;
//# sourceMappingURL=routesController.js.map