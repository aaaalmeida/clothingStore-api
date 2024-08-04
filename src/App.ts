import dotenv from 'dotenv'
dotenv.config();

const port = process.env.SERVER_PORT;
const url = process.env.MONGODB_URL;

if (!url) {
  throw new Error("MONGODB_URL not defined");
}

import express from 'express';
import { MongoClient } from 'mongodb';
const mongoClient = new MongoClient(url!);

const run = async () => {
  try {
    await mongoClient.connect();
    const query = { "title": "In the Land of the Head Hunters" }
    const projection = { title: true, genres: true, year: true }
    const response = await mongoClient.db('sample_mflix').collection('movies').findOne(query, { projection })
    
    return response
  } catch (err) {
    console.dir(err)
  }
  finally {
    await mongoClient.close()
  }
}

const server = express()

server.get('/', async (req, res) => {
  const movie = await run()
  res.send(`Ola mundo ${JSON.stringify(movie)}`)
})

server.listen(port, () => {
  console.log(`Servidor na porta ${port}`)
})
