import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Layout,
  Bell,
  Settings,
  Phone,
  MessageCircle,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Building2,
  Sun,
  User,
  ShieldCheck,
  Plus,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Eye,
  EyeOff,
  Sliders,
  Save,
  Lock,
  LogOut,
  Key,
  Download,
  Check,
} from 'lucide-react';
import { Container } from '@views/components/ui/Container';
import { Card } from '@views/components/ui/Card';
import { Button } from '@views/components/ui/Button';
import { Input, Textarea } from '@views/components/ui/Input';
import { Modal } from '@views/components/ui/Modal';
import { SEO } from '@views/components/common/SEO';
import {
  UnifiedLead,
  LeadStatus,
  LeadSource,
  getAllLeads,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  saveLead,
  exportLeadsToCSV,
  syncLeadsFromDatabase,
} from '@models/services/enquiryService';
import { useSiteSettings } from '@/app/providers';
import { SiteSettings, syncSiteSettingsFromDatabase } from '@models/services/siteSettingsService';

export const OwnerPortalPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSiteSettings();

  // Authentication State (Restricted to Owner only)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('shresthanshi_owner_auth') === 'true' ||
      localStorage.getItem('shresthanshi_owner_remember') === 'true'
    );
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    return parseInt(sessionStorage.getItem('shresthanshi_fail_count') || '0', 10);
  });
  const [lockoutUntil, setLockoutUntil] = useState<number>(() => {
    return parseInt(sessionStorage.getItem('shresthanshi_lockout_until') || '0', 10);
  });

  const sha256Hex = async (text: string): Promise<string> => {
    const enc = new TextEncoder().encode(text);
    const hashBuf = await window.crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(hashBuf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if security lockout is active
    const now = Date.now();
    if (lockoutUntil > now) {
      const remainingMins = Math.ceil((lockoutUntil - now) / (1000 * 60));
      setAuthError(`Security lockout active. Please wait ${remainingMins} minute(s) before retrying.`);
      return;
    }

    setLoginLoading(true);
    setAuthError('');

    try {
      const u = loginUsername.trim().toLowerCase();
      const p = loginPassword.trim();

      const userHash = await sha256Hex(u);
      const passHash = await sha256Hex(p);

      // Authorized cryptographic hashes:
      // Usernames: 'admin', 'shubham', 'shubham@shresthanshi.com'
      const validUserHashes = [
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // admin
        '10f6d3ce9d854d1ebfc1ca7d1981fafc122a9970093382f2c5c72cfa6ab47572', // shubham
        '598c261e125de57e8e38ff2e6d86e5f1e376b4a0bf8018c83f19ac9d4c06b1cf', // shubham@shresthanshi.com
      ];

      // Password hash: 'shresthanshi2026'
      const validPassHash = '13d1832743bde8780d5f2f0ecc1dba9fda16a99d73cb5c562ed4de0ed71d6245';

      if (validUserHashes.includes(userHash) && passHash === validPassHash) {
        // Successful authentication
        sessionStorage.setItem('shresthanshi_owner_auth', 'true');
        sessionStorage.removeItem('shresthanshi_fail_count');
        sessionStorage.removeItem('shresthanshi_lockout_until');
        if (rememberMe) {
          localStorage.setItem('shresthanshi_owner_remember', 'true');
        }
        setIsAuthenticated(true);
      } else {
        const newCount = failedAttempts + 1;
        setFailedAttempts(newCount);
        sessionStorage.setItem('shresthanshi_fail_count', newCount.toString());

        if (newCount >= 5) {
          const lockTime = Date.now() + 15 * 60 * 1000; // 15 mins lock
          setLockoutUntil(lockTime);
          sessionStorage.setItem('shresthanshi_lockout_until', lockTime.toString());
          setAuthError('Too many failed attempts. Security lockout active for 15 minutes.');
        } else {
          setAuthError(`Invalid credentials. Access denied. (${5 - newCount} attempt(s) remaining)`);
        }
      }
    } catch {
      setAuthError('Authentication verification failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('shresthanshi_owner_auth');
    localStorage.removeItem('shresthanshi_owner_remember');
    setIsAuthenticated(false);
    setLoginPassword('');
    setAuthError('');
  };

  // Local copy of settings for editing
  const [editSettings, setEditSettings] = useState<SiteSettings>(settings);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false);
  const [announcementSavedMsg, setAnnouncementSavedMsg] = useState(false);

  // Tabs: 'inbox' | 'announcement' | 'contact'
  const [activeTab, setActiveTab] = useState<'inbox' | 'announcement' | 'contact'>('inbox');

  // Leads state
  const [leads, setLeads] = useState<UnifiedLead[]>(getAllLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Database Connection & Cloud Sync State
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; configured: boolean; database?: string; latencyMs?: number } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedLeadId, setSyncedLeadId] = useState<string | null>(null);

  const checkDatabaseHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      }
    } catch {
      setDbStatus({ connected: false, configured: false });
    }
  };

  const handleSyncDatabase = async () => {
    setIsSyncing(true);
    try {
      const fetched = await syncLeadsFromDatabase();
      if (fetched) setLeads(fetched);
      const remoteSettings = await syncSiteSettingsFromDatabase();
      if (remoteSettings) {
        updateSettings(remoteSettings);
        setEditSettings(remoteSettings);
      }
      await checkDatabaseHealth();
    } finally {
      setIsSyncing(false);
    }
  };

  // Check health and sync on authentication
  useEffect(() => {
    if (isAuthenticated) {
      checkDatabaseHealth();
      syncLeadsFromDatabase().then((fetched) => {
        if (fetched && fetched.length > 0) setLeads(fetched);
      });
      syncSiteSettingsFromDatabase().then((remoteSettings) => {
        if (remoteSettings) {
          updateSettings(remoteSettings);
          setEditSettings(remoteSettings);
        }
      });
    }
  }, [isAuthenticated]);

  // Add lead modal state
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadLocation, setNewLeadLocation] = useState('');
  const [newLeadCategory, setNewLeadCategory] = useState('Residential Rooftop Solar');
  const [newLeadDetails, setNewLeadDetails] = useState('');
  const [newLeadSource, setNewLeadSource] = useState<LeadSource>('Direct Phone/Walk-in');

  // Sync settings when external changes happen
  useEffect(() => {
    setEditSettings(settings);
  }, [settings]);

  // Sync leads when storage changes
  useEffect(() => {
    const handleLeadsUpdate = () => {
      setLeads(getAllLeads());
    };
    window.addEventListener('leads_updated', handleLeadsUpdate);
    window.addEventListener('storage', handleLeadsUpdate);
    return () => {
      window.removeEventListener('leads_updated', handleLeadsUpdate);
      window.removeEventListener('storage', handleLeadsUpdate);
    };
  }, []);

  // Filter leads safely
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      (lead.name || '').toLowerCase().includes(q) ||
      (lead.phone || '').includes(q) ||
      (lead.location || '').toLowerCase().includes(q) ||
      (lead.id || '').toLowerCase().includes(q) ||
      (lead.category || '').toLowerCase().includes(q) ||
      (lead.details || '').toLowerCase().includes(q);

    const matchesSource = filterSource === 'All' || lead.source === filterSource;
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;

    return matchesSearch && matchesSource && matchesStatus;
  });

  const handleExportCSV = () => {
    try {
      const csv = exportLeadsToCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `shresthanshi_solar_leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV', err);
      alert('Unable to export leads to CSV.');
    }
  };

  // Metrics
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const siteVisitsCount = leads.filter((l) => l.status === 'Site Visit Scheduled').length;
  const quotationsCount = leads.filter((l) => l.status === 'Quotation Sent').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    updateLeadStatus(id, newStatus);
    setLeads(getAllLeads());
    setSyncedLeadId(id);
    setTimeout(() => setSyncedLeadId(null), 2500);
  };

  const handleNotesChange = (id: string, notes: string) => {
    updateLeadNotes(id, notes);
    setLeads(getAllLeads());
    setSyncedLeadId(id);
    setTimeout(() => setSyncedLeadId(null), 2500);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to remove this lead record?')) {
      deleteLead(id);
      setLeads(getAllLeads());
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) {
      alert('Please enter client name and phone number.');
      return;
    }

    const created: UnifiedLead = {
      id: `WALK-${Date.now().toString().slice(-6)}`,
      source: newLeadSource,
      name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      email: newLeadEmail.trim() || undefined,
      location: newLeadLocation.trim() || 'Bhubaneswar, Odisha',
      category: newLeadCategory,
      details: newLeadDetails.trim() || 'Manual inquiry recorded in owner portal',
      preferredContactMethod: 'Phone Call',
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    saveLead(created);
    setLeads(getAllLeads());

    // Reset
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadLocation('');
    setNewLeadDetails('');
    setIsAddLeadOpen(false);
  };

  const handleSaveSettings = async () => {
    setIsSavingAnnouncement(true);
    try {
      await updateSettings(editSettings);
      setSaveSuccessMsg(true);
      setAnnouncementSavedMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 4000);
      setTimeout(() => setAnnouncementSavedMsg(false), 4000);
    } finally {
      setIsSavingAnnouncement(false);
    }
  };

  const getStatusBadgeStyle = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return { bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' };
      case 'Contacted':
        return { bg: '#E0F2FE', color: '#0369A1', border: '#BAE6FD' };
      case 'Site Visit Scheduled':
        return { bg: '#F3E8FF', color: '#6B21A8', border: '#E9D5FF' };
      case 'Quotation Sent':
        return { bg: '#E8F2E8', color: '#174B35', border: '#174B35' };
      case 'Converted':
        return { bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' };
      case 'Closed':
        return { bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' };
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0F3324',
          backgroundImage:
            'radial-gradient(circle at 50% 20%, rgba(37, 102, 73, 0.45) 0%, rgba(15, 51, 36, 0.95) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        <SEO
          title="Owner Portal Login — Shresthanshi Solar Solutions"
          description="Restricted Owner Administration Console"
          canonicalPath="/owner-portal"
          noIndex={true}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              backgroundColor: '#174B35',
              padding: 'clamp(1.5rem, 5vw, 2rem) clamp(1.25rem, 4vw, 2rem) 1.5rem',
              color: '#FFFFFF',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <Lock size={26} style={{ color: '#86EFAC' }} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                padding: '0.2rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              <ShieldCheck size={13} style={{ color: '#4ADE80' }} />
              Owner Console Access
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.15rem, 4vw, 1.35rem)',
                fontWeight: 800,
                margin: '0 0 0.35rem',
                color: '#FFFFFF',
              }}
            >
              Shresthanshi Solar Solutions
            </h1>
            <p style={{ margin: 0, fontSize: '0.78rem', opacity: 0.85, color: '#E8F2E8' }}>
              Prop. Mrs. Sinjita Shikha Mohapatra • Administrative Control
            </p>
          </div>

          {/* Form Area */}
          <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
            {authError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  marginBottom: '1.25rem',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--color-forest-green)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Owner Username / Email
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                  <input
                    type="text"
                    required
                    placeholder="admin or shubham"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                      border: '1.5px solid var(--border-medium)',
                      borderRadius: '10px',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--color-forest-green)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Security Password / PIN
                </label>
                <div style={{ position: 'relative' }}>
                  <Key
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter security PIN"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.6rem 0.75rem 2.5rem',
                      border: '1.5px solid var(--border-medium)',
                      borderRadius: '10px',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: '0.2rem',
                    }}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  fontSize: '0.82rem',
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', color: 'var(--text-body)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--color-forest-green)' }}
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'var(--color-forest-green)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: loginLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(23, 75, 53, 0.25)',
                }}
              >
                <Lock size={16} />
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Owner Portal'}</span>
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link
                to="/"
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <span>&larr; Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAF9', minHeight: '100vh', paddingBottom: '4rem' }}>
      <SEO
        title="Owner Portal — Response Management & Section Controls | Shresthanshi Solar"
        description="Owner management portal for Shresthanshi Solar Solutions to review client form responses, manage leads, and customize live website sections."
        canonicalPath="/owner-portal"
        noIndex={true}
      />

      {/* Top Bar for Owner Portal */}
      <div
        style={{
          backgroundColor: '#174B35',
          color: '#FFFFFF',
          padding: '0.85rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '220px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#174B35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
              >
                S
              </div>
              <div>
                <h1 style={{ fontSize: '1.02rem', fontWeight: 800, margin: 0, color: '#FFFFFF', lineHeight: 1.25 }}>
                  Shresthanshi Solar Solutions
                </h1>
                <div style={{ fontSize: '0.72rem', opacity: 0.85, marginTop: '2px' }}>
                  Owner Response Portal • Prop. Mrs. Sinjita Shikha Mohapatra
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>View Public Site</span>
                <ExternalLink size={13} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#FECACA',
                  backgroundColor: 'rgba(239, 68, 68, 0.25)',
                  border: '1px solid rgba(248, 113, 113, 0.4)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                title="Log out of Owner Portal"
              >
                <LogOut size={13} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <Container>
          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '2px solid var(--border-subtle)',
              marginBottom: '1.75rem',
              overflowX: 'auto',
              paddingBottom: '0.35rem',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1rem',
                borderRadius: '8px 8px 0 0',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'inbox' ? '#174B35' : 'transparent',
                color: activeTab === 'inbox' ? '#FFFFFF' : 'var(--color-forest-green)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 150ms ease',
              }}
            >
              <Inbox size={17} />
              <span>Client Responses &amp; Leads</span>
              <span
                style={{
                  backgroundColor: activeTab === 'inbox' ? '#FFFFFF' : '#174B35',
                  color: activeTab === 'inbox' ? '#174B35' : '#FFFFFF',
                  borderRadius: '999px',
                  padding: '0.1rem 0.5rem',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                }}
              >
                {newLeadsCount > 0 ? `${newLeadsCount} New` : totalLeads}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('announcement')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1rem',
                borderRadius: '8px 8px 0 0',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'announcement' ? '#174B35' : 'transparent',
                color: activeTab === 'announcement' ? '#FFFFFF' : 'var(--color-forest-green)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 150ms ease',
              }}
            >
              <Bell size={17} />
              <span>Notice &amp; Subsidy Alert Bar</span>
              {editSettings.announcement.enabled && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1rem',
                borderRadius: '8px 8px 0 0',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'contact' ? '#174B35' : 'transparent',
                color: activeTab === 'contact' ? '#FFFFFF' : 'var(--color-forest-green)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 150ms ease',
              }}
            >
              <Settings size={17} />
              <span>Business &amp; Contact Info</span>
            </button>
          </div>

          {/* Global Save Success Notification Banner */}
          {saveSuccessMsg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: '#DCFCE7',
                border: '1.5px solid #86EFAC',
                color: '#166534',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                fontWeight: 600,
                fontSize: '0.92rem',
                boxShadow: '0 2px 8px rgba(22, 101, 52, 0.08)',
              }}
            >
              <CheckCircle2 size={20} color="#15803D" />
              <span>
                <strong>Settings Saved &amp; Synced!</strong> All public site pages now immediately reflect your latest updates.
              </span>
            </div>
          )}

          {/* =========================================================================
            TAB 1: CLIENT LEADS & RESPONSES INBOX
            ========================================================================= */}
          {activeTab === 'inbox' && (
            <div>
              {/* Quick Metrics Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                }}
              >
                <Card variant="white" padding="sm" style={{ borderLeft: '4px solid #174B35', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Total Responses</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#174B35' }}>
                    {totalLeads}
                  </div>
                </Card>

                <Card variant="white" padding="sm" style={{ borderLeft: '4px solid #F59E0B', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>New / Unread</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#D97706' }}>
                    {newLeadsCount}
                  </div>
                </Card>

                <Card variant="white" padding="sm" style={{ borderLeft: '4px solid #8B5CF6', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Site Visits</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#7C3AED' }}>
                    {siteVisitsCount}
                  </div>
                </Card>

                <Card variant="white" padding="sm" style={{ borderLeft: '4px solid #0284C7', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Quotations</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#0284C7' }}>
                    {quotationsCount}
                  </div>
                </Card>

                <Card variant="white" padding="sm" style={{ borderLeft: '4px solid #10B981', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Converted</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>
                    {convertedCount}
                  </div>
                </Card>
              </div>

              {/* Filter and Action Header */}
              <Card variant="white" padding="md" style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Search Input */}
                  <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '200px' }}>
                    <Search
                      size={17}
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                    />
                    <input
                      type="text"
                      placeholder="Search name, phone, town, Ref ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        height: '40px',
                        paddingLeft: '36px',
                        paddingRight: '12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontFamily: 'inherit',
                        fontSize: '0.86rem',
                      }}
                    />
                  </div>

                  {/* Filters */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <select
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      style={{
                        height: '40px',
                        padding: '0 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontFamily: 'inherit',
                        fontSize: '0.82rem',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="All">All Form Sources</option>
                      <option value="Quote Request">Quote Requests</option>
                      <option value="Site Assessment">Site Assessments</option>
                      <option value="Solar Guide Download">Guide Downloads</option>
                      <option value="Direct Phone/Walk-in">Direct Walk-ins</option>
                      <option value="Customer Review">Customer Reviews</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      style={{
                        height: '40px',
                        padding: '0 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontFamily: 'inherit',
                        fontSize: '0.82rem',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      iconLeft={<RefreshCw size={14} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />}
                      onClick={handleSyncDatabase}
                      disabled={isSyncing}
                      title="Sync latest responses from MongoDB Atlas"
                    >
                      {isSyncing ? 'Syncing...' : 'Sync Cloud DB'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      iconLeft={<Download size={15} />}
                      onClick={handleExportCSV}
                      title="Export all leads as CSV spreadsheet"
                    >
                      Export CSV
                    </Button>

                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      iconLeft={<Plus size={15} />}
                      onClick={() => setIsAddLeadOpen(true)}
                    >
                      Add Lead
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Leads List */}
              {filteredLeads.length === 0 ? (
                <Card variant="white" padding="lg" style={{ textAlign: 'center' }}>
                  <Inbox size={42} style={{ color: 'var(--color-forest-30)', margin: '0 auto 1rem' }} />
                  <h3>No Form Inquiries Found</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                    There are no responses matching your filter. New submissions from "Get a Quote", the Contact form, or the Free Guide modal will appear here automatically.
                  </p>
                </Card>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredLeads.map((lead) => {
                    const statusStyle = getStatusBadgeStyle(lead.status);
                    const whatsappUrl = `https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Hello ${lead.name}, this is Shresthanshi Solar Solutions regarding your enquiry (${lead.id}) for ${lead.category}.`
                    )}`;

                    return (
                      <Card
                        key={lead.id}
                        variant="white"
                        padding="md"
                        style={{
                          borderRadius: '14px',
                          border: '1px solid var(--border-medium)',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 2px 10px rgba(23, 75, 53, 0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.85rem',
                        }}
                      >
                        {/* Top Row: Name, Location, Date, Status, Delete */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                          }}
                        >
                          {/* Client Identity */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#174B35' }}>
                              {lead.name}
                            </h3>

                            {lead.location && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  fontSize: '0.82rem',
                                  color: 'var(--text-body)',
                                  fontWeight: 500,
                                }}
                              >
                                <MapPin size={13} style={{ color: 'var(--color-forest-green)' }} />
                                {lead.location}
                              </span>
                            )}

                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '0.15rem 0.55rem',
                                borderRadius: '999px',
                                backgroundColor: 'var(--color-soft-green)',
                                color: 'var(--color-forest-green)',
                                border: '1px solid var(--border-subtle)',
                              }}
                            >
                              {lead.source}
                            </span>

                            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                              <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                              {new Date(lead.submittedAt).toLocaleString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>

                            {syncedLeadId === lead.id && (
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  color: '#15803D',
                                  backgroundColor: '#DCFCE7',
                                  padding: '0.15rem 0.5rem',
                                  borderRadius: '999px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                }}
                              >
                                <Check size={12} />
                                <span>Saved to Cloud</span>
                              </span>
                            )}
                          </div>

                          {/* Status Dropdown & Delete */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              style={{
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.color,
                                border: `1.5px solid ${statusStyle.border}`,
                                borderRadius: '999px',
                                padding: '0.3rem 0.85rem',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="New">🟡 New</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Site Visit Scheduled">🟣 Site Visit Scheduled</option>
                              <option value="Quotation Sent">🟢 Quotation Sent</option>
                              <option value="Converted">🌟 Converted</option>
                              <option value="Closed">⚪ Closed</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                color: '#9CA3AF',
                                cursor: 'pointer',
                                padding: '0.3rem',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              title="Delete Lead"
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Middle Row: Solar Requirement Highlight */}
                        <div
                          style={{
                            backgroundColor: 'var(--color-soft-green)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            fontSize: '0.86rem',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.75rem',
                            flexWrap: 'wrap',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <strong style={{ color: 'var(--color-forest-green)', whiteSpace: 'nowrap' }}>
                            ⚡ {lead.category}:
                          </strong>
                          <span style={{ color: 'var(--text-body)', flex: 1, lineHeight: 1.5 }}>
                            {lead.details || 'No additional specifications provided.'}
                          </span>
                        </div>

                        {/* Bottom Row: Quick Actions (WhatsApp & Call) + Simple Follow-up Note */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          {/* Direct Contact Buttons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                backgroundColor: '#25D366',
                                color: '#FFFFFF',
                                padding: '0.45rem 0.8rem',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 2px 6px rgba(37, 211, 102, 0.25)',
                              }}
                            >
                              <MessageCircle size={15} />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={`tel:${lead.phone}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                backgroundColor: '#FFFFFF',
                                color: 'var(--color-forest-green)',
                                border: '1.5px solid var(--border-medium)',
                                padding: '0.45rem 0.8rem',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <Phone size={14} />
                              <span>Call ({lead.phone})</span>
                            </a>
                          </div>

                          {/* Owner Note Input */}
                          <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
                            <input
                              type="text"
                              placeholder="Add follow-up note (e.g. site visit booked)..."
                              defaultValue={lead.notes || ''}
                              onBlur={(e) => handleNotesChange(lead.id, e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.45rem 0.75rem',
                                fontSize: '0.82rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-medium)',
                                backgroundColor: '#FAFCFA',
                                outline: 'none',
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
            TAB 2: NOTICE & SUBSIDY ALERT BAR
            ========================================================================= */}
          {activeTab === 'announcement' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: '1.5rem', alignItems: 'start' }}>
              {/* Left Column: Edit Controls */}
              <Card variant="white" padding="lg">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Bell size={20} color="#174B35" />
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
                    Live Client Website Announcement Bar
                  </h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  Control the alert banner pinned across the top of your public website. Changes save directly to MongoDB Atlas and update immediately across all devices.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: editSettings.announcement.enabled ? 'var(--color-soft-green)' : '#F9FAFB',
                      border: `1.5px solid ${editSettings.announcement.enabled ? '#174B35' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={editSettings.announcement.enabled}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          announcement: {
                            ...editSettings.announcement,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      style={{ width: '20px', height: '20px', accentColor: '#174B35' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#174B35' }}>
                        Show Announcement Bar Across Entire Client Website
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {editSettings.announcement.enabled ? '🟢 Banner is ACTIVE and visible to all visitors' : '⚪ Banner is HIDDEN'}
                      </div>
                    </div>
                  </label>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                      Alert Badge Label
                    </label>
                    <input
                      type="text"
                      value={editSettings.announcement.badge}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          announcement: { ...editSettings.announcement, badge: e.target.value },
                        })
                      }
                      placeholder="e.g. PM Surya Ghar Subsidy Alert"
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                      Announcement Message
                    </label>
                    <textarea
                      rows={3}
                      value={editSettings.announcement.text}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          announcement: { ...editSettings.announcement, text: e.target.value },
                        })
                      }
                      placeholder="e.g. Government assistance up to ₹78,000 for residential rooftop solar & PM-KUSUM for solar pumps in Odisha."
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                        fontFamily: 'inherit',
                        lineHeight: 1.5,
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                        Call to Action Link Text
                      </label>
                      <input
                        type="text"
                        value={editSettings.announcement.linkText}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            announcement: { ...editSettings.announcement, linkText: e.target.value },
                          })
                        }
                        placeholder="e.g. Check Eligibility"
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                        Link Destination Path
                      </label>
                      <input
                        type="text"
                        value={editSettings.announcement.linkUrl}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            announcement: { ...editSettings.announcement, linkUrl: e.target.value },
                          })
                        }
                        placeholder="e.g. /resources/subsidy-scheme-guidance"
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <Button
                      type="button"
                      variant="primary"
                      iconLeft={<Save size={16} />}
                      onClick={handleSaveSettings}
                      disabled={isSavingAnnouncement}
                    >
                      {isSavingAnnouncement ? 'Saving to MongoDB Atlas...' : 'Save & Publish Announcement'}
                    </Button>

                    {announcementSavedMsg && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#15803D',
                          backgroundColor: '#DCFCE7',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          border: '1px solid #86EFAC',
                        }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Saved to Cloud &amp; Live!</span>
                      </span>
                    )}
                  </div>
                </div>
              </Card>

              {/* Right Column: Live Real-Time Preview & Quick Presets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* 1. Live Interactive Website Preview */}
                <Card variant="white" padding="lg" style={{ border: '1.5px solid var(--border-medium)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Eye size={18} color="#174B35" />
                      <strong style={{ fontSize: '0.92rem', color: '#174B35' }}>
                        Live Website Preview
                      </strong>
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.55rem',
                        borderRadius: '999px',
                        backgroundColor: editSettings.announcement.enabled ? '#DCFCE7' : '#F3F4F6',
                        color: editSettings.announcement.enabled ? '#166534' : '#6B7280',
                      }}
                    >
                      {editSettings.announcement.enabled ? '🟢 Visible on Website' : '⚪ Hidden'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                    This is how the banner renders at the top of your homepage:
                  </p>

                  {/* Rendered Preview Box */}
                  <div
                    style={{
                      border: '1.5px solid var(--border-medium)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#F3F4F6',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.7rem',
                        color: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                      <span style={{ marginLeft: '0.35rem', fontFamily: 'monospace' }}>https://shresthanshisolarsolutions.vercel.app/</span>
                    </div>

                    {editSettings.announcement.enabled ? (
                      <div
                        style={{
                          background: 'linear-gradient(90deg, #062316 0%, #0F3E2B 30%, #174B35 70%, #08281A 100%)',
                          color: '#FFFFFF',
                          padding: '0.62rem 0.85rem',
                          fontSize: '0.8rem',
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.65rem',
                          flexWrap: 'wrap',
                          borderBottom: '2px solid rgba(250, 204, 21, 0.45)',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: '#FEF08A',
                            color: '#14532D',
                            border: '1px solid #FDE047',
                            padding: '0.15rem 0.6rem',
                            borderRadius: '999px',
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#16A34A',
                              display: 'inline-block',
                              animation: 'pulseDot 2s infinite',
                            }}
                          />
                          <span>{editSettings.announcement.badge || 'Alert'}</span>
                        </span>
                        <span style={{ color: '#FFFFFF', fontWeight: 600 }}>
                          {editSettings.announcement.text || 'Your announcement message...'}
                        </span>
                        {editSettings.announcement.linkText && (
                          <span
                            style={{
                              backgroundColor: '#86EFAC',
                              color: '#062316',
                              padding: '0.18rem 0.65rem',
                              borderRadius: '999px',
                              fontWeight: 800,
                              fontSize: '0.72rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                            }}
                          >
                            <span>{editSettings.announcement.linkText}</span>
                            <ChevronRight size={12} />
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: '1.25rem',
                          textAlign: 'center',
                          color: '#9CA3AF',
                          fontSize: '0.8rem',
                          backgroundColor: '#FAFAFA',
                        }}
                      >
                        <EyeOff size={20} style={{ margin: '0 auto 0.35rem' }} />
                        <span>Announcement bar is currently disabled. No alert will show at the top of the site.</span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                      to="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--color-forest-green)',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Open Live Website to Verify</span>
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                </Card>

                {/* 2. Quick Testing Presets Card */}
                <Card variant="white" padding="md" style={{ border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
                  <strong style={{ display: 'block', fontSize: '0.88rem', color: '#174B35', marginBottom: '0.4rem' }}>
                    ⚡ 1-Click Testing Presets
                  </strong>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Click any preset below to automatically load ready-to-publish banner templates:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() =>
                        setEditSettings({
                          ...editSettings,
                          announcement: {
                            enabled: true,
                            badge: 'PM Surya Ghar Subsidy Alert',
                            text: 'Government assistance up to ₹78,000 for residential rooftop solar & PM-KUSUM for solar pumps in Odisha.',
                            linkText: 'Check Eligibility',
                            linkUrl: '/resources/subsidy-scheme-guidance',
                          },
                        })
                      }
                      style={{
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span><strong>Preset 1:</strong> PM Surya Ghar Subsidy (₹78,000)</span>
                      <span style={{ fontSize: '0.72rem', color: '#15803D' }}>Apply</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditSettings({
                          ...editSettings,
                          announcement: {
                            enabled: true,
                            badge: 'Agriculture Solar Pump Scheme',
                            text: 'Apply for high-discharge 3 HP & 5 HP solar pumps with daytime irrigation and dual-mode grid support.',
                            linkText: 'Farmer Guide',
                            linkUrl: '/who-we-serve/farmers',
                          },
                        })
                      }
                      style={{
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span><strong>Preset 2:</strong> PM-KUSUM Agricultural Solar Pumps</span>
                      <span style={{ fontSize: '0.72rem', color: '#15803D' }}>Apply</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditSettings({
                          ...editSettings,
                          announcement: {
                            enabled: true,
                            badge: 'Free Site Survey in Kalahandi',
                            text: 'Book a free engineering terrace shadow analysis from our Narla Road Head Office or Bhubaneswar Sub-Branch.',
                            linkText: 'Book Site Survey',
                            linkUrl: '/contact',
                          },
                        })
                      }
                      style={{
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        borderRadius: '8px',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span><strong>Preset 3:</strong> Free Rooftop Assessment Survey</span>
                      <span style={{ fontSize: '0.72rem', color: '#15803D' }}>Apply</span>
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* =========================================================================
            TAB 4: COMPANY & CONTACT INFO SETTINGS
            ========================================================================= */}
          {activeTab === 'contact' && (
            <div style={{ maxWidth: '720px' }}>
              <Card variant="white" padding="lg">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Settings size={20} color="#174B35" />
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
                    Business Contact &amp; Header Settings
                  </h3>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Update your official contact phone, WhatsApp line, registered address, and working hours. This dynamically updates across the site header, mobile menu, footer, and contact page.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                        Calling Phone Display
                      </label>
                      <input
                        type="text"
                        value={editSettings.contact.phoneDisplay}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            contact: {
                              ...editSettings.contact,
                              phoneDisplay: e.target.value,
                              phoneHref: `tel:${e.target.value.replace(/\D/g, '')}`,
                            },
                          })
                        }
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={editSettings.contact.whatsappNumber}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            contact: { ...editSettings.contact, whatsappNumber: e.target.value },
                          })
                        }
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        value={editSettings.contact.email}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            contact: { ...editSettings.contact, email: e.target.value },
                          })
                        }
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                        Proprietor Name
                      </label>
                      <input
                        type="text"
                        value={editSettings.contact.proprietor}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            contact: { ...editSettings.contact, proprietor: e.target.value },
                          })
                        }
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                      Registered Office Address
                    </label>
                    <input
                      type="text"
                      value={editSettings.contact.address}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          contact: { ...editSettings.contact, address: e.target.value },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={editSettings.contact.workingHours}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          contact: { ...editSettings.contact, workingHours: e.target.value },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>

                  {/* Social Media Links Section */}
                  <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#174B35', marginBottom: '0.75rem' }}>
                      Footer Social Media Channel Links
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                          Facebook Page URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://facebook.com/your-profile"
                          value={editSettings.social?.facebook || ''}
                          onChange={(e) =>
                            setEditSettings({
                              ...editSettings,
                              social: {
                                facebook: e.target.value,
                                instagram: editSettings.social?.instagram || '',
                                youtube: editSettings.social?.youtube || '',
                              },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '0.55rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-subtle)',
                            fontSize: '0.88rem',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                          Instagram Profile URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://instagram.com/your-profile"
                          value={editSettings.social?.instagram || ''}
                          onChange={(e) =>
                            setEditSettings({
                              ...editSettings,
                              social: {
                                facebook: editSettings.social?.facebook || '',
                                instagram: e.target.value,
                                youtube: editSettings.social?.youtube || '',
                              },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '0.55rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-subtle)',
                            fontSize: '0.88rem',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                          YouTube Channel URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://youtube.com/@your-channel"
                          value={editSettings.social?.youtube || ''}
                          onChange={(e) =>
                            setEditSettings({
                              ...editSettings,
                              social: {
                                facebook: editSettings.social?.facebook || '',
                                instagram: editSettings.social?.instagram || '',
                                youtube: e.target.value,
                              },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '0.55rem 0.85rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1.5px solid var(--border-subtle)',
                            fontSize: '0.88rem',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <Button
                      type="button"
                      variant="primary"
                      iconLeft={<Save size={16} />}
                      onClick={handleSaveSettings}
                    >
                      Save Business Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Container>
      </div>

      {/* Manual Add Lead Modal */}
      <Modal isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} titleId="add-lead-title">
        <div style={{ padding: '0.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 id="add-lead-title" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#174B35', margin: 0 }}>
              Record Walk-in or Phone Lead
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
              Add an incoming client enquiry directly into your response management pipeline.
            </p>
          </div>

          <form onSubmit={handleCreateLead}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <Input
                label="Customer Name"
                placeholder="e.g. Ramesh Patel"
                value={newLeadName}
                onChange={(e) => setNewLeadName(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                placeholder="e.g. 9438080874"
                value={newLeadPhone}
                onChange={(e) => setNewLeadPhone(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <Input
                label="City / Town in Odisha"
                placeholder="e.g. Junagarh, Kalahandi"
                value={newLeadLocation}
                onChange={(e) => setNewLeadLocation(e.target.value)}
              />
              <div className="ui-field">
                <label className="ui-field__label">Solar Requirement</label>
                <select
                  value={newLeadCategory}
                  onChange={(e) => setNewLeadCategory(e.target.value)}
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-subtle)',
                    fontSize: '0.88rem',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="Residential Rooftop Solar">Residential Rooftop Solar</option>
                  <option value="Commercial Solar Plants">Commercial Solar Plants</option>
                  <option value="Solar Water Pumps">Solar Water Pumps</option>
                  <option value="Solar Street Lighting">Solar Street Lighting</option>
                  <option value="Solar Maintenance & AMC">Solar Maintenance &amp; AMC</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <Textarea
                label="Requirement Details &amp; Notes"
                placeholder="e.g. 5 HP solar submersible pump on farm, visited office in Bhawanipatna..."
                value={newLeadDetails}
                onChange={(e) => setNewLeadDetails(e.target.value)}
                rows={3}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <Button type="button" variant="outline" size="md" onClick={() => setIsAddLeadOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Add to Pipeline
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
