import mongoose, { Connection, Mongoose } from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { cls, getCnt } from "./api";
import * as db1 from "./db1";

dotenv.config();

const app = express();
cls();

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

function db(dbConnectionString: string): void {
  try {
    const connection: Connection = mongoose.createConnection(
      dbConnectionString,
      options
    );

    connection.on("connected", () => {
      console.log(
        `\ndatabase connected. Ready state: ${connection.readyState}`
      );
    });

    connection.on("error", (error) => {
      console.error("Connection error:", error);
    });
  } catch (error) {
    console.error("CONNECTION ERROR:", error);
    throw error;
  }
}

db(process.env.MONGO_URI);

//db1.dbConnect(process.env.MONGO_URI);
//db1.connectToDatabase;
app.get("/", async function (req: Request, res: Response, next: NextFunction) {
  getCnt().then((data) => res.json(data));
});

app.listen(8080);
