import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";

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

export const connectToDatabase = async (
  dbConnectionString: string
): Promise<Connection> => {
  try {
    const connection: Connection = await mongoose.createConnection(
      dbConnectionString,
      options
    );
    console.log("\ndatabase connected. Ready state:", connection.readyState);
    return connection;
  } catch (error) {
    console.log("CONNECTION ERROR:", error);
    throw error;
  }
};

export const db1 = mongoose.connection;
