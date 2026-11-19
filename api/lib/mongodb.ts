import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'shresthanshi_solar';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
  if (!clientPromise) {
    return null;
  }
  try {
    const connectedClient = await clientPromise;
    const db = connectedClient.db(dbName);
    return { client: connectedClient, db };
  } catch (error) {
    console.error('MongoDB Atlas Connection Error:', error);
    return null;
  }
}

export default clientPromise;
