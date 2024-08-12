import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string({ required_error: "NAME" })
    .max(100, { message: 'Name must be lower than 100 characters' }),
  price: z
    .number({
      required_error: "PRICE",
      invalid_type_error: "Price must be a number"
    })
    .positive({ message: 'Price must be positive' }).safe(),
  description: z
    .string({"message": "DESCRIPTION"})
    .max(300, { message: 'Description must be lower than 300 characters' })
    .nullable(),
  pictures: z.string({"message": "PICTURES"})
    .url({ message: "Please input a URL" })
    .array().nonempty().nullable(),
  color: z.string({ message: "COLOR" }).array().nonempty(),
  fabric: z.string({ message: "FABRIC" }).optional(),
  category: z.string({ message: "CATEGORY" }).toUpperCase().array().nonempty(),
  brand: z
    .string({ message: "BRAND" })
    .max(30, { message: "Brand name must be lower than 30 characters" }),
  sizeAndRemainingQuantity: z
    .object({
      size: z.enum(['P', 'M', 'G', 'GG'], { message: "SIZE" }),
      remainingQuantity: z.number({ message: "QTD" }).nonnegative().int().safe().default(0)
    }),
})
