import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import nocache from "nocache";
import mongoose, { Connection, Document, Model, Schema } from "mongoose";
dotenv.config();

import { app } from "./server";
import routes from "./routes";
import * as db from "./db1";
import { cls, generateRandomText } from "./api";
import CategoryModel, { categoriesSchema, Category } from "./models/categories.model";

cls();

const db1 = db.dbConnect(process.env.MONGO_URI, process.env.DB_NAME);

const options: cors.CorsOptions = {
  allowedHeaders: ["Content-Type"],
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(nocache());
app.use(morgan("dev"));

app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(new Date().toLocaleTimeString());
  next();
});

// app.get("/", async function (req: Request, res: Response, next: NextFunction) {
//   const db0 = db.default("Kishurit");
  
//   try {
//     const CategoriesModel: Model<Category> = db0.model<Category>(
//       "Category",
//       categoriesSchema
//     );

//     const newCategory = new CategoriesModel({
//       name: generateRandomText(3, 9),
//       desc: generateRandomText(3, 9),
//     });

//     await newCategory.save();
//     console.log(newCategory);

//     res.json(newCategory);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while saving the category." });
//   }
// });

app.get('/wc2', async (req: Request, res: Response) => {
  try {
    const categories: Category[] = await CategoryModel.find(); // Find all categories
    res.json(categories); // Send the categories as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error'); // Send a 500 error response if there's an error
  }
});

routes.forEach((route) => {
  app.use("/", route);
});

app.post("/*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ status: 404, message: "הדף לא קיים" });
});

app.get("/*", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ status: 404, message: "הדף לא קיים" });
});
