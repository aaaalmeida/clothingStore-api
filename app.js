const url = 'mongodb+srv://arthurfonsecaalmeida:ejNzS1mxaUFsZasj@cluster0.zcdzc2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const { MongoClient } = require('mongodb');
const client = new MongoClient(url);
async function run() {
  try {
    const database = client.db("db1")
    const collection = database.collection('collection1')

    const object = { name: 'esther', age: 12 }
    const insert = await collection.insertOne(object)

    console.log(insert)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
