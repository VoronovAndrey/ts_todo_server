"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import { MongoClient } from "mongodb"
const mongoose_1 = __importDefault(require("mongoose"));
const TodoRoutes_1 = __importDefault(require("./routes/TodoRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT;
const URI = process.env.MONGO_URI;
// connect to DB, and start server after connect
mongoose_1.default
    .connect(`${URI}`, {
    retryWrites: true,
    w: 'majority',
    dbName: 'TasksDb',
})
    .then(() => {
    console.log('connected');
    serverStart();
})
    .catch((err) => {
    console.log(err);
});
const serverStart = () => {
    app.use((req, res, next) => {
        console.log(`Request method - [${req.method}] - url [${req.url}]`);
        res.on('finish', () => {
            console.log(`onFinish: Request method - [${req.method}] - url [${req.url}], -  status [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // Routes
    app.use('/tasks', TodoRoutes_1.default);
    app.get('/ping', (req, res) => {
        return res.status(200).json({ message: 'pong' });
    });
    // Error handling
    app.use((req, res, next) => {
        return res.status(404).json({ message: 'not found' });
    });
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};
