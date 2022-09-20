"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const TodoController_1 = __importDefault(require("../controllers/TodoController"));
const router = express_1.default.Router();
router.get('/get/', TodoController_1.default.readAll);
router.post('/add/', TodoController_1.default.addNew);
router.delete('/delete/', TodoController_1.default.deleteById);
router.patch('/update/', TodoController_1.default.updateById);
module.exports = router;
