"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.findOrgsByCatId = exports.findOrgsByColAndCnt = void 0;
const orgs_model_1 = __importDefault(require("../models/orgs.model"));
const categories_model_1 = __importDefault(require("../models/categories.model"));
const verifyData = (data, res, next) => {
    !data ? next() : res.json(data);
};
const findOrgsByColAndCnt = async (req, res, next) => {
    try {
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
        const cnt = result.reduce((acc, cur) => {
            return acc + cur.totNum;
        }, 0);
        verifyData({ total: cnt, cat: result }, res, next);
=======
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
>>>>>>> 6e0257cef84b96b3b5855027dea2651eb12de819
    }
    catch (error) {
        // Handle errors
        console.error('Error counting documents:', error);
        throw error;
    }
};
exports.findOrgsByColAndCnt = findOrgsByColAndCnt;
const findOrgsByCatId = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id === "null" || id === "undefined")
            return res.json([]);
        // const json = jsonDB.job[15];
        const cat = await categories_model_1.default.findById(id);
        //console.log (cat);
        // const subCats: SubCategory[] = await SubCategoryModel.find({ catRefId: cat._id });
        //console.log(subCats);
        // console.log(json);
        // const data: any = {
        //   name: cat.name, desc: cat.desc, links: [
        //     ...orgs
        //   ]
        // }
        // const data: any = { ot: "!@"};
        const orgs = await orgs_model_1.default.find({ catRefId: cat._id }).populate("subCatRefId");
        var data = { name: cat.name, desc: cat.desc, links: [] };
        for (const org of orgs) {
            const index = data.links.findIndex(item => item.cat === org.subCatRefId.name);
            if (index == -1)
                data.links.push({ desc: org.subCatRefId.desc, cat: org.subCatRefId.name, links: [org] });
            else
                data.links[index].links.push(org);
        }
        verifyData(data, res, next);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
exports.findOrgsByCatId = findOrgsByCatId;
// export const findColsSubColsAndOrgs = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const result: Orgs[] = await OrgsModel.find()
//     const result = await OrgsModel.aggregate([
//       {
//         $group: {
//           _id: "$catRefId", // Group by catRefId
//           count: { $sum: 1 } // Count documents in each group
//         }
//       },
//       {
//         $lookup: {
//           from: "categories", // Name of the collection
//           localField: "_id",
//           foreignField: "_id",
//           as: "categories"
//         }
//       },
//       {
//         $project: {
//           totNum: "$count", // Rename the count field to totNum
//           name: { $arrayElemAt: ["$categories.name", 0] } // Assuming there's a field 'name' in CategoryModel
//         }
//       },
//       {
//         $sort: {
//           "name": 1 // Sort by categoryName in ascending order
//         }
//       }
//     ]);
//     console.log(result);
//     const cnt = result.reduce((acc, cur) => {
//       return acc + cur.totNum;
//     }, 0)
//     verifyData({ total: cnt, cat: result }, res, next);
//   }
//   catch (error) {
//     console.error('Error counting documents:', error);
//     throw error;
//   }
// }
//# sourceMappingURL=routesController.js.map