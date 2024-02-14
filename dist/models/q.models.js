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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runExample = exports.OrderModel = exports.CustomerModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CustomerSchema = new mongoose_1.Schema({
    customerType: String,
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: "customerType",
    },
});
// Схемы Mongoose
const PrivateIndividualSchema = new mongoose_1.Schema({
    name: String,
    email: String,
});
const CompanySchema = new mongoose_1.Schema({
    companyName: String,
    contactEmail: String,
});
const FreelancerSchema = new mongoose_1.Schema({
    freelancerName: String,
    services: [String],
});
const OrderSchema = new mongoose_1.Schema({
    customerType: String,
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: "customerType",
    },
    amount: Number,
});
// Модели Mongoose
exports.CustomerModel = mongoose_1.default.model("Customer", CustomerSchema);
const PrivateIndividualModel = mongoose_1.default.model("PrivateIndividual", PrivateIndividualSchema);
const CompanyModel = mongoose_1.default.model("Company", CompanySchema);
const FreelancerModel = mongoose_1.default.model("Freelancer", FreelancerSchema);
exports.OrderModel = mongoose_1.default.model("Order", OrderSchema);
// Функция, которая создает новый заказ
function createOrder(customerType, customerId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrder = new exports.OrderModel({
            customerType,
            customer: customerId,
            amount,
        });
        yield newOrder.save();
        return newOrder;
    });
}
function createCustomer(customerType, customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCustomer = new exports.CustomerModel({
            customerType,
            customer: customerId,
        });
        yield newCustomer.save();
        return newCustomer;
    });
}
// Этот раздел подключится к базе данных и создаст примеры.
function runExample() {
    return __awaiter(this, void 0, void 0, function* () {
        // Создание клиентов
        const johnDoe = yield PrivateIndividualModel.create({
            name: "John Doe",
            email: "john.doe@example.com",
        });
        const acmeCorp = yield CompanyModel.create({
            companyName: "Acme Corp",
            contactEmail: "info@acme.com",
        });
        const janeFreelancer = yield FreelancerModel.create({
            freelancerName: "Jane",
            services: ["design", "development"],
        });
        const cust1 = yield createCustomer("PrivateIndividual", johnDoe._id);
        const cust2 = yield createCustomer("Company", acmeCorp._id);
        const cust3 = yield createCustomer("Freelancer", janeFreelancer._id);
        // Создание заказов
        const order1 = yield createOrder("PrivateIndividual", cust1.customer, 100);
        const order2 = yield createOrder("Company", cust2.customer, 200);
        const order3 = yield createOrder("Freelancer", cust3.customer, 300);
    });
}
exports.runExample = runExample;
//# sourceMappingURL=q.models.js.map