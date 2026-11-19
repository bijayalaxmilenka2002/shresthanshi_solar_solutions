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

async function parseBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res: any, status: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(status).json(data);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.end(JSON.stringify(data));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const dbConnection = await getDatabase();

  if (!dbConnection) {
    return sendJson(res, 200, {
      success: false,
      offline: true,
      message: 'MongoDB Atlas not yet configured. Operating in local storage mode.',
    });
  }

  const { db } = dbConnection;
  const collection = db.collection('settings');

  try {
    switch (req.method) {
      case 'GET': {
        const doc = await collection.findOne({ key: 'site_settings' }, { projection: { _id: 0, key: 0 } });
        if (!doc || !doc.settings) {
          return sendJson(res, 200, { success: true, settings: null });
        }
        return sendJson(res, 200, { success: true, settings: doc.settings });
      }

      case 'POST': {
        const body = await parseBody(req);
        if (!body.settings) {
          return sendJson(res, 400, { success: false, error: 'Settings object is required.' });
        }

        await collection.updateOne(
          { key: 'site_settings' },
          {
            $set: {
              key: 'site_settings',
              settings: body.settings,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );

        return sendJson(res, 200, { success: true, message: 'Settings saved to MongoDB Atlas' });
      }

      default:
        return sendJson(res, 405, { success: false, error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('API Error in /api/settings:', error);
    return sendJson(res, 500, { success: false, error: error?.message || 'Internal server error' });
  }
}
