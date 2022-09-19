"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../controllers/Todo"));
const router = express_1.default.Router();
router.get('/get/', Todo_1.default.readAll);
router.post('/add/', Todo_1.default.addNew);
router.post('/delete/', Todo_1.default.deleteById);
router.patch('/update/', Todo_1.default.updateById);
module.exports = router;
