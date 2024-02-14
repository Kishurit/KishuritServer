import mongoose, { Schema, Document, Model, Collection, Connection } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import * as db from "../db1";
import mongooseAutoPopulate from "mongoose-autopopulate";
export interface Category extends Document {
  name: string;
  desc: string;
}

export const categoriesSchema: Schema<Category> = new Schema<Category>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
});

categoriesSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

categoriesSchema.plugin(mongooseAutoPopulate);

export const CategoryModel: Model<Category> = mongoose.model<Category>("categories", categoriesSchema);

// const CatModelWithConn = (connection: Connection): Model<Category> => {
//   return connection.model<Category>("categories", categoriesSchema);
// };

// export const CategoryModel = (): Model<Category> => {
//   return db.default(process.env.DB_NAME).model<Category>("categories", categoriesSchema);
// };


export default CategoryModel;
