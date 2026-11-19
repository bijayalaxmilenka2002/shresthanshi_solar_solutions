import type { IncomingMessage, ServerResponse } from 'http';
import { getDatabase } from './lib/mongodb';

// Helper to parse JSON body from incoming request
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
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  const dbConnection = await getDatabase();

  // If MongoDB is not yet configured, return offline flag with graceful fallback
  if (!dbConnection) {
    if (req.method === 'GET') {
      return sendJson(res, 200, {
        success: false,
        offline: true,
        message: 'MongoDB Atlas not yet configured. Please set MONGODB_URI in environment variables.',
        leads: [],
      });
    }
    return sendJson(res, 200, {
      success: false,
      offline: true,
      message: 'MongoDB Atlas not yet configured. Operating in local storage fallback mode.',
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
        // Exclude internal _id from response
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
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
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
    return sendJson(res, 500, { success: false, error: error.message || 'Internal server error' });
  }
}
