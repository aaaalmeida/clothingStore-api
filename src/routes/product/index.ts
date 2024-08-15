import { Router, Request, Response } from 'express'
import { addProduct, deleteProduct, findAllProducts, findManyProducts, findOneProductById, updateProduct } from '@controllers/product'
import { IProduct } from '@models/product/IProduct'

export const productRouter = Router()

// add product
// ex: POST {domain}/
// use req.body = productSchema
productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body as IProduct
    res.status(201).send(await addProduct(data))
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
    res.status(500).send("Internal Error")
  }
})

// find many products by id
// ex: GET {domain}/search?productId=[pd1]&productId=[pd2]&productId=[pd3]... (Query String Parameters)
productRouter.get('/search', async (req: Request, res: Response) => {
  try {
    let productIds = req.query.productId as string[]

    if (!Array.isArray(productIds))
      productIds = [req.query.productId as string]

    if (!productIds || productIds.length === 0) {
      return res.status(400).send({ error: 'Product IDs are required' })
    }

    const products = await findManyProducts(productIds)
    res.status(200).send(products)
  } catch (err) {
    console.log(err)
    res.status(500).send({ err })
  }
})

// find all products by id
// ex: GET {domain}/allProducts
productRouter.get('/allProducts', async (req: Request, res: Response) => {
  try {
    const data = await findAllProducts()
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Error")
  }
})

// find product by id
// ex: GET {domain}/[productId] (Route Parameters)
productRouter.get('/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    res.status(200).send(await findOneProductById(productId))
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
    res.status(500).send("Internal Error")
  }
})

productRouter.patch('/:productId', async (req: Request, res, Response) => {
  try {
    const { productId } = req.params
    
    res.status(202)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Error")
  }
})
