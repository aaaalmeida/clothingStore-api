export class UndefinedMongoURLException extends Error {
  constructor() {
    super()
    this.name = "UndefinedMongoUrlError"
  }
}