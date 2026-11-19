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
    console.error('MongoDB Atlas Connection Error in /api/track:', error?.message || error);
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

function maskName(fullName: string): string {
  if (!fullName) return 'Customer';
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    const first = parts[0];
    return first.length > 2 ? `${first.slice(0, 2)}***` : `${first}*`;
  }
  const first = parts[0];
  const last = parts[parts.length - 1];
  return `${first} ${last.charAt(0)}***`;
}

function getProgressInfo(status: string) {
  switch (status) {
    case 'New':
      return {
        stepIndex: 1,
        totalSteps: 5,
        stepTitle: 'Enquiry Received & Queued',
        statusLabel: 'Under Engineering Review',
        description: 'Your solar inquiry has been received by our technical engineering desk in Kalahandi & Bhubaneswar.',
        nextAction: 'Our team is reviewing your roof sizing or water pumping requirements and will reach out shortly.',
      };
    case 'Contacted':
      return {
        stepIndex: 2,
        totalSteps: 5,
        stepTitle: 'Initial Consultation Completed',
        statusLabel: 'Requirement Confirmed',
        description: 'Technical requirements discussed. Sizing parameters and preliminary subsidy eligibility checked.',
        nextAction: 'Field engineer is coordinating convenient site visit or layout assessment.',
      };
    case 'Site Visit Scheduled':
      return {
        stepIndex: 3,
        totalSteps: 5,
        stepTitle: 'Site Survey & Roof Assessment',
        statusLabel: 'Site Assessment Active',
        description: 'Engineering site visit scheduled for shadow analysis, electrical DB inspection, and roof structural verification.',
        nextAction: 'Technical engineer will inspect roof orientation and DISCOM transformer distance.',
      };
    case 'Quotation Sent':
      return {
        stepIndex: 4,
        totalSteps: 5,
        stepTitle: 'Official Sizing & Quotation Dispatched',
        statusLabel: 'Quotation Ready',
        description: 'Detailed quotation with PM Surya Ghar / PM-KUSUM subsidy calculation and equipment specs has been prepared.',
        nextAction: 'Review your quotation or contact our proprietor for final sign-off and DISCOM application submission.',
      };
    case 'Converted':
      return {
        stepIndex: 5,
        totalSteps: 5,
        stepTitle: 'Project Approved & Installation Phase',
        statusLabel: 'Installation & Synchronization',
        description: 'Project is commissioned or actively in procurement and net-meter synchronization stage.',
        nextAction: 'DISCOM bi-directional net-meter synchronization and final subsidy disbursement follow-up.',
      };
    default:
      return {
        stepIndex: 1,
        totalSteps: 5,
        stepTitle: 'Enquiry Under Review',
        statusLabel: status || 'Under Review',
        description: 'Your application is progressing through our verification pipeline.',
        nextAction: 'Contact us anytime on WhatsApp (9937000624) for immediate updates.',
      };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 204, {});
  }

  if (req.method !== 'GET') {
    return sendJson(res, 405, { success: false, error: 'Method not allowed' });
  }

  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const query = (url.searchParams.get('q') || url.searchParams.get('query') || '').trim();

  if (!query) {
    return sendJson(res, 400, {
      success: false,
      error: 'Please provide a 10-digit phone number or Reference ID (e.g., QT-849201).',
    });
  }

  const dbConnection = await getDatabase();
  if (!dbConnection) {
    return sendJson(res, 200, {
      success: false,
      offline: true,
      message: 'Cloud database is syncing. Operating in local mode.',
      results: [],
    });
  }

  const { db } = dbConnection;
  const collection = db.collection('leads');

  try {
    const cleanDigits = query.replace(/\D/g, '');
    const isPhoneSearch = cleanDigits.length >= 10;

    let filter: Record<string, any> = {};
    if (isPhoneSearch) {
      const tenDigits = cleanDigits.slice(-10);
      filter = { phone: { $regex: tenDigits } };
    } else {
      filter = { id: { $regex: new RegExp(`^${query}$`, 'i') } };
    }

    const matches = await collection
      .find(filter)
      .sort({ submittedAt: -1 })
      .limit(4)
      .toArray();

    if (!matches || matches.length === 0) {
      return sendJson(res, 200, {
        success: true,
        found: false,
        message: `No application found matching "${query}". Please check your Reference ID or 10-digit mobile number.`,
        results: [],
      });
    }

    const safeResults = matches.map((m) => {
      const progress = getProgressInfo(m.status);
      return {
        id: m.id,
        maskedName: maskName(m.name),
        category: m.category || 'Solar Energy Solution',
        location: m.location || 'Odisha',
        submittedAt: m.submittedAt,
        status: m.status,
        progress,
        supportPhone: '9937000624',
        supportPhoneDisplay: '+91 99370-00624',
      };
    });

    return sendJson(res, 200, {
      success: true,
      found: true,
      count: safeResults.length,
      results: safeResults,
    });
  } catch (error: any) {
    console.error('Error tracking inquiry in /api/track:', error);
    return sendJson(res, 500, { success: false, error: 'Failed to look up application status.' });
  }
}
