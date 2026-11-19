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

  const start = Date.now();
  const dbConnection = await getDatabase();

  if (!dbConnection) {
    return sendJson(res, 200, {
      connected: false,
      configured: false,
      database: null,
      message: 'MONGODB_URI environment variable is not set. Using local storage.',
    });
  }

  try {
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
      error: error.message || 'Database ping failed',
    });
  }
}
