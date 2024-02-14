"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSubCatToDB = exports.jsonOfSubCatToDB = exports.writeCatToDB = exports.jsonOfCatToDB = void 0;
const categories_model_1 = __importDefault(require("./models/categories.model"));
const subCategories_model_1 = __importDefault(require("./models/subCategories.model"));
const findIdOfCatByName = (arr, name) => arr.find((e) => e.name === name)._id;
const findIdOfSubcatByName = (arr, name) => arr.find((e) => e.name === name)._id;
Array.prototype.filterValues = function () {
    return this.filter((val) => val !== "" && val !== undefined && val !== null);
};
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
const jsonOfCatToDB = (jsonDB) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonOfCat(jsonDB);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.jsonOfCatToDB = jsonOfCatToDB;
const writeCatToDB = (jsonDB) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // var db1 = db.default(process.env.DB_NAME);
        const catObj = jsonOfCat(jsonDB); // Wait for jsOfSubCat to complete
        var newCat = yield (categories_model_1.default === null || categories_model_1.default === void 0 ? void 0 : categories_model_1.default.insertMany(catObj));
        console.log("Categories inserted successfully.");
        return newCat;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.writeCatToDB = writeCatToDB;
const jsonOfSubCat = (jsonDB, catCollection) => {
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
const jsonOfSubCatToDB = (jsonDB, catCollection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonOfSubCat(jsonDB, catCollection);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.jsonOfSubCatToDB = jsonOfSubCatToDB;
const writeSubCatToDB = (jsonDB, catCollection) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //var db1 = db.default(process.env.DB_NAME);
        const subCatObj = jsonOfSubCat(jsonDB, catCollection); // Wait for jsOfSubCat to complete
        var newSubCat = yield ((_a = (0, subCategories_model_1.default)()) === null || _a === void 0 ? void 0 : _a.insertMany(subCatObj));
        console.log("Subcategories inserted successfully.");
        return newSubCat;
    }
    catch (error) {
        console.error(error);
        throw error; // Rethrow the error to ensure proper error handling
    }
});
exports.writeSubCatToDB = writeSubCatToDB;
// const jsonOfOrgs = (
//   jsonDB: Kishurit,
//   catCollection: Category[],
//   subcatCollection: SubCategory[]
// ) => {
//   if (!jsonDB.job) return [];
//   return jsonDB.job.flatMap((cat: Categorie, i: number) => {
//     const catRefId = findIdByName(catCollection, cat.name);
//     return cat.links.flatMap((subCat: SubCategorie, j: number) => {
//       const subcatRefId = findIdByName(subcatCollection, subCat.cat);
//       return subCat.links.flatMap((org: Business, k: number) => {
//         return {
//           catRefId: catRefId,
//           subCatRefId: subcatRefId,
//           org_name: org.site_name,
//           desc: `i: ${i} j: ${j} k: ${k}`,
//           web_link: [org.link, org.link2, org.link3],
//           facebook_link: [
//             org.facebook_link1,
//             org.facebook_link2,
//             ...org.facebook_link3,
//           ],
//           linkedIn_link: [org.linkedIn_link],
//           instagram_link: [org.instagram_link],
//           tel: [{ tel: org.tel1 }, { tel: org.tel2 }],
//           email: [{ email: org.email1 }, { email: org.email2 }],
//           whatsapp: [{ tel: org.whatsapp }],
//           location: org.location,
//           snifim: [],
//           active: true,
//         };
//       });
//     });
//   });
// };
// export const jsonOfOrgsToDb = (
//   jsonDB: Kishurit,
//   catCollection: Category[],
//   subcatCollection: SubCategory[]
// ) => {
//   try {
//     return jsonOfOrgs(jsonDB, catCollection, subcatCollection);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// export const writeOrgsToDB = async (jsonDB: Kishurit) => {
//   try {
//     var db1 = db.default(process.env.DB_NAME);
//     return await CategoriesModel(db1)?.insertMany(jsonOfCat(jsonDB));
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
// const jsonOfSubCat = async (
//   jsonDB: Kishurit,
//   catCollection: Category[]
// ): Promise<SubCategory[]> => {
//   const subCatObj: SubCategory[] = _.cloneDeep(jsonDB).job.reduce(
//     (accumulator: SubCategory[], cat: Categorie) => {
//       const subCategories: SubCategory[] = cat.links.reduce(
//         (accumulator1: any[], subCat: SubCategorie, j) => {
//           const catRefId = findIdByName(catCollection, cat.name);
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
//# sourceMappingURL=copyToDB.js.map