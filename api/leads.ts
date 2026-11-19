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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res.end(JSON.stringify(data));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  const dbConnection = await getDatabase();

  if (!dbConnection) {
    if (req.method === 'GET') {
      return sendJson(res, 200, {
        success: false,
        offline: true,
        message: 'MongoDB Atlas not yet connected. Operating in local storage mode.',
        leads: [],
      });
    }
    return sendJson(res, 200, {
      success: false,
      offline: true,
      message: 'MongoDB Atlas not yet connected. Saved to local storage.',
    });
  }

  const { db } = dbConnection;
  const collection = db.collection('leads');

  try {
    switch (req.method) {
      case 'GET': {
        const leads = await collection
          .find({})
          .sort({ submittedAt: -1 })
          .project({ _id: 0 })
          .toArray();

        return sendJson(res, 200, { success: true, leads });
      }

      case 'POST': {
        const body = await parseBody(req);
        if (!body.name || !body.phone) {
          return sendJson(res, 400, { success: false, error: 'Name and phone are required.' });
        }

        const newLead = {
          id: body.id || `QT-${Date.now().toString().slice(-6)}`,
          source: body.source || 'Quote Request',
          name: body.name.trim(),
          phone: body.phone.trim(),
          email: body.email ? body.email.trim() : '',
          location: body.location || 'Odisha',
          category: body.category || 'General Solar Enquiry',
          details: body.details || '',
          preferredContactMethod: body.preferredContactMethod || 'WhatsApp',
          status: body.status || 'New',
          notes: body.notes || '',
          submittedAt: body.submittedAt || new Date().toISOString(),
          createdAt: new Date(),
        };

        await collection.insertOne(newLead);
        const { _id, ...savedLead } = newLead as any;
        return sendJson(res, 201, { success: true, lead: savedLead });
      }

      case 'PATCH': {
        const body = await parseBody(req);
        const { id, status, notes } = body;

        if (!id) {
          return sendJson(res, 400, { success: false, error: 'Lead ID is required.' });
        }

        const updates: Record<string, any> = { updatedAt: new Date() };
        if (status) updates.status = status;
        if (notes !== undefined) updates.notes = notes;

        const result = await collection.updateOne({ id }, { $set: updates });
        return sendJson(res, 200, { success: true, modifiedCount: result.modifiedCount });
      }

      case 'DELETE': {
        const body = await parseBody(req);
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const id = body.id || url.searchParams.get('id');

        if (!id) {
          return sendJson(res, 400, { success: false, error: 'Lead ID is required for deletion.' });
        }

        const result = await collection.deleteOne({ id });
        return sendJson(res, 200, { success: true, deletedCount: result.deletedCount });
      }

      default:
        return sendJson(res, 405, { success: false, error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('API Error in /api/leads:', error);
    return sendJson(res, 500, { success: false, error: error?.message || 'Internal server error' });
  }
}
