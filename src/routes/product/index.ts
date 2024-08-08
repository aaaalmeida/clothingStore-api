import express, { Router } from 'express'
import { productSchema } from "@models/product/index"
const router = express.Router()

// router.get('/product', async (req, res) => {
//   try {
//     const data = productSchema.parse(req.body)

//   } catch (error) {

//   }
// })