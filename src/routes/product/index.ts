import { Router, Request, Response } from 'express'
import { productSchema } from "@models/product/productSchema"
import { addProduct, deleteProduct, findAllProducts, findManyProducts, findOneProduct, updateProduct } from '@controllers/product'
export const productRouter = Router()

productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = req.body
    await addProduct(data)
  } catch (err) {
    throw err // TODO: melhorar tratamento de erro
  }
})

productRouter.get('/', async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    
  }
})