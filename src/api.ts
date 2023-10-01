import { Model } from "mongoose"; // Import the appropriate type if needed
import * as fs from "fs";
import * as _ from "lodash";

import db1 from "./db1";
import {
  Categorie,
  SubCategorie,
  Business,
  Location,
  Mail,
  Kishurit,
} from "./types";

interface CountObject {
  [modelName: string]: number;
}

export function cls() {
  console.log(`\x1Bc`);
}

export const deleteAllCollections = async (): Promise<void> => {
  const models: Model<any>[] = Object.values(db1.models);
  try {
    //await db.dropDatabase();
    for (const model of models) {
      await model.deleteMany({});
      await model.remove();
      console.log(`Deleted collection: ${model.baseModelName}`);
    }
  } catch (error) {
    console.error(`Error deleting collections: ${error}`);
  }
};

// export const deleteAllCollections = async (): Promise<void> => {
//   try {
//     await db.dropDatabase();
//     console.log(`Deleted database: ${db.name}`);
//   } catch (error) {
//     console.error(`Error deleting database: ${error}`);
//   }
// };

export const getCnt: () => Promise<CountObject> = async () => {
  const models: Model<any>[] = Object.values(db1.models);

  const counts = await Promise.all(
    models.map(async (model) => {
      const modelName = model.collection.collectionName;
      const cnt = await model.collection.countDocuments();
      const obj: CountObject = { [modelName]: cnt };
      return obj;
    })
  );

  const countsMerged: CountObject = Object.assign({}, ...counts);
  return countsMerged;
};

const myJsonData = (): Kishurit => {
  try {
    const rawdata: Buffer = fs.readFileSync("./src/db.json");
    const myData: Kishurit = JSON.parse(rawdata.toString());
    fs.closeSync;
    console.log("JSON data has been successfully parsed.");
    return myData;
  } catch (error) {
    console.error(
      "An error occurred while reading or parsing the JSON file:",
      error
    );
    return null;
  }
};

export const jsonDB: Kishurit = myJsonData();
