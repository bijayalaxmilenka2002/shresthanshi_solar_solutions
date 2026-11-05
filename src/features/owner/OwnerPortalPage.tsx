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
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { SEO } from '../../components/common/SEO';
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
} from '../../services/enquiryService';
import { useSiteSettings } from '../../app/providers';
import { SiteSettings } from '../../services/siteSettingsService';

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');

    setTimeout(() => {
      const u = loginUsername.trim().toLowerCase();
      const p = loginPassword.trim();

      // Owner valid credentials:
      // Username: admin OR shubham OR shubham@shresthanshi.com
      // Password: shresthanshi2026 OR admin123
      if (
        (u === 'admin' || u === 'shubham' || u === 'shubham@shresthanshi.com') &&
        (p === 'shresthanshi2026' || p === 'admin123')
      ) {
        sessionStorage.setItem('shresthanshi_owner_auth', 'true');
        if (rememberMe) {
          localStorage.setItem('shresthanshi_owner_remember', 'true');
        }
        setIsAuthenticated(true);
      } else {
        setAuthError('Invalid owner credentials. Access denied.');
      }
      setLoginLoading(false);
    }, 350);
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

  // Tabs: 'inbox' | 'sections' | 'announcement' | 'contact'
  const [activeTab, setActiveTab] = useState<'inbox' | 'sections' | 'announcement' | 'contact'>('inbox');

  // Leads state
  const [leads, setLeads] = useState<UnifiedLead[]>(getAllLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

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
  };

  const handleNotesChange = (id: string, notes: string) => {
    updateLeadNotes(id, notes);
    setLeads(getAllLeads());
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
      location: newLeadLocation.trim() || 'Kalahandi, Odisha',
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

  const handleSaveSettings = () => {
    updateSettings(editSettings);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
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
              Prop. Shubham Pratap Singh • Administrative Control
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

            {/* Quick credentials hint for proprietor */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.85rem',
                backgroundColor: 'var(--color-soft-green)',
                borderRadius: '10px',
                border: '1px solid var(--border-medium)',
                fontSize: '0.76rem',
                color: 'var(--color-forest-green)',
                lineHeight: 1.5,
              }}
            >
              <strong>Default Owner Credentials:</strong>
              <div>Username: <code style={{ fontWeight: 700 }}>admin</code></div>
              <div>Password: <code style={{ fontWeight: 700 }}>shresthanshi2026</code></div>
            </div>

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
                  Owner Response Portal • Prop. Shubham Pratap Singh
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '0.28rem 0.65rem',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#4ADE80',
                  }}
                />
                Live Synced
              </span>

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
            onClick={() => setActiveTab('sections')}
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
              backgroundColor: activeTab === 'sections' ? '#174B35' : 'transparent',
              color: activeTab === 'sections' ? '#FFFFFF' : 'var(--color-forest-green)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 150ms ease',
            }}
          >
            <Layout size={17} />
            <span>Dynamic Website Sections</span>
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
                    `Hello ${lead.name}, this is Shubham Pratap Singh from Shresthanshi Solar Solutions regarding your enquiry (${lead.id}) for ${lead.category}.`
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
            TAB 2: DYNAMIC WEBSITE SECTIONS MANAGER
            ========================================================================= */}
        {activeTab === 'sections' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#174B35', margin: 0 }}>
                  Client Site Section Visibility &amp; Content Controls
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  Enable, disable, or customize sections on the public client homepage without editing code. Changes apply immediately!
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button type="button" variant="outline" size="sm" onClick={resetSettings}>
                  Reset Defaults
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  iconLeft={<Save size={16} />}
                  onClick={handleSaveSettings}
                >
                  Save Live Changes
                </Button>
              </div>
            </div>

            {saveSuccessMsg && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#DCFCE7',
                  border: '1px solid #86EFAC',
                  color: '#166534',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <CheckCircle2 size={18} />
                <span>Website sections updated successfully! Your public site now reflects these changes.</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {/* Homepage Sections Visibility Toggles */}
              <Card variant="white" padding="lg">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Eye size={20} color="#174B35" />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Homepage Section Toggles</h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Toggle sections on or off to adjust what visitors see on the public homepage.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    {
                      key: 'applications' as const,
                      title: 'Where Solar Fits In (Applications Grid)',
                      desc: '3 visual cards for Home, Farm, and Commercial applications.',
                    },
                    {
                      key: 'coreServices' as const,
                      title: 'Comprehensive Solar Energy Services (Core 4 Cards)',
                      desc: 'Rooftop solar, solar pumps, overhead sensor pumps, and street lights.',
                    },
                    {
                      key: 'processTimeline' as const,
                      title: 'Step-by-Step Solar Implementation Timeline',
                      desc: 'Site survey, design, DISCOM net-metering & commissioning steps.',
                    },
                    {
                      key: 'fieldHighlights' as const,
                      title: 'Field Highlights & Installation Photos',
                      desc: 'Real project photos from Kalahandi and western Odisha.',
                    },
                    {
                      key: 'trustBanner' as const,
                      title: 'Enterprise Trust & Government Scheme Banner',
                      desc: 'Highlights zero diesel cost, PM Surya Ghar subsidy, and DISCOM meter setup.',
                    },
                    {
                      key: 'faqSection' as const,
                      title: 'Frequently Asked Questions (FAQ Section)',
                      desc: 'Common questions on solar sizing, net-metering, and pump specs.',
                    },
                    {
                      key: 'heroCaption' as const,
                      title: 'Hero Image Location Caption Card',
                      desc: '"Rooted in Kalahandi, Serving Odisha" badge over hero photo.',
                    },
                  ].map((sec) => (
                    <label
                      key={sec.key}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: editSettings.sections[sec.key] ? 'var(--color-soft-green)' : '#F9FAFB',
                        border: `1.5px solid ${editSettings.sections[sec.key] ? 'var(--color-forest-green)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={editSettings.sections[sec.key]}
                        onChange={(e) =>
                          setEditSettings({
                            ...editSettings,
                            sections: {
                              ...editSettings.sections,
                              [sec.key]: e.target.checked,
                            },
                          })
                        }
                        style={{ marginTop: '0.2rem', width: '18px', height: '18px', accentColor: '#174B35' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#174B35' }}>{sec.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{sec.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Editable Hero Section Content */}
              <Card variant="white" padding="lg">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Sliders size={20} color="#174B35" />
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Customize Homepage Hero Copy</h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Edit the primary headlines visitors see upon landing on your website.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                      Top Hero Badge Tag
                    </label>
                    <input
                      type="text"
                      value={editSettings.hero.badge}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          hero: { ...editSettings.hero, badge: e.target.value },
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
                      Hero Main Title
                    </label>
                    <input
                      type="text"
                      value={editSettings.hero.title}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          hero: { ...editSettings.hero, title: e.target.value },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#174B35', marginBottom: '0.35rem' }}>
                      Hero Subtitle Description
                    </label>
                    <textarea
                      rows={3}
                      value={editSettings.hero.subtitle}
                      onChange={(e) =>
                        setEditSettings({
                          ...editSettings,
                          hero: { ...editSettings.hero, subtitle: e.target.value },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: '0.5rem' }}>
                    <Button
                      type="button"
                      variant="primary"
                      fullWidth
                      iconLeft={<Save size={16} />}
                      onClick={handleSaveSettings}
                    >
                      Update Public Homepage
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: NOTICE & SUBSIDY ALERT BAR
            ========================================================================= */}
        {activeTab === 'announcement' && (
          <div style={{ maxWidth: '720px' }}>
            <Card variant="white" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Bell size={20} color="#174B35" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
                  Live Client Website Announcement Bar
                </h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Control the alert banner pinned across the top of your public website. Perfect for government subsidy announcements (e.g., PM Surya Ghar, PM-KUSUM) or urgent field updates.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: editSettings.announcement.enabled ? 'var(--color-soft-green)' : '#F9FAFB',
                    border: '1.5px solid var(--border-subtle)',
                    cursor: 'pointer',
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
                      When enabled, this bar displays at the very top of all client pages.
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
                      padding: '0.55rem 0.85rem',
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
                    rows={2}
                    value={editSettings.announcement.text}
                    onChange={(e) =>
                      setEditSettings({
                        ...editSettings,
                        announcement: { ...editSettings.announcement, text: e.target.value },
                      })
                    }
                    placeholder="e.g. Government subsidy up to ₹78,000 available across Odisha for rooftop solar installations."
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-subtle)',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
                        padding: '0.55rem 0.85rem',
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
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-subtle)',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Button
                    type="button"
                    variant="primary"
                    iconLeft={<Save size={16} />}
                    onClick={handleSaveSettings}
                  >
                    Save &amp; Publish Announcement
                  </Button>
                </div>
              </div>
            </Card>
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
