/**
 * Employee Activity & Oversight Service for Super Admin Portal
 *
 * Tracks employee work accountability, client interactions, calls, site visits,
 * and supervisory verification for Shresthanshi Solar Solutions.
 */

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: 'Bhubaneswar HQ' | 'Kalahandi Regional Office';
  phone: string;
  email: string;
  status: 'Active & Working' | 'On Field Visit' | 'Off Duty';
  avatarBg: string;
  activeLeadsCount: number;
}

export type ActivityType =
  | 'Phone Call'
  | 'WhatsApp Outreach'
  | 'Site Assessment Visit'
  | 'Quotation Prepared & Sent'
  | 'Subsidy Document Verification'
  | 'Net-Meter Synchronization Inspection';

export type VerificationStatus = 'Verified Work' | 'Pending Review' | 'Flagged Discrepancy';

export interface EmployeeActivity {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  customerName: string;
  customerPhone: string;
  customerLocation: string;
  leadReferenceId?: string;
  activityType: ActivityType;
  timestamp: string; // ISO string
  durationOrScope: string;
  notes: string;
  outcome: 'Interested - Proceeding' | 'Quotation Awaited' | 'Site Visit Booked' | 'Follow-up Required' | 'Not Reachable' | 'Deal Finalized';
  verificationStatus: VerificationStatus;
  superAdminRemarks?: string;
  verifiedAt?: string;
}

export const EMPLOYEES_LIST: Employee[] = [
  {
    id: 'EMP-01',
    name: 'Rajesh Kumar Sahu',
    role: 'Senior Field Solar Engineer',
    department: 'Kalahandi Regional Office',
    phone: '+91 9438-120-456',
    email: 'rajesh.field@shresthanshi.com',
    status: 'On Field Visit',
    avatarBg: '#174B35',
    activeLeadsCount: 14,
  },
  {
    id: 'EMP-02',
    name: 'Amit Pratap Singh',
    role: 'Technical Solar Consultant',
    department: 'Bhubaneswar HQ',
    phone: '+91 9937-220-881',
    email: 'amit.solar@shresthanshi.com',
    status: 'Active & Working',
    avatarBg: '#0284C7',
    activeLeadsCount: 19,
  },
  {
    id: 'EMP-03',
    name: 'Priya Mohapatra',
    role: 'Client CRM & Telecaller',
    department: 'Bhubaneswar HQ',
    phone: '+91 9937-334-112',
    email: 'priya.crm@shresthanshi.com',
    status: 'Active & Working',
    avatarBg: '#7C3AED',
    activeLeadsCount: 22,
  },
  {
    id: 'EMP-04',
    name: 'Subrat Barik',
    role: 'Agricultural Pump & Irrigation Specialist',
    department: 'Kalahandi Regional Office',
    phone: '+91 9437-881-229',
    email: 'subrat.pumps@shresthanshi.com',
    status: 'Active & Working',
    avatarBg: '#D97706',
    activeLeadsCount: 9,
  },
];

const ACTIVITIES_STORAGE_KEY = 'shresthanshi_employee_activities_v1';
const EMPLOYEES_STORAGE_KEY = 'shresthanshi_employees_v1';

