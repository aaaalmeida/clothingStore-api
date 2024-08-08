import express, { Request, Response } from 'express'
import { testRouter } from '@routes/test/index'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.SERVER_PORT

app.use(express.json())

app.use('/', testRouter)

app.listen(PORT, () => console.log(`server on port ${PORT}`))