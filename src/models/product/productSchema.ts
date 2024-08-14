import { z } from 'zod'

export const productSchema = z.object({
  name: z.string({
    required_error: "Name is necessary",
    invalid_type_error: "Name must be a string",
  }).max(100, { message: 'Name must be lower than 100 characters' }),

  price: z.number({
    required_error: "Price is necessary",
    invalid_type_error: "Price must be a number",
  }).positive({ message: 'Price must be positive' }).safe(),

  description: z.string({
    invalid_type_error: 'Description must be a string',
  }).max(300, { message: 'Description must be lower than 300 characters' }).optional(),

  pictures: z.array(z.string({
    invalid_type_error: "Each picture must be a string",
  })).nonempty({ message: "There must be at least one picture" }),

  color: z.array(z.string({
    required_error: "Must type at least one color",
    invalid_type_error: "Each color must be a string",
  }).transform(val => val.toUpperCase())).nonempty({ message: "There must be at least one color" }),

  fabric: z.array(z.string({
    invalid_type_error: "Each fabric must be a string",
  }).transform(val => val.toUpperCase())).nonempty({ message: "There must be at least one fabric" }).nullable(),

  category: z.array(z.string({
    required_error: "Product must be in at least one category",
    invalid_type_error: "Each category must be a string",
  }).transform(val => val.toUpperCase())).nonempty({ message: "There must be at least one category" }),

  brand: z.string({
    required_error: "Brand is necessary",
    invalid_type_error: "Brand must be a string",
  }).max(30, { message: "Brand name must be lower than 30 characters" }),

  sizeAndRemainingQuantity: z.array(z.object({
    size: z.enum(["P", "M", "G", "GG"], {
      required_error: "Size is required",
      invalid_type_error: "Size must be one of P, M, G, or GG",
    }),

    remainingQuantity: z.number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    }).nonnegative({ message: "Quantity must be non-negative" }).int().safe().default(0),
  })).nonempty({ message: "There must be at least one size and quantity" })
})