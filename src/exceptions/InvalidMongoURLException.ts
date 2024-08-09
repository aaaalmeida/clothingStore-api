export class InvalidMongoURLException extends Error {
  constructor() {
    super()
    this.name = "InvalidMongoUrlError"
    this.message = "MongoDB URL is invalid."
  }
}