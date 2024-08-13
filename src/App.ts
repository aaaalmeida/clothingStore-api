require('dotenv').config()

import express from 'express'
import { testRouter } from '@routes/test'
import { productRouter } from "@routes/product"
import {findAllProducts} from "@controllers/product/index"
const app = express()

const PORT = process.env.SERVER_PORT

app.use(express.json())

app.use('/test', testRouter)
app.use('/product', productRouter)

app.listen(PORT, () => console.log(`server on port ${PORT}`))