// if(!mongo_url) throw new Error("MongoDB URL not defined.");


export class UndefinedMongoURLException extends Error {
  constructor() {
    super();
    this.name = "UndefinedMongoUrlError";
  }
}

export class InvalidMongoURLException extends Error {
  constructor() {
    super();
    this.name = "InvalidMongoUrlError";
  }
}