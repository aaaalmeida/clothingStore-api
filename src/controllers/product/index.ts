import { MongoClient } from "mongodb"
import { UndefinedMongoURLException } from "@exceptions/UndefinedMongoURLException"
import { UndefinedMongoRegexException } from "@exceptions/UndefinedMongoRegexException"
import { InvalidMongoURLException } from "@exceptions/InvalidMongoURLException"
import { productSchema } from "@models/product/index"
import { ZodError } from "zod"

const url = process.env.MONGODB_URL
const url_regex_string = process.env.MONGODB_URL_REGEX
const db_name = process.env.MONGODB_DB_NAME

const collectionName = 'products'

if (!url) throw new UndefinedMongoURLException()
if (!url_regex_string) throw new UndefinedMongoRegexException()
if (new RegExp(url_regex_string).test(url)) throw new InvalidMongoURLException()

const mongoClient = new MongoClient(url)

/*
  ADD
  FIND ONE
  FIND MANY
  FIND ALL
  PATCH
  DELETE
*/


const addProduct = async (data: object) => {
  try {
    await mongoClient.connect()
    const product = productSchema.parse(data)

    return mongoClient.db(db_name).collection(collectionName).insertOne(product)
  } catch (err) {
    if (err instanceof ZodError) throw err // TODO: melhorar tratamento de erro
  } finally {
    mongoClient.close()
  }
}

const findOneProduct = async (productId: string) => {
  try {
    await mongoClient.connect()
    return mongoClient.db(db_name).collection(collectionName).findOne({ "_id": productId })
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  } finally {
    mongoClient.close()
  }
}

const findManyProducts = async (productsId: string[]) => {
  try {
    await mongoClient.connect()

    const set = new Set()
    productsId.forEach(id => set.add(
      mongoClient.db(db_name).collection(collectionName).findOne({ _id: id })
    ))

    return set
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  } finally {
    mongoClient.close()
  }
}

const findAllProducts = async () => {
  try {
    await mongoClient.connect()
    return mongoClient.db(db_name).collection(collectionName).find()
  } catch (err) {
    console.log(err); // TODO: melhorar tratamento de erro
  } finally {
    mongoClient.close()
  }
}

const deleteProduct = async (productId: string) => {
  try {
    await mongoClient.connect()
    return mongoClient.db(db_name).collection(collectionName).deleteOne({ _id: productId })
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  } finally {
    mongoClient.close()
  }
}