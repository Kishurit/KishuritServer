import mongoose, { Connection, Mongoose } from "mongoose";
import express from "express";
import { cls } from "./api";
//import { app, server } from "./server";
const app = express();
cls();
const dbConnectionString = process.env.MONGO_URI_MY;

//mongoose.set("debug", true);
mongoose.set("bufferCommands", true);
mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  //promiseLibrary: global.Promise,
  useUnifiedTopology: true,
};


const connectToDatabase1 = async (): Promise<Mongoose> => {
  try {
    const connection: Mongoose = await mongoose.connect(
      dbConnectionString,
      options
      );
      console.log(
      "\ndatabase connected. Ready state:",
      connection.connection.readyState
    );
    return connection;
  } catch (error) {
    console.log("CONNECTION ERROR:", error);
    throw error;
}
};

connectToDatabase1() 

const db1: Connection = mongoose.connection;

app.listen (8080);