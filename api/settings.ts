import { getDatabase } from './lib/mongodb';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  const dbConnection = await getDatabase();

  if (!dbConnection) {
    return sendJson(res, 200, {
      success: false,
      offline: true,
      message: 'MongoDB Atlas not yet configured. Operating in local storage fallback mode.',
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
    return sendJson(res, 500, { success: false, error: error.message || 'Internal server error' });
  }
}
