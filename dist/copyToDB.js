"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonOfOrgs = exports.jsonOfSubCatToDB = exports.writeSubCatToDB = exports.jsonOfCatToDB = exports.writeCatToDB = void 0;
const categories_model_1 = __importDefault(require("./models/categories.model"));
const subCategories_model_1 = __importDefault(require("./models/subCategories.model"));
const findIdOfCatByName = (arr, name) => arr.find((e) => e.name === name)._id;
const findIdOfSubcatByName = (arr, name) => arr.find((e) => e.name === name)._id;
Array.prototype.filterValues = function () {
    return this.filter((val) => val !== "" && val !== undefined && val !== null);
};
const jsonOfCat = (jsonDB) => {
    if (!jsonDB.job)
        return [];
    return jsonDB.job.map((data, i) => ({
        name: data.name,
        desc: data.desc.trim() !== "" ? data.desc : String(i),
    }));
};
const writeCatToDB = async (jsonDB) => {
    try {
        return await categories_model_1.default.insertMany(jsonOfCat(jsonDB));
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.writeCatToDB = writeCatToDB;
const jsonOfCatToDB = async (jsonDB) => {
    try {
        return jsonOfCat(jsonDB);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.jsonOfCatToDB = jsonOfCatToDB;
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
const jsonOfSubCat = async (jsonDB, catCollection) => {
    if (!jsonDB.job)
        return [];
    return jsonDB.job.flatMap((cat, i) => {
        const catRefId = findIdOfCatByName(catCollection, cat.name);
        return cat.links
            .map((subCat, j) => {
            return {
                catRefId: catRefId,
                name: subCat.cat,
                desc: `i: ${i} j: ${j}`,
            };
        })
            .filter(Boolean);
    });
};
const writeSubCatToDB = async (jsonDB, catCollection) => {
    try {
        const subCatObj = await jsonOfSubCat(jsonDB, catCollection); // Wait for jsOfSubCat to complete
        const newSubCat = await subCategories_model_1.default.insertMany(subCatObj);
        console.log("Subcategories inserted successfully.");
        return newSubCat;
    }
    catch (error) {
        console.error(error);
        throw error; // Rethrow the error to ensure proper error handling
    }
};
exports.writeSubCatToDB = writeSubCatToDB;
const jsonOfSubCatToDB = async (jsonDB, catCollection) => {
    try {
        return await jsonOfSubCat(jsonDB, catCollection);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.jsonOfSubCatToDB = jsonOfSubCatToDB;
const jsonOfOrgs = async (jsonDB, catCollection, subcatCollection) => {
    if (!jsonDB.job)
        return [];
    return jsonDB.job.flatMap((cat, i) => {
        const catRefId = findIdOfCatByName(catCollection, cat.name);
        return cat.links.flatMap((subCat, j) => {
            const subcatRefId = findIdOfSubcatByName(subcatCollection, subCat.cat);
            return subCat.links.flatMap((org, k) => {
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
exports.jsonOfOrgs = jsonOfOrgs;
//# sourceMappingURL=copyToDB.js.map