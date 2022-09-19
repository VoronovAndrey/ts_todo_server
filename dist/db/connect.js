"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGO_URI;
mongoose_1.default
    .connect(`${URI}`, {
    retryWrites: true,
    w: 'majority'
})
    .then(() => {
    console.log('connected');
})
    .catch((err) => {
    console.log(err);
});
