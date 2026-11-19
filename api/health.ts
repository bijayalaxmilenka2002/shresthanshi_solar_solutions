import { getDatabase } from './lib/mongodb';

function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return sendJson(res, 200, {
      connected: false,
      configured: false,
      message: 'MONGODB_URI environment variable is not set. Operating in local storage mode.',
    });
  }

  if (uri.includes('<db_password>') || uri.includes('<password>') || uri.includes('YOUR_PASSWORD')) {
    return sendJson(res, 200, {
      connected: false,
      configured: false,
      placeholder: true,
      message: 'MONGODB_URI has an unreplaced password placeholder. Please replace YOUR_PASSWORD with your actual database user password in Vercel.',
    });
  }

  const start = Date.now();

  try {
    const dbConnection = await getDatabase();

    if (!dbConnection) {
      return sendJson(res, 200, {
        connected: false,
        configured: true,
        message: 'Could not connect to MongoDB Atlas. Please check password and IP Access (0.0.0.0/0).',
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
