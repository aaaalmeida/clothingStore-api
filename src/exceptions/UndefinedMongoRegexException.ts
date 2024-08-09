export class UndefinedMongoRegexException extends Error {
  constructor() {
    super()
    this.name = "UndefinedMongoRegexError"
    this.message = "MongoDB Regex is not defined."
  }
}