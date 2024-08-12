export class ObjectValidationException extends Error {
  constructor(objectType?: string, objectId?: string) {
    super()
    this.name = "ObjectValidationException"
    this.message = `Could not validate object ${objectType} ${objectId || ""}.`
  }
}