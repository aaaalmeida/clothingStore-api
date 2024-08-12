require('dotenv').config()

import { MongoClient, ObjectId } from "mongodb"
import { UndefinedMongoURLException } from "@exceptions/UndefinedMongoURLException"
import { UndefinedMongoRegexException } from "@exceptions/UndefinedMongoRegexException"
import { InvalidMongoURLException } from "@exceptions/InvalidMongoURLException"
import { productSchema } from "@models/product/productSchema"
import { ZodError } from "zod"
import { CloseMongoConnectionException } from "@exceptions/CloseMongoConnectionException"
import { IProduct } from "@models/product/IProduct"
import { ObjectValidationException } from "@exceptions/ObjectValidationException"
import { ObjectNotFoundException } from "@exceptions/ObjectNotFoundException"

const URL = process.env.MONGODB_URL
const URL_REGEX_STRING = process.env.MONGODB_URL_REGEX
const DB_NAME = process.env.MONGODB_DB_NAME

const collectionName = 'products'


if (!URL) throw new UndefinedMongoURLException()
if (!URL_REGEX_STRING) throw new UndefinedMongoRegexException()
if (new RegExp(URL_REGEX_STRING).test(URL)) throw new InvalidMongoURLException()

const mongoClient = new MongoClient(URL)

/*
  X ADD
  X FIND ONE
  FIND MANY
  FIND ALL
  PATCH
  DELETE
*/

const addProduct = async (data: IProduct) => {
  try {
    await mongoClient.connect()
    const product = productSchema.parse(data)
    return await mongoClient.db(DB_NAME).collection(collectionName).insertOne(product)
  } catch (err) {
    if (err instanceof ZodError) {
      throw err
    }
    // throw new ObjectValidationException('Product')
  } finally {
    if (mongoClient)
      try {
        await mongoClient.close()
      } catch (err) {
        throw new CloseMongoConnectionException()
      }
  }
}

const findOneProductById = async (id: string) => {
  try {
    await mongoClient.connect()
    const product = await mongoClient.db(DB_NAME).collection(collectionName).findOne({ _id: new ObjectId(id) })
    if (!product) throw new ObjectNotFoundException("Product", id)
    return product
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  } finally {
    if (mongoClient)
      try {
        await mongoClient.close()
      } catch (err) {
        throw new CloseMongoConnectionException()
      }
  }
}

const findManyProducts = async (productsId: string[]) => {
  try {
    await mongoClient.connect()
    const set = new Set()
    productsId.forEach(id => {
      const product = mongoClient.db(DB_NAME).collection(collectionName).findOne({ _id: new ObjectId(id) })
      if (product) set.add(product)
    })
    // FIXME: pensar ne uma logica para cada id não encontrado
    if (set.size === 0) throw new ObjectNotFoundException("Product List")
    return set
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  } finally {
    if (mongoClient)
      try {
        await mongoClient.close()
      } catch (err) {
        throw new CloseMongoConnectionException()
      }
  }
}

const findAllProducts = async () => {
  try {
    await mongoClient.connect()
    const data = mongoClient.db(DB_NAME).collection(collectionName).find()
    console.log(data)
    return data
  } catch (err) {
    console.log(err); // TODO: melhorar tratamento de erro
  } finally {
    if (mongoClient)
      try {
        await mongoClient.close()
      } catch (err) {
        throw new CloseMongoConnectionException()
      }
  }
}

const deleteProduct = async (productId: string) => {
  try {
    await mongoClient.connect()
    await mongoClient.db(DB_NAME).collection(collectionName).findOneAndDelete({ _id: new ObjectId(productId) })
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  } finally {
    if (mongoClient)
      try {
        await mongoClient.close()
      } catch (err) {
        throw new CloseMongoConnectionException()
      }
  }
}

const updateProduct = async (productId: string, newProduct: IProduct) => {
  try {
    await mongoClient.connect()
    const product = productSchema.parse(newProduct)
    return await mongoClient.db(DB_NAME).collection(collectionName).updateOne({ _id: new ObjectId(productId) }, product)
  } catch (err) {
    if (err instanceof ZodError) throw new ObjectValidationException("Product", productId)
  } finally {
    if (mongoClient)
      try {
        await mongoClient.close()
      } catch (err) {
        throw new CloseMongoConnectionException()
      }
  }
}

export { addProduct, findOneProductById, findManyProducts, findAllProducts, deleteProduct, updateProduct }