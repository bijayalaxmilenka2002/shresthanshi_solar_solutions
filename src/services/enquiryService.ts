export interface SolarGuideRequestPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export interface ContactEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  customerType: string;
  solutionInterest: string;
  preferredContactMethod: 'Phone Call' | 'WhatsApp' | 'Email';
  message: string;
  submittedAt: string;
}

export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  solarType: string;
  monthlyBillOrHp?: string;
  message?: string;
  submittedAt: string;
}

export type LeadSource =
  | 'Quote Request'
  | 'Site Assessment'
  | 'Solar Guide Download'
  | 'Direct Phone/Walk-in';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Site Visit Scheduled'
  | 'Quotation Sent'
  | 'Converted'
  | 'Closed';

export interface UnifiedLead {
  id: string;
  source: LeadSource;
  name: string;
  phone: string;
  email?: string;
  location: string;
  category: string;
  details: string;
  preferredContactMethod?: string;
  status: LeadStatus;
  notes?: string;
  submittedAt: string;
}

const GUIDE_STORAGE_KEY = 'shreshtanshi_solar_guide_requests';
const CONTACT_STORAGE_KEY = 'shreshtanshi_contact_enquiries';
const QUOTE_STORAGE_KEY = 'shreshtanshi_quote_requests';
const UNIFIED_LEADS_KEY = 'shreshtanshi_unified_leads_v1';

