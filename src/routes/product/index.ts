import { Router, Request, Response } from 'express'
import { addProduct, deleteProductById, findAllProducts, findManyProducts, findOneProductById, updateProduct } from '@controllers/product'
import { IProduct } from '@models/product/IProduct'

export const productRouter = Router()

// add product
// ex: POST {domain}/
// req.body = productSchema (Body Parameters)
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

    const response = await findManyProducts(productIds)

    if(response.length === 0)
      res.status(404).send({message: 'Products not found'})

    res.status(200).send(response)
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

// update product by id
// ex: GET {domain}/[productId] (Path Parameters)
// req.body = productSchema (Body Parameters)
productRouter.patch('/:productId', async (req: Request, res, Response) => {
  try {
    const { productId } = req.params
    const updatedData = req.body

    const result = await updateProduct(productId, updatedData)

    if (result!.matchedCount === 0) {
      return res.status(404).send({ message: 'Product not found' })
    }

    res.status(200).send({ message: `Product ${productId} updated` })
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Error")
  }
})

// delete product by id
// ex: DELETE {domain}/[productId] (Path Parameters)
productRouter.delete('/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await deleteProductById(productId)

    if (result!.deletedCount === 0)
      res.status(404).send({ message: 'Product not found' })

    res.status(200).send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Error")
  }
})

// find product by id
// ex: GET {domain}/[productId] (Path Parameters)
productRouter.get('/:productId', async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    res.status(200).send(await findOneProductById(productId))
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
    res.status(500).send("Internal Error")
  }
})