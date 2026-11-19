import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'shresthanshi_solar';

  if (!uri) {
    return null;
  }

  // Detect unreplaced password placeholder
  if (uri.includes('<db_password>') || uri.includes('<password>') || uri.includes('YOUR_PASSWORD')) {
    console.warn('MONGODB_URI contains unreplaced password placeholder.');
    return null;
  }

  // Reuse cached connection across serverless invocations
  if (cachedClient && cachedDb) {
    try {
      return { client: cachedClient, db: cachedDb };
    } catch {
      cachedClient = null;
      cachedDb = null;
    }
  }

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
    });
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error: any) {
    console.error('MongoDB Atlas Connection Error:', error?.message || error);
    return null;
  }
}
