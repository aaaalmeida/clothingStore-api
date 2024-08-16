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
import { InvalidObjectIdException } from "@exceptions/InvalidObjectIdException"

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
  } catch (err) { // TODO: melhorar tratamento de erro
    console.log(err)
  } finally {
    try {
      await mongoClient.close()
    } catch (err) {
      throw new CloseMongoConnectionException()
    }
  }
}

// const findManyProducts = async (productsId: string[]) => {
//   try {
//     await mongoClient.connect()
//     const set = new Set()
//     productsId.forEach(async id => {

//       const product = await mongoClient.db(DB_NAME).collection(collectionName).findOne({ _id: new ObjectId(id) })
//       if (product) set.add(product)
//     })
//     // FIXME: pensar ne uma logica para cada id não encontrado
//     if (set.size === 0) throw new ObjectNotFoundException("Product List")
//     return set
//   } catch (err) { // TODO: melhorar tratamento de erro
//     console.log(err)
//   } finally {
//     try {
//       await mongoClient.close()
//     } catch (err) {
//       throw new CloseMongoConnectionException()
//     }
//   }
// }

const findManyProducts = async (productIds: string[]) => {
  try {
    await mongoClient.connect()

    const objectIds = productIds.map(id => {
      if (ObjectId.isValid(id)) {
        return new ObjectId(id)
      } else {
        throw new InvalidObjectIdException()
      }
    })

    const products = await mongoClient.db(DB_NAME).collection(collectionName).find({ _id: { $in: objectIds } }).toArray()

    return products
  } catch (err) {
    throw err
  } finally {
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
    const data = await mongoClient.db(DB_NAME).collection(collectionName).find({}).toArray()   
    return data
  } catch (err) { // TODO: melhorar tratamento de erro
    console.log(err)
    return []
  } finally {
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
  } catch (err) { // TODO: melhorar tratamento de erro
    console.log(err)
  } finally {
    try {
      await mongoClient.close()
    } catch (err) {
      throw new CloseMongoConnectionException()
    }
  }
}

const updateProduct = async (productId: string, updateData: Partial<IProduct>) => {
  try {
    await mongoClient.connect()
    
    // filtra chaves não pertencentes a produto
    const validUpdateData = Object.keys(updateData)
      .filter(key => key in updateData && updateData[key as keyof IProduct] !== undefined)
      .reduce((obj, key) => {
        return { ...obj, [key]: updateData[key as keyof IProduct] }
      }, {})
      
      const result = await mongoClient.db(DB_NAME).collection(collectionName).updateOne({ _id: new ObjectId(productId) }, { $set: validUpdateData })

    if (result.matchedCount === 0) {
      throw new Error('Product not found')
    }

    return result
  } catch (err) { // TODO: melhorar tratamento de erro
    if (err instanceof ZodError) throw new ObjectValidationException("Product", productId)
  } finally {
    try {
      await mongoClient.close()
    } catch (err) {
      throw new CloseMongoConnectionException()
    }
  }
}

export { addProduct, findOneProductById, findManyProducts, findAllProducts, deleteProduct, updateProduct }