import { MongoClient } from "mongodb"
import { InvalidMongoURLException, UndefinedMongoURLException} from "../../exceptions/MongoUrlException"

import dotenv from 'dotenv'
dotenv.config();

const url = process.env.MONGODB_URL
const url_regex = process.env.MONGODB_URL_REGEX

console.log(url)
console.log(url_regex)
// if (!url) throw new UndefinedMongoURLException();

// if (!url_regex || !url_regex.test(url)) throw new Error("MongoDB URL invalid.");


// try {
//   const client = new MongoClient(url).

// } catch