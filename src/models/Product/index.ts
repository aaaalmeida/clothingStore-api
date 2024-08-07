import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .max(100, { message: 'Name must be lower than 100 characters' }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number"
    })
    .positive({ message: 'Price must be positive' }).safe(),
  description: z
    .string()
    .max(300, { message: 'Description must be lower than 300 characters' })
    .nullable(),
  pictures: z.string()
    .url({ message: "Please input a URL" })
    .startsWith("https://", { message: "Must provide a secure URL" })
    .array().nonempty(),
  color: z.string({ message: "Must input at least one color" }).array().nonempty(),
  fabric: z.string().optional(),
  // size: z.enum(['P', 'M', 'G', 'GG']),
  category: z.string().toUpperCase().array().nonempty(),
  brand: z
    .string({ required_error: "Brand is required" })
    .max(30, { message: "Brand name must be lower than 30 characters" }),
  sizeAndRemainingQuantity: z
    .object({
      size: z.enum(['P', 'M', 'G', 'GG']),
      remainingQuantity: z.number().nonnegative().int().safe().default(0)
    }),

})
