import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string({
      required_error: "Name is necessary",
      invalid_type_error: "Name must be a string"
    })
    .max(100, { message: 'Name must be lower than 100 characters' }),
  price: z
    .number({
      required_error: "Price is necessary",
      invalid_type_error: "Price must be a number"
    })
    .positive({ message: 'Price must be positive' }).safe(),
  description: z
    .string({
      invalid_type_error: 'Description must be a string'
    })
    .max(300, { message: 'Description must be lower than 300 characters' })
    .optional(),
  pictures: z
    .string({
      invalid_type_error: "Pictures must be a url array"
    })
    .url({ message: "Please input a URL" })
    .array().nonempty(),
  color: z.string({ invalid_type_error: "Color must be a string array" }).array().nonempty(),
  fabric: z.string({ invalid_type_error: "Fabric must be a string" }).optional().nullable(),
  category: z.string({ invalid_type_error: "Category must be a string array" }).toUpperCase().array().nonempty(),
  brand: z
    .string({ invalid_type_error: "Brand must be a string" })
    .max(30, { message: "Brand name must be lower than 30 characters" }),
  sizeAndRemainingQuantity: z
    .object({
      size: z.enum(['P', 'M', 'G', 'GG'], { invalid_type_error: "Size not compatible" }),
      remainingQuantity: z.number({ invalid_type_error: "Quantity must be a number" }).nonnegative().int().safe().default(0)
    }),
})
