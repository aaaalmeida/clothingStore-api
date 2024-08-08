export class InvalidMongoURLException extends Error {
  constructor() {
    super()
    this.name = "InvalidMongoUrlError"
  }
}