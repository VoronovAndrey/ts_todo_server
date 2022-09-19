import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

// import { MongoClient } from "mongodb"
import mongoose from "mongoose";
import todoRoutes from './routes/TodoRoutes'



dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT;


const URI = process.env.MONGO_URI;

// connect to DB, and start server after connect
mongoose
  .connect(`${URI}`, {
    retryWrites: true,
    w: 'majority',
    dbName: 'TasksDb',
  })
  .then(() => {
    console.log('connected');
    serverStart()

  })
  .catch((err) => {
    console.log(err);

  })

const serverStart = () => {
  app.use((req: Request, res: Response, next) => {
    console.log(`Request method - [${req.method}] - url [${req.url}]`);

    res.on('finish', () => {
      console.log(`onFinish: Request method - [${req.method}] - url [${req.url}], -  status [${res.statusCode}]`);

    })

    next()
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  /** Rules of our API */
  app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  app.use('/tasks', todoRoutes)

  
  app.get('/ping', (req: Request, res: Response) => {
    return res.status(200).json({message: 'pong'})
  })

  // Error handling
  app.use((req: Request, res: Response, next) => {
    return res.status(404).json({ message: 'not found' })
  })



  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

// Replace the uri string with your connection string.

// const client = new MongoClient(url);
// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);
//     console.log('movie', movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server runing');
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

