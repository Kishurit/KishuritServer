"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const orgSchema = new mongoose_1.Schema({
    catRefId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Categry", refPath: "KishuritForAll" },
    subCatRefId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "SubCategory", refPath: "KishuritForAll" },
    org_name: { type: String, required: true },
    desc: { type: String, required: false },
    web_link: { type: [String], default: [] },
    facebook_link: { type: [String], default: [] },
    linkedIn_link: { type: [String], default: [] },
    instagram_link: { type: [String], default: [] },
    email: { type: [String], required: false },
    tel: [
        {
            type: [
                {
                    tel: { type: String, required: true },
                    owner: { type: String, required: false }, // optional owner field
                },
            ],
            required: false,
        },
    ],
    whatsapp: [
        {
            type: [
                {
                    tel: { type: String, required: true },
                    owner: { type: String, required: false }, // optional owner field
                },
            ],
            required: false,
        },
    ],
    location: {
        type: String,
        enum: ["", "north", "south", "center", "yosh", "website"],
        required: true,
    },
    address: { type: String },
    snifim: [
        {
            type: [
                {
                    name: { type: String },
                    tel: [
                        {
                            tel: { type: String, required: true },
                            owner: { type: String }, // optional owner field
                        },
                    ],
                    whatsapp: [
                        {
                            tel: { type: String, required: true },
                            owner: { type: String }, // optional owner field
                        },
                    ],
                    email: { type: [String] },
                    location: {
                        type: String,
                        enum: ["north", "south", "center", "yosh", "website"],
                        required: true,
                    },
                    city: { type: String, required: true },
                    address: { type: String, required: true },
                },
            ],
            required: false,
        },
    ],
    active: { type: Boolean, required: true, default: false },
});
orgSchema.plugin(mongoose_unique_validator_1.default, "Error, expected {PATH} to be unique.");
//orgSchema.plugin(autopopulate);
const orgsModel = mongoose_1.default.model("orgs", orgSchema);
exports.default = orgsModel;
//# sourceMappingURL=orgs.model.js.map