// Initial realistic seed inquiries for Kalahandi / Odisha owner view
const SEED_LEADS: UnifiedLead[] = [
  {
    id: 'QT-849201',
    source: 'Quote Request',
    name: 'Ramesh Chandra Sahu',
    phone: '9438112233',
    email: 'ramesh.sahu@gmail.com',
    location: 'Dharmagarh, Kalahandi',
    category: 'Residential Rooftop Solar',
    details: '₹3,000 – ₹6,000 / month (Approx 3–5 kW). Interested in PM Surya Ghar subsidy on RCC roof.',
    preferredContactMethod: 'WhatsApp',
    status: 'New',
    notes: 'Terrace is completely shadow-free. Wants 3 kW on-grid setup.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 'QT-712394',
    source: 'Quote Request',
    name: 'Krushna Mohan Patel',
    phone: '9861234567',
    location: 'Junagarh, Kalahandi',
    category: 'Solar Water Pumps',
    details: '5 HP High-Discharge Solar Pump for paddy farm. Dual-mode day solar & night grid controller.',
    preferredContactMethod: 'Phone Call',
    status: 'Site Visit Scheduled',
    notes: 'Site visit scheduled for coming Friday with technical engineer.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
  },
  {
    id: 'ENQ-654812',
    source: 'Site Assessment',
    name: 'Biranchi Narayan Jena',
    phone: '9437890123',
    email: 'bnjena.agro@rediffmail.com',
    location: 'Bhawanipatna, Kalahandi',
    category: 'Commercial Solar Plants',
    details: 'Commercial metal shed solar installation for agro-processing unit. Daytime 40 kW requirement.',
    preferredContactMethod: 'WhatsApp',
    status: 'Quotation Sent',
    notes: 'Preliminary layout and quotation sent on WhatsApp. Awaiting DISCOM approval.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // Yesterday
  },
  {
    id: 'SG-551982',
    source: 'Solar Guide Download',
    name: 'Sanjeev Kumar Majhi',
    phone: '9938554433',
    email: 'sanjeev.majhi@gmail.com',
    location: 'Narla Road, Kalahandi',
    category: 'General Solar Education',
    details: 'Downloaded PM Surya Ghar scheme and terrace sizing guide. Wants financing details.',
    preferredContactMethod: 'WhatsApp',
    status: 'Contacted',
    notes: 'Sent PDF guide on WhatsApp and answered subsidy questions.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: 'QT-902143',
    source: 'Quote Request',
    name: 'Sarpanch, Ampani Gram Panchayat',
    phone: '9438099887',
    location: 'Kokasara Block, Kalahandi',
    category: 'Solar Street Lighting',
    details: '20 – 50 Lights for main village road and school junction. Elevated galvanized poles.',
    preferredContactMethod: 'Phone Call',
    status: 'Site Visit Scheduled',
    notes: 'Panchayat resolution passed. Preparing technical estimate.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
];

export const getAllLeads = (): UnifiedLead[] => {
  try {
    const raw = localStorage.getItem(UNIFIED_LEADS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Seed initial leads if storage is empty
    localStorage.setItem(UNIFIED_LEADS_KEY, JSON.stringify(SEED_LEADS));
    return SEED_LEADS;
  } catch {
    return SEED_LEADS;
  }
};

export const saveLead = (lead: UnifiedLead): void => {
  try {
    const leads = getAllLeads();
    const updated = [lead, ...leads.filter((l) => l.id !== lead.id)];
    localStorage.setItem(UNIFIED_LEADS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('leads_updated'));
  } catch (err) {
    console.error('Failed to save lead', err);
  }
};

export const updateLeadStatus = (id: string, status: LeadStatus): void => {
  try {
    const leads = getAllLeads();
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    localStorage.setItem(UNIFIED_LEADS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('leads_updated'));
  } catch (err) {
    console.error('Failed to update lead status', err);
  }
};

export const updateLeadNotes = (id: string, notes: string): void => {
  try {
    const leads = getAllLeads();
    const updated = leads.map((l) => (l.id === id ? { ...l, notes } : l));
    localStorage.setItem(UNIFIED_LEADS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('leads_updated'));
  } catch (err) {
    console.error('Failed to update lead notes', err);
  }
};

export const deleteLead = (id: string): void => {
  try {
    const leads = getAllLeads();
    const updated = leads.filter((l) => l.id !== id);
    localStorage.setItem(UNIFIED_LEADS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('leads_updated'));
  } catch (err) {
    console.error('Failed to delete lead', err);
  }
};

export const exportLeadsToCSV = (): string => {
  const leads = getAllLeads();
  const headers = [
    'Reference ID',
    'Date Submitted',
    'Form Source',
    'Customer Name',
    'Phone',
    'Email',
    'Location',
    'Solar Requirement',
    'Requirement Details',
    'Preferred Contact',
    'Current Status',
    'Owner Notes',
  ];

  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.submittedAt).toLocaleString('en-IN')}"`,
    `"${l.source}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.email || ''}"`,
    `"${l.location.replace(/"/g, '""')}"`,
    `"${l.category.replace(/"/g, '""')}"`,
    `"${l.details.replace(/"/g, '""')}"`,
    `"${l.preferredContactMethod || ''}"`,
    `"${l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

export const submitQuoteRequest = async (
  payload: Omit<QuoteRequestPayload, 'submittedAt'>
): Promise<{ success: boolean; referenceId: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const submittedAt = new Date().toISOString();
  const ref = `QT-${Date.now().toString().slice(-6)}`;

  const record: QuoteRequestPayload = {
    ...payload,
    submittedAt,
  };

  try {
    const existing = JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore quota error
  }

  // Push to unified lead store
  const unified: UnifiedLead = {
    id: ref,
    source: 'Quote Request',
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    location: payload.location || 'Odisha',
    category: payload.solarType,
    details: `${payload.monthlyBillOrHp || ''}${payload.message ? ` • Note: ${payload.message}` : ''}`.trim(),
    preferredContactMethod: payload.monthlyBillOrHp?.includes('Phone') ? 'Phone Call' : 'WhatsApp',
    status: 'New',
    submittedAt,
  };

  saveLead(unified);

  return { success: true, referenceId: ref };
};

export const submitSolarGuideRequest = async (
  payload: Omit<SolarGuideRequestPayload, 'submittedAt'>
): Promise<{ success: boolean; referenceId: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const submittedAt = new Date().toISOString();
  const ref = `SG-${Date.now().toString().slice(-6)}`;

  const record: SolarGuideRequestPayload = {
    ...payload,
    submittedAt,
  };

  try {
    const existing = JSON.parse(localStorage.getItem(GUIDE_STORAGE_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore quota error
  }

  // Push to unified lead store
  const unified: UnifiedLead = {
    id: ref,
    source: 'Solar Guide Download',
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    location: 'Odisha',
    category: 'Free Solar Guide',
    details: payload.message || 'Requested Practical Solar Pre-Investment Guide PDF',
    preferredContactMethod: 'WhatsApp',
    status: 'New',
    submittedAt,
  };

  saveLead(unified);

  return { success: true, referenceId: ref };
};

export const submitContactEnquiry = async (
  payload: Omit<ContactEnquiryPayload, 'submittedAt'>
): Promise<{ success: boolean; referenceId: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const submittedAt = new Date().toISOString();
  const ref = `ENQ-${Date.now().toString().slice(-6)}`;

  const record: ContactEnquiryPayload = {
    ...payload,
    submittedAt,
  };

  try {
    const existing = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || '[]');
    existing.push(record);
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore quota error
  }

  // Push to unified lead store
  const unified: UnifiedLead = {
    id: ref,
    source: 'Site Assessment',
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    location: payload.location,
    category: payload.solutionInterest,
    details: `${payload.customerType} • ${payload.message}`.trim(),
    preferredContactMethod: payload.preferredContactMethod,
    status: 'New',
    submittedAt,
  };

  saveLead(unified);

  return { success: true, referenceId: ref };
};
