import mongoose, { Connection, Mongoose } from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cls } from "./api";
import { connectToDatabase } from "./db1";
dotenv.config();

//import { app, server } from "./server";
const app = express();
cls();

connectToDatabase (String(process.env.MONGO_URI));
connectToDatabase (String(process.env.MONGO_URI));


app.get("/", function (req: Request, res: Response, next: NextFunction) {
  const data: any = mongoose.connections;
  console.log(data);
  res.json(data);
});

app.listen(8080);
