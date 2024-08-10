export class ObjectNotFoundException extends Error {
  constructor(objectType: string, objectId?: string) {
    super()
    this.name = "ObjectNotFoundException"
    this.message = `Could not find object ${objectType}${objectId}.`
  }
}