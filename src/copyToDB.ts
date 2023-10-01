import * as fs from "fs";
import * as _ from "lodash";
import { Model, Types } from "mongoose";
import CategoriesModel, { Category } from "./models/categories.model";
import SubCategoryModel, { SubCategory } from "./models/subCategories.model";
import OrgsModel, { Orgs } from "./models/orgs.model";
import { Kishurit, Categorie, SubCategorie, Business } from "./types";
declare global {
  interface Array<T> {
    filterValues(): T[];
  }
}

const findIdOfCatByName = (arr: Category[], name: string): Types.ObjectId =>
  arr.find((e) => e.name === name)._id;

const findIdOfSubcatByName = (
  arr: SubCategory[],
  name: string
): Types.ObjectId => arr.find((e) => e.name === name)._id;
Array.prototype.filterValues = function <T>(this: string[]): string[] {
  return this.filter((val: string) => val !== "" && val !== undefined && val !== null) as string[];
};

type cat = { name: string; desc: string };
const jsonOfCat = (jsonDB: Kishurit): cat[] => {
  if (!jsonDB.job) return [];

  return jsonDB.job.map((data: Categorie, i: number) => ({
    name: data.name,
    desc: data.desc.trim() !== "" ? data.desc : String(i),
  }));
};

export const writeCatToDB = async (jsonDB: Kishurit) => {
  try {
    return await CategoriesModel.insertMany(jsonOfCat(jsonDB));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const jsonOfCatToDB = async (jsonDB: Kishurit) => {
  try {
    return jsonOfCat(jsonDB);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const jsonOfSubCat = async (
//   jsonDB: Kishurit,
//   catCollection: Category[]
// ): Promise<SubCategory[]> => {
//   const subCatObj: SubCategory[] = _.cloneDeep(jsonDB).job.reduce(
//     (accumulator: SubCategory[], cat: Categorie) => {
//       const subCategories: SubCategory[] = cat.links.reduce(
//         (accumulator1: any[], subCat: SubCategorie, j) => {
//           const catRefId = findIdOfCatByName(catCollection, cat.name);
//           if (catRefId) {
//             accumulator1.push({
//               catRefId,
//               name: subCat.cat,
//               desc: String(accumulator.length + j),
//             });
//           }
//           return accumulator1;
//         },
//         []
//       );

//       accumulator = [...accumulator, ...subCategories];
//       return accumulator;
//     },
//     []
//   );

//   console.log("jsonOfSubCat");
//   return subCatObj;
// };
const jsonOfSubCat = async (jsonDB: Kishurit, catCollection: Category[]) => {
  if (!jsonDB.job) return [];

  return jsonDB.job.flatMap((cat: Categorie, i: number) => {
    const catRefId = findIdOfCatByName(catCollection, cat.name);
    return cat.links
      .map((subCat: SubCategorie, j: number) => {
        return {
          catRefId: catRefId,
          name: subCat.cat,
          desc: `i: ${i} j: ${j}`,
        };
      })
      .filter(Boolean);
  });
};

export const writeSubCatToDB = async (
  jsonDB: Kishurit,
  catCollection: Category[]
) => {
  try {
    const subCatObj = await jsonOfSubCat(jsonDB, catCollection); // Wait for jsOfSubCat to complete
    const newSubCat = await SubCategoryModel.insertMany(subCatObj);
    console.log("Subcategories inserted successfully.");
    return newSubCat;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to ensure proper error handling
  }
};

export const jsonOfSubCatToDB = async (
  jsonDB: Kishurit,
  catCollection: Category[]
) => {
  try {
    return await jsonOfSubCat(jsonDB, catCollection);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const jsonOfOrgs = async (
  jsonDB: Kishurit,
  catCollection: Category[],
  subcatCollection: SubCategory[]
) => {
  if (!jsonDB.job) return [];

  return jsonDB.job.flatMap((cat: Categorie, i: number) => {
    const catRefId = findIdOfCatByName(catCollection, cat.name);
    return cat.links.flatMap((subCat: SubCategorie, j: number) => {
      const subcatRefId = findIdOfSubcatByName(subcatCollection, subCat.cat);
      return subCat.links.flatMap((org: Business, k: number) => {
        return {
          catRefId: catRefId,
          subCatRefId: subcatRefId,
          org_name: org.site_name,
          desc: `i: ${i} j: ${j} k: ${k}`,
          web_link: [org.link, org.link2, org.link3],
          facebook_link: [
            org.facebook_link1,
            org.facebook_link2,
            ...org.facebook_link3,
          ],
          linkedIn_link: [org.linkedIn_link],
          instagram_link: [org.instagram_link],
          tel: [{ tel: org.tel1 }, { tel: org.tel2 }],
          email: [{ email: org.email1 }, { email: org.email2 }],
          whatsapp: [{ tel: org.whatsapp }],
          location: org.location,
          snifim: [],
          active: true,
        };
      });
    });
  });
};
