const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`Ola mundo ${port}`)
})

app.listen(port, () => {
  console.log(`Servidor na porta ${port}`)
}).finally(app.close())
// import { MongoClient } from 'mongodb';
// const client = new MongoClient(url!);

// async function run() {
//   try {
//     const query = { "title": "In the Land of the Head Hunters" }
//     const projection = { title: true, genres: true, year: true }
//     console.log(await client.db('sample_mflix').collection('movies').findOne(query, { projection }))
//   } finally {
//     await client.close()
//   }
// }

// run().catch(console.dir)
