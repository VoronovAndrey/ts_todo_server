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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const url = process.env.MONGO_URI || '';
console.log('url', typeof url);
// Replace the uri string with your connection string.
const client = new mongodb_1.MongoClient(url);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = client.db('sample_mflix');
            const movies = database.collection('movies');
            // Query for a movie that has the title 'Back to the Future'
            const query = { title: 'Back to the Future' };
            const movie = yield movies.findOne(query);
            console.log('movie', movie);
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server runing');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
