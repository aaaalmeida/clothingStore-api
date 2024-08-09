export type IProduct = {
  name: string,
  price: number,
  description?: string,
  pictures: string[],
  color: string[],
  fabric?: string,
  category: string[],
  brand: string,
  sizeAndRemainingQuantity: {
    size: "P" | "M" | "G" | "GG",
    remainingQuantity: number
  }
}