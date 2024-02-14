import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";

//const dbConnectionString: string = process.env.MONGO_URI;

//mongoose.set("debug", true);
mongoose.set("bufferCommands", true);
mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;

const options = {
  //useNewUrlParser: true,
  autoIndex: true,
  //promiseLibrary: global.Promise,
  //useUnifiedTopology: true,
};

export const connectToDatabase = async (
  dbConnectionString: string,
  dbName?: string
): Promise<Mongoose> => {
  const newOptions = {
    ...options,
    ...(dbName !== undefined && { dbName: dbName }),
  };

  try {
    const connection: Mongoose = await mongoose.connect(
      dbConnectionString,
      newOptions
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

export const dbConnect = async (
  dbConnectionString: string,
  dbName?: string
): Promise<Connection> => {
  try {
    const connection: Connection = await mongoose.createConnection(
      dbConnectionString,
      options
    );

    connection.on("connected", () => {
      console.log("\ndatabase connected. Ready state:", connection.readyState);
    });

    connection.on("error", (error) => {
      console.error("Connection error:", error);
    });

    return connection;
  } catch (error) {
    console.error("CONNECTION ERROR:", error);
    throw error;
  }
};

const db = (dbName: string): Connection =>
  mongoose.connections.find((connection) => connection.name === dbName);
/*db.on("error", (error) => {
  console.error("CONNECTION ERROR:", error);
});

db.once("open", () => {
  console.log("\ndatabase connected. Ready state:", db.readyState);
});*/

export { db as default };
