import { Router, Request, Response } from 'express'
import { z, ZodError } from 'zod'

export const testRouter = Router()

const testSchema = z.object({
    id: z.number({invalid_type_error: "Id is supposed to be a number", required_error: "Id is necessary"}).int(),
    name: z.string({invalid_type_error: "Name is supposed to be a string"}).nullable()
})

testRouter.get("/test", (req: Request, res: Response) => {
    try {
        const data = testSchema.parse(req.body)
        res.send(data)
    } catch (err) {
        if(err instanceof ZodError)
            res.status(400).send(err.issues[0].message)
    }
})

testRouter.get("/", (req: Request, res: Response) => {
    res.send('Hello World')
})
