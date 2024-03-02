import { NextFunction, Request, Response } from "express";
import SubCategoryModel, { SubCategory } from "../models/subCategories.model";
import OrgsModel, { Orgs } from "../models/orgs.model";
import { CombinedModel } from "../models/combined";
import CategoryModel from "../models/categories.model";

const verifyData = (data: any, res: Response, next: NextFunction): void => {
  !data ? next() : res.json(data);
};

export const findCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const result: Orgs[] = await OrgsModel.find()
    const result = await OrgsModel.aggregate([
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
    }, 0)

    console.log(result);
    verifyData({ total: cnt, cat: result }, res, next);
  }

  catch (error) {
    console.error('Error counting documents:', error);
    throw error;
  }

}