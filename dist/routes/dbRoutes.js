"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbRouter = express_1.default.Router();
const categories_model_1 = __importDefault(require("../models/categories.model"));
const subCategories_model_1 = __importDefault(require("../models/subCategories.model"));
const copyToDB_1 = require("../copyToDB");
const api_1 = require("../api");
// import orgsModel from "../models/orgs.model";
// import { Collection, model, Model } from "mongoose";
dbRouter.get("/wc1", async function (req, res, next) {
    try {
        (0, copyToDB_1.writeCatToDB)(api_1.jsonDB).then((result1) => {
            (0, copyToDB_1.writeSubCatToDB)(api_1.jsonDB, result1).then((result2) => res.json([result1, result2]));
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
dbRouter.get("/cat1234", function (req, res, next) {
    categories_model_1.default.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(404).json({ status: 404, message: err }));
}); //*/
dbRouter.post("/cat1234", function (req, res, next) {
    const { name, desc } = req.body;
    const newCat = new categories_model_1.default({ name, desc });
    newCat.save((err, savedCat) => {
        if (err) {
            console.error("Error saving document:", err);
            res.status(500).json({ status: 500, message: err });
        }
        else {
            console.log("Document saved successfully:", savedCat);
            res.json(savedCat);
        }
    });
}); //*/
dbRouter.put("/cat1234", function (req, res, next) {
    const { _id, name, desc } = req.body;
    categories_model_1.default.findByIdAndUpdate(_id, { name, desc })
        .then((data) => {
        console.log("Document saved successfully:", data);
        res.json(data);
    })
        .catch((err) => {
        console.error("Error saving document:", err);
        res.status(500).json({ status: 500, message: err });
    });
}); //*/
dbRouter.get("/subcat1234/:id", async function (req, res, next) {
    const id = req.params.id; // Get the value of the "id" parameter from the URL
    try {
        console.log(id);
        let subcat = await subCategories_model_1.default.find({
            catRefId: id,
        });
        res.json(subcat);
    }
    catch (err) {
        res.status(500).json({ status: 500, message: err });
    }
}); //*/
exports.default = dbRouter;
//# sourceMappingURL=dbRoutes.js.map