export class UndefinedMongoURLException extends Error {
  constructor() {
    super()
    this.name = "UndefinedMongoUrlError"
    this.message = "MongoDB URL is not defined."
  }
}