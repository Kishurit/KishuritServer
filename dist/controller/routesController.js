"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCollection = void 0;
const subCategories_model_1 = require("../models/subCategories.model");
const mongoose_1 = require("mongoose");
const verifyData = (data, res, next) => {
    !data ? next() : res.json(data);
};
const findCollection = async (req, res, next) => {
    // type Data = {
    //   total: number;
    //   cat: { name: string; totNum: number }[];
    // };
    // const data = jsonDB.job.reduce(
    //   (acc: Data, element: Categorie) => {
    //     const totalCatNum = element.links.reduce(
    //       (acc1, element1) => acc1 + element1.links.length,
    //       0
    //     );
    //     acc.total += totalCatNum;
    //     acc.cat.push({ name: element.name, totNum: totalCatNum });
    //     return acc;
    //   },
    //   { total: 0, cat: [] }
    // );
    try {
        // const result = await OrgsModel.aggregate([
        //   {
        //     $group: {
        //       _id: '$subCatRefId', // Group by catRefId
        //       count: { $sum: 1 } // Count occurrences
        //     }
        //   }
        // ]);
        //const result1 =  (await CategoryModel.find()).filter (cat => cat.name);
        const result = (await subCategories_model_1.SubCatModel.find().populate('catRefId')).reduce((acc, cur) => {
            if (cur.catRefId instanceof mongoose_1.Types.ObjectId)
                return acc; // skip if not populated
            const catRefId = cur.catRefId;
            const categoryName = catRefId.name;
            if (!acc[categoryName])
                acc[categoryName] = [];
            acc[categoryName].push(cur.name);
            return acc;
        }, {});
        // console.log (result)
        verifyData(result, res, next);
    }
    catch (error) {
        // Handle errors
        console.error('Error counting documents:', error);
        throw error;
    }
};
exports.findCollection = findCollection;
//# sourceMappingURL=routesController.js.map