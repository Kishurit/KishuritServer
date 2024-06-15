import mongoose, { Schema, Document, Model, Collection, Connection, Types, ObjectId } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongooseAutoPopulate from "mongoose-autopopulate";
import CategoryModel, { Category, categoriesSchema } from "./categories.model";
import * as db from "../db1";

export interface SubCategory extends Category {
  catRefId: Category | Types.ObjectId;
}

export const subCategoriesSchema: Schema<SubCategory> = new Schema<SubCategory>({
  catRefId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: "categories", // Assuming "categories" is the name of the collection in the database
    autopopulate: true
  },
  ...categoriesSchema.obj,
});


// Apply the uniqueValidator plugin to the schema
subCategoriesSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

subCategoriesSchema.plugin(mongooseAutoPopulate);

const SubCategoryModel = mongoose.model<SubCategory>("subcategories", subCategoriesSchema);

// const SubCatModelWithConn = (connection: Connection): Model<SubCategory> => { 
//   return connection.model<SubCategory>("subcategories", subCategoriesSchema);
// };

// const SubCatModel = (): Model<SubCategory> => {
//   return db.default(process.env.DB_NAME).model<SubCategory>("subcategories", subCategoriesSchema);
// };

export default SubCategoryModel;