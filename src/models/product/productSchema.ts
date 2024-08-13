import { z } from 'zod'

export const productSchema = z.object({
  name: z.string({
    required_error: "Name is necessary",
    invalid_type_error: "Name must be a string",
    message: "NAME"
  })
    .max(100, { message: 'Name must be lower than 100 characters' }),
  price: z.number({
    required_error: "Price is necessary",
    invalid_type_error: "Price must be a number",
    message: "PRICE"
  })
    .positive({ message: 'Price must be positive' }).safe(),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    message: "DESCRIPTION"
  })
    .max(300, { message: 'Description must be lower than 300 characters' })
    .optional(),
  pictures: z.string({
    invalid_type_error: "Pictures must be a url array",
    message: "PICTURES"
  })
    .url({ message: "Please input a URL" })
    .array().nonempty(),
  color: z.string({
    required_error: "Must type atleast one color",
    invalid_type_error: "Color must be a string array",
    message: "COLOR"
  }).array().nonempty(),
  fabric: z.string({
    invalid_type_error: "Fabric must be a string",
    message: "FABRIC"
  }).optional().nullable(),
  category: z.string({
    required_error: "Product must be in atleast one category",
    invalid_type_error: "Category must be a string array",
    message: "CATEGORY"
  }).toUpperCase().array().nonempty(),
  brand: z.string({
    required_error: "Must type a brand",
    invalid_type_error: "Brand must be a string",
    message: "BRAND"
  })
    .max(30, { message: "Brand name must be lower than 30 characters" }),
  sizeAndRemainingQuantity: z.object({
    size: z.enum(["P", "M", "G", "GG"],
      { required_error: "Size is required", invalid_type_error: "Size not compatible", message: "SIZE" }),
    remainingQuantity: z.number(
      { required_error: "Quantity is required", invalid_type_error: "Quantity must be a number", message: "QTD" })
      .nonnegative().int().safe().default(0)
  }).array().nonempty(),
})
