import { z } from 'zod'

const productSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }).max(100, {message: 'Name must be lower than 100 characters'}),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number"
  }).positive({ message: 'Price must be positive' }).safe(),
  description: z.string().max(300, { message: 'Description must be lower than 300 characters' }).nullable(),
  pictures: z.string().url().array(),
})

