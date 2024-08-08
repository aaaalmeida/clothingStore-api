import { Router, Request, Response } from 'express'

export const testRouter = Router()

testRouter.get("/test", (req: Request, res: Response) => {
    const queries = req.query
    res.send(queries)
})

testRouter.get("/", (req: Request, res: Response) => {
    res.send('Hello World')
})
