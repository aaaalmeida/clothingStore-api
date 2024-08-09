export class CloseMongoConnectionException extends Error {
  constructor() {
    super()
    this.name = "CloseMongoConnectionError"
    this.message = "Could not close Mongo connection."
  }
}