// Seed realistic interaction records showing employees actively working and contacting customers
const SEED_ACTIVITIES: EmployeeActivity[] = [
  {
    id: 'ACT-901',
    employeeId: 'EMP-01',
    employeeName: 'Rajesh Kumar Sahu',
    employeeRole: 'Senior Field Solar Engineer',
    customerName: 'Krushna Mohan Patel',
    customerPhone: '9861234567',
    customerLocation: 'Junagarh, Kalahandi',
    leadReferenceId: 'QT-712394',
    activityType: 'Site Assessment Visit',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 min ago
    durationOrScope: '45 mins on-site survey',
    notes: 'Inspected 5 HP agricultural borewell and water table depth. Farmland has 100% shadow-free sunlight. Confirmed dual-mode controller feasibility.',
    outcome: 'Site Visit Booked',
    verificationStatus: 'Verified Work',
    superAdminRemarks: 'Survey photos cross-verified. Well documented.',
    verifiedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'ACT-902',
    employeeId: 'EMP-03',
    employeeName: 'Priya Mohapatra',
    employeeRole: 'Client CRM & Telecaller',
    customerName: 'Ramesh Chandra Sahu',
    customerPhone: '9438112233',
    customerLocation: 'Dharmagarh, Kalahandi',
    leadReferenceId: 'QT-849201',
    activityType: 'Phone Call',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(), // 1 hr 15 mins ago
    durationOrScope: '14 mins phone discussion',
    notes: 'Explained PM Surya Ghar ₹78,000 national subsidy tier for 3 kW rooftop installation. Client shared rooftop electricity bill copy. Forwarded to technical team for layout.',
    outcome: 'Interested - Proceeding',
    verificationStatus: 'Verified Work',
    superAdminRemarks: 'Good call duration; client follow-up on schedule.',
    verifiedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'ACT-903',
    employeeId: 'EMP-02',
    employeeName: 'Amit Pratap Singh',
    employeeRole: 'Technical Solar Consultant',
    customerName: 'Biranchi Narayan Jena',
    customerPhone: '9437890123',
    customerLocation: 'Bhawanipatna, Kalahandi',
    leadReferenceId: 'ENQ-654812',
    activityType: 'Quotation Prepared & Sent',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    durationOrScope: 'Commercial solar engineering proposal',
    notes: 'Drafted 40 kW commercial grid-tied estimation for agro-processing mill. Prepared financial payback analysis with estimated ₹28,000/month DISCOM bill reduction.',
    outcome: 'Quotation Awaited',
    verificationStatus: 'Pending Review',
  },
  {
    id: 'ACT-904',
    employeeId: 'EMP-04',
    employeeName: 'Subrat Barik',
    employeeRole: 'Agricultural Pump & Irrigation Specialist',
    customerName: 'Sarpanch, Ampani Gram Panchayat',
    customerPhone: '9438099887',
    customerLocation: 'Kokasara Block, Kalahandi',
    leadReferenceId: 'QT-902143',
    activityType: 'WhatsApp Outreach',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
    durationOrScope: 'Technical documentation sharing',
    notes: 'Sent galvanized pole specifications and MNRE-approved solar street lighting catalog via official WhatsApp. Shared preliminary estimate for 35 units.',
    outcome: 'Follow-up Required',
    verificationStatus: 'Verified Work',
    superAdminRemarks: 'Panchayat meeting scheduled for next Tuesday.',
    verifiedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'ACT-905',
    employeeId: 'EMP-03',
    employeeName: 'Priya Mohapatra',
    employeeRole: 'Client CRM & Telecaller',
    customerName: 'Sanjeev Kumar Majhi',
    customerPhone: '9938554433',
    customerLocation: 'Narla Road, Kalahandi',
    leadReferenceId: 'SG-551982',
    activityType: 'Phone Call',
    timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hours ago
    durationOrScope: '8 mins introductory call',
    notes: 'Called customer following their Solar Guide PDF download. Answered queries regarding DISCOM net-meter installation timeline in Kalahandi district.',
    outcome: 'Follow-up Required',
    verificationStatus: 'Verified Work',
    superAdminRemarks: 'Timely response after guide inquiry.',
    verifiedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: 'ACT-906',
    employeeId: 'EMP-01',
    employeeName: 'Rajesh Kumar Sahu',
    employeeRole: 'Senior Field Solar Engineer',
    customerName: 'Gouranga Charan Panda',
    customerPhone: '9861009988',
    customerLocation: 'Saheed Nagar, Bhubaneswar',
    activityType: 'Net-Meter Synchronization Inspection',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    durationOrScope: 'TPCODL DISCOM meter verification',
    notes: 'Coordinated bi-directional digital net-meter synchronization test with DISCOM junior engineer. System synchronized at 4.8 kW peak output. Handover complete.',
    outcome: 'Deal Finalized',
    verificationStatus: 'Verified Work',
    superAdminRemarks: 'Project successfully commissioned & synchronized.',
    verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
  },
];

export const getAllEmployees = (): Employee[] => {
  try {
    const raw = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(EMPLOYEES_LIST));
    return EMPLOYEES_LIST;
  } catch {
    return EMPLOYEES_LIST;
  }
};

export const getAllActivities = (): EmployeeActivity[] => {
  try {
    const raw = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(SEED_ACTIVITIES));
    return SEED_ACTIVITIES;
  } catch {
    return SEED_ACTIVITIES;
  }
};

export const logEmployeeActivity = (activity: Omit<EmployeeActivity, 'id' | 'timestamp' | 'verificationStatus'>): EmployeeActivity => {
  const newActivity: EmployeeActivity = {
    ...activity,
    id: `ACT-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toISOString(),
    verificationStatus: 'Pending Review',
  };

  try {
    const activities = getAllActivities();
    const updated = [newActivity, ...activities];
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('employee_activities_updated'));
  } catch (err) {
    console.error('Failed to log employee activity', err);
  }

  return newActivity;
};

export const updateActivityVerification = (
  activityId: string,
  status: VerificationStatus,
  remarks?: string
): void => {
  try {
    const activities = getAllActivities();
    const updated = activities.map((act) =>
      act.id === activityId
        ? {
            ...act,
            verificationStatus: status,
            superAdminRemarks: remarks !== undefined ? remarks : act.superAdminRemarks,
            verifiedAt: status === 'Verified Work' ? new Date().toISOString() : act.verifiedAt,
          }
        : act
    );
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('employee_activities_updated'));
  } catch (err) {
    console.error('Failed to update activity verification', err);
  }
};

export const exportActivitiesToCSV = (): string => {
  const activities = getAllActivities();
  const headers = [
    'Activity ID',
    'Date & Time',
    'Employee Name',
    'Employee Role',
    'Customer Contacted',
    'Customer Phone',
    'Location',
    'Interaction Type',
    'Duration / Scope',
    'Conversation & Work Notes',
    'Outcome',
    'Super Admin Verification',
    'Super Admin Remarks',
  ];

  const rows = activities.map((a) => [
    `"${a.id}"`,
    `"${new Date(a.timestamp).toLocaleString('en-IN')}"`,
    `"${a.employeeName}"`,
    `"${a.employeeRole}"`,
    `"${a.customerName.replace(/"/g, '""')}"`,
    `"${a.customerPhone}"`,
    `"${a.customerLocation}"`,
    `"${a.activityType}"`,
    `"${a.durationOrScope}"`,
    `"${(a.notes || '').replace(/"/g, '""')}"`,
    `"${a.outcome}"`,
    `"${a.verificationStatus}"`,
    `"${(a.superAdminRemarks || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
};
