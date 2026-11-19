import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function getDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'shresthanshi_solar';

  if (!uri || uri.includes('<') || uri.includes('YOUR_PASSWORD')) {
    return null;
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 6000,
      serverSelectionTimeoutMS: 6000,
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

function sendJson(res: any, status: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.end(JSON.stringify(data));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return sendJson(res, 200, {
      connected: false,
      configured: false,
      message: 'MONGODB_URI is not set in environment variables. Running in local storage mode.',
    });
  }

  if (uri.includes('<') || uri.includes('YOUR_PASSWORD')) {
    return sendJson(res, 200, {
      connected: false,
      configured: false,
      placeholder: true,
      message: 'Please replace YOUR_PASSWORD with your actual database user password in Vercel.',
    });
  }

  const start = Date.now();

  try {
    const dbConnection = await getDatabase();

    if (!dbConnection) {
      return sendJson(res, 200, {
        connected: false,
        configured: true,
        message: 'Could not connect to MongoDB Atlas. Please verify password and IP Access (0.0.0.0/0).',
      });
    }

    const { db } = dbConnection;
    await db.command({ ping: 1 });
    const latencyMs = Date.now() - start;

    const leadsCount = await db.collection('leads').countDocuments();

    return sendJson(res, 200, {
      connected: true,
      configured: true,
      database: db.databaseName,
      latencyMs,
      leadsCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return sendJson(res, 200, {
      connected: false,
      configured: true,
      error: error?.message || 'Database ping failed',
    });
  }
}
