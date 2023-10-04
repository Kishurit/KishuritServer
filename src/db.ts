import mongoose, { Connection } from "mongoose";

mongoose.set("bufferCommands", false);
mongoose.set("strictQuery", true);

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  autoIndex: true,
  // promiseLibrary: global.Promise,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};

export function connectToDatabase(dbConnectionString: any): Connection {
  try {
    const connection: Connection = mongoose.createConnection(
      dbConnectionString,
      options
    );

    console.log("\ndatabase connected. Ready state:", connection.readyState);

    return connection;
  } catch (error) {
    console.log("CONNECTION ERROR:", error);
    throw error;
  }
}

export const db: Connection = mongoose.connection;
