import { Router, Request, Response } from 'express'
import { productSchema } from "@models/product/index"

export const productRouter = Router()

productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const data = productSchema.parse(req.body)

  } catch (error) {

  }
})