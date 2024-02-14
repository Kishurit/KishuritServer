import * as fs from "fs";
import express, { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
const dbRouter: express.Router = express.Router();

import {
  Categorie,
  SubCategorie,
  Business,
  Location,
  Mail,
  Kishurit,
} from "../types";

import { cls, jsonDB } from "../api";
import * as db from "../db1";
import { writeCatToDB, writeSubCatToDB } from "../copyToDB";
import CategoryModel, { Category } from "../models/categories.model";

dbRouter.get("/wc1", async function (req: Request, res: Response, next: NextFunction) {
  try {
    writeCatToDB(jsonDB).then((result1) => {
      writeSubCatToDB(jsonDB, result1).then((result2) =>
        res.json([result1, result2, { cat: `cat len ${result1.length}`, subCat: `sub-cat len ${result2.length}` }])
        // res.json(result1)
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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
dbRouter.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories: Category[] = await CategoryModel.find(); // Find all categories
    res.json(categories); // Send the categories as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error'); // Send a 500 error response if there's an error
  }
});


export default dbRouter;
