require('dotenv/config')
const url = process.env.MONGODB_URL;

import { MongoClient } from 'mongodb';
const client = new MongoClient(url!);
async function run() {
  try {
    const query = { "title": "In the Land of the Head Hunters" }
    const projection = { title: true, genres: true, year: true }
    console.log(await client.db('sample_mflix').collection('movies').findOne(query, { projection }))
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
