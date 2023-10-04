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

import CategoriesModel, { Category } from "../models/categories.model";
import SubCategoriesModel, { SubCategory } from "../models/subCategories.model";
import {
  jsonOfCatToDB,
  jsonOfOrgs,
  jsonOfSubCatToDB,
  writeCatToDB,
  writeSubCatToDB,
} from "../copyToDB";
import { cls, jsonDB } from "../api";
// import orgsModel from "../models/orgs.model";
// import { Collection, model, Model } from "mongoose";

dbRouter.get("/wc1", async function (req, res, next) {
  try {
    writeCatToDB(jsonDB).then((result1) => {
      writeSubCatToDB(jsonDB, result1).then((result2) =>
        res.json([result1, result2])
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

dbRouter.get(
  "/cat1234",
  function (req: Request, res: Response, next: NextFunction) {
    CategoriesModel.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json({ status: 404, message: err }));
  }
); //*/

dbRouter.post(
  "/cat1234",
  function (req: Request, res: Response, next: NextFunction) {
    const { name, desc } = req.body;
    const newCat = new CategoriesModel({ name, desc });
    newCat.save((err, savedCat) => {
      if (err) {
        console.error("Error saving document:", err);
        res.status(500).json({ status: 500, message: err });
      } else {
        console.log("Document saved successfully:", savedCat);
        res.json(savedCat);
      }
    });
  }
); //*/

dbRouter.put(
  "/cat1234",
  function (req: Request, res: Response, next: NextFunction) {
    const { _id, name, desc } = req.body;
    CategoriesModel.findByIdAndUpdate(_id, { name, desc })
      .then((data) => {
        console.log("Document saved successfully:", data);
        res.json(data);
      })
      .catch((err) => {
        console.error("Error saving document:", err);
        res.status(500).json({ status: 500, message: err });
      });
  }
); //*/

dbRouter.get(
  "/subcat1234/:id",
  async function (req: Request, res: Response, next: NextFunction) {
    const id = req.params.id; // Get the value of the "id" parameter from the URL
    try {
      console.log(id);
      let subcat: SubCategory[] = await SubCategoriesModel.find({
        catRefId: id,
      });
      res.json(subcat);
    } catch (err) {
      res.status(500).json({ status: 500, message: err });
    }
  }
); //*/

export default dbRouter;
