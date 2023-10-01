import mongoose, { Schema, Document, Model, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Category, categoriesSchema } from "./categories.model";

export interface SubCategory extends Category {
  catRefId: Types.ObjectId;
}

const subCategoriesSchema: Schema<SubCategory> = new Schema<SubCategory>({
  catRefId: {
    type: Schema.Types.ObjectId,
    unique: false,
    required: true,
    ref: "Category", // Assuming "categories" is the name of the collection in the database
    autopopulate: true,
  },
  ...categoriesSchema.obj,
});

// Apply the uniqueValidator plugin to the schema
subCategoriesSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

subCategoriesSchema.plugin(mongooseAutoPopulate);
const SubCategoryModel: Model<SubCategory> = mongoose.model<SubCategory>(
  "SubCategories",
  subCategoriesSchema
);

export default SubCategoryModel;