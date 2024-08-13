import { Router, Request, Response } from 'express'
import { addProduct, deleteProduct, findAllProducts, findManyProducts, findOneProductById, updateProduct } from '@controllers/product'

export const productRouter = Router()

// FIXME:
// add product
// ex: POST {domain}/
// body: { "productId": string }
productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body._id
    res.status(201).send(await addProduct(data))
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
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
  }
})

// TODO: testar
// find many products by id
// ex: GET {domain}/search?id=[productId1],[productId2],[productId3]... (Query String Parameters)
productRouter.get('/search', async (req: Request, res: Response) => {
  try {
    const data = req.query.productId as string[]
    res.status(200).send(await findManyProducts(data))
  } catch (err) {
    console.log(err) // TODO: melhorar tratamento de erro
  }
})


// TODO: testar
// find all products by id
// ex: GET {domain}/allProducts
productRouter.get('/allProducts', async (req: Request, res: Response) => {
  try {
    const data = await findAllProducts()
    console.log(data);
    
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
  }
})