import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb"


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const url = process.env.MONGO_URI || '';
console.log('url', typeof url);

// Replace the uri string with your connection string.

const client = new MongoClient(url);
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log('movie', movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server runing');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

