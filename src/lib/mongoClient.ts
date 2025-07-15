import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("Please define the MONGODB_URI in your .env.local file")
}

// Reuse connection if already established (important for serverless)
declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

let client: MongoClient
const clientPromise = global._mongoClientPromise ?? (() => {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
  return global._mongoClientPromise
})()

export async function getMongoCollection() {
  const client = await clientPromise
  const db = client.db("blogSummariser")
  return db.collection("fullBlogs")
}
