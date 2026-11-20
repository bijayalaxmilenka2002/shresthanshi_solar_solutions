import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  LogOut,
  Building2,
  MapPin,
  MessageCircle,
  FileText,
  UserCheck,
  Plus,
  RefreshCw,
  Download,
  Eye,
  Sliders,
  Check,
  X,
  Lock,
} from 'lucide-react';
import { Container } from '@views/components/ui/Container';
import { Card } from '@views/components/ui/Card';
import { Button } from '@views/components/ui/Button';
import { Input, Textarea } from '@views/components/ui/Input';
import { Modal } from '@views/components/ui/Modal';
import { SEO } from '@views/components/common/SEO';
import {
  Employee,
  EmployeeActivity,
  ActivityType,
  VerificationStatus,
  getAllEmployees,
  getAllActivities,
  logEmployeeActivity,
  updateActivityVerification,
  exportActivitiesToCSV,
} from '@models/services/employeeActivityService';

export const SuperAdminPortalPage: React.FC = () => {
  const navigate = useNavigate();

  // Authentication check (Shares session with Owner Portal or standalone Super Admin login)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('shresthanshi_superadmin_auth') === 'true' ||
      sessionStorage.getItem('shresthanshi_owner_auth') === 'true' ||
      localStorage.getItem('shresthanshi_owner_remember') === 'true'
    );
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [employees, setEmployees] = useState<Employee[]>(getAllEmployees);
  const [activities, setActivities] = useState<EmployeeActivity[]>(getAllActivities);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'feed' | 'employees' | 'contacts'>('feed');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  // Audit Remark Modal
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [activeActivityForRemark, setActiveActivityForRemark] = useState<EmployeeActivity | null>(null);
  const [remarkInput, setRemarkInput] = useState('');
  const [selectedVerificationChoice, setSelectedVerificationChoice] = useState<VerificationStatus>('Verified Work');

  // Log Outreach Modal
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [newEmpId, setNewEmpId] = useState(employees[0]?.id || 'EMP-01');
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustLocation, setNewCustLocation] = useState('Bhubaneswar, Odisha');
  const [newActivityType, setNewActivityType] = useState<ActivityType>('Phone Call');
  const [newDuration, setNewDuration] = useState('10 mins call');
  const [newNotes, setNewNotes] = useState('');
  const [newOutcome, setNewOutcome] = useState<'Interested - Proceeding' | 'Quotation Awaited' | 'Site Visit Booked' | 'Follow-up Required' | 'Not Reachable' | 'Deal Finalized'>('Interested - Proceeding');

  // Sync data with storage
  useEffect(() => {
    const handleUpdate = () => {
      setActivities(getAllActivities());
      setEmployees(getAllEmployees());
    };
    window.addEventListener('employee_activities_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('employee_activities_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const u = username.trim().toLowerCase();
      const p = password.trim();

      // Cryptographic hash comparison
      const enc = new TextEncoder().encode(u);
      const hashBuf = await window.crypto.subtle.digest('SHA-256', enc);
      const userHash = Array.from(new Uint8Array(hashBuf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const encP = new TextEncoder().encode(p);
      const hashBufP = await window.crypto.subtle.digest('SHA-256', encP);
      const passHash = Array.from(new Uint8Array(hashBufP))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      // Authorized credentials:
      // 'superadmin', 'admin', 'shubham'
      const validUserHashes = [
        '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // admin
        '10f6d3ce9d854d1ebfc1ca7d1981fafc122a9970093382f2c5c72cfa6ab47572', // shubham
        'd82494f05d6917ba02f7aac2a9099832edd62a167484976126f406091b4ab5d6', // superadmin
      ];
      const validPassHash = '13d1832743bde8780d5f2f0ecc1dba9fda16a99d73cb5c562ed4de0ed71d6245'; // shresthanshi2026

      if (validUserHashes.includes(userHash) && passHash === validPassHash) {
        sessionStorage.setItem('shresthanshi_superadmin_auth', 'true');
        sessionStorage.setItem('shresthanshi_owner_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setAuthError('Invalid Super Admin credentials. Access denied.');
      }
    } catch {
      setAuthError('Authentication verification failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('shresthanshi_superadmin_auth');
    sessionStorage.removeItem('shresthanshi_owner_auth');
    localStorage.removeItem('shresthanshi_owner_remember');
    setIsAuthenticated(false);
  };

  // Quick verification
  const handleQuickVerify = (activityId: string, status: VerificationStatus) => {
    updateActivityVerification(activityId, status);
    setActivities(getAllActivities());
  };

  // Open Remark Modal
  const handleOpenRemarkModal = (act: EmployeeActivity) => {
    setActiveActivityForRemark(act);
    setRemarkInput(act.superAdminRemarks || '');
    setSelectedVerificationChoice(act.verificationStatus);
    setRemarkModalOpen(true);
  };

  const handleSaveRemark = () => {
    if (activeActivityForRemark) {
      updateActivityVerification(
        activeActivityForRemark.id,
        selectedVerificationChoice,
        remarkInput.trim()
      );
      setActivities(getAllActivities());
      setRemarkModalOpen(false);
      setActiveActivityForRemark(null);
    }
  };

  // Handle new activity logging
  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustPhone.trim()) {
      alert('Please enter customer name and phone number.');
      return;
    }

    const assignedEmp = employees.find((e) => e.id === newEmpId) || employees[0];

    logEmployeeActivity({
      employeeId: assignedEmp.id,
      employeeName: assignedEmp.name,
      employeeRole: assignedEmp.role,
      customerName: newCustName.trim(),
      customerPhone: newCustPhone.trim(),
      customerLocation: newCustLocation.trim(),
      activityType: newActivityType,
      durationOrScope: newDuration.trim() || 'Logged via Super Admin',
      notes: newNotes.trim() || 'Outreach logged directly for employee verification',
      outcome: newOutcome,
    });

    setActivities(getAllActivities());
    setLogModalOpen(false);
    // Reset
    setNewCustName('');
    setNewCustPhone('');
    setNewNotes('');
  };

  // Export CSV
  const handleExport = () => {
    try {
      const csv = exportActivitiesToCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `shresthanshi_employee_activity_audit_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert('Unable to export activities to CSV.');
    }
  };

  // Filtering activities
  const filteredActivities = activities.filter((act) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      act.customerName.toLowerCase().includes(q) ||
      act.customerPhone.includes(q) ||
      act.customerLocation.toLowerCase().includes(q) ||
      act.employeeName.toLowerCase().includes(q) ||
      act.notes.toLowerCase().includes(q) ||
      act.id.toLowerCase().includes(q);

    const matchesEmp =
      selectedEmployeeFilter === 'All' || act.employeeId === selectedEmployeeFilter;
    const matchesType =
      selectedTypeFilter === 'All' || act.activityType === selectedTypeFilter;
    const matchesStatus =
      selectedStatusFilter === 'All' || act.verificationStatus === selectedStatusFilter;

    return matchesSearch && matchesEmp && matchesType && matchesStatus;
  });

  // Calculate high-level metrics
  const totalActivities = activities.length;
  const verifiedCount = activities.filter((a) => a.verificationStatus === 'Verified Work').length;
  const pendingReviewCount = activities.filter((a) => a.verificationStatus === 'Pending Review').length;
  const flaggedCount = activities.filter((a) => a.verificationStatus === 'Flagged Discrepancy').length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const activitiesToday = activities.filter((a) => a.timestamp.slice(0, 10) === todayStr).length;

  // Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0A2518',
          backgroundImage:
            'radial-gradient(circle at 50% 20%, rgba(23, 75, 53, 0.6) 0%, rgba(10, 37, 24, 0.98) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        <SEO
          title="Super Admin Access — Employee Oversight Portal"
          description="Restricted Super Admin Console for Employee Activity & Outreach Audit"
          canonicalPath="/super-admin"
          noIndex={true}
        />

        <div
          style={{
            width: '100%',
            maxWidth: '450px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#103726',
              padding: '2rem 2rem 1.5rem',
              color: '#FFFFFF',
              borderBottom: '3px solid #10B981',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#34D399',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                border: '1px solid rgba(52, 211, 153, 0.3)',
              }}
            >
              <ShieldAlert size={14} />
              <span>Super Admin Level Access</span>
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
              Employee Oversight Portal
            </h1>
            <p style={{ margin: 0, fontSize: '0.84rem', opacity: 0.85, lineHeight: 1.45 }}>
              Track staff daily work, verify who employees contacted, and audit client outreach records.
            </p>
          </div>

          <div style={{ padding: '2rem' }}>
            {authError && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1.5px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <Input
                  label="Super Admin Username"
                  name="superAdminUsername"
                  type="text"
                  placeholder="superadmin or admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <Input
                  label="Master Passcode"
                  name="superAdminPassword"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth disabled={authLoading}>
                <Lock size={16} />
                <span>{authLoading ? 'Verifying Super Admin...' : 'Enter Super Admin Console'}</span>
              </Button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.75rem', fontSize: '0.82rem' }}>
              <Link to="/owner-portal" style={{ color: 'var(--color-forest-green)', fontWeight: 700, textDecoration: 'none' }}>
                &larr; Switch to Owner Portal
              </Link>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F4F7F5', minHeight: '100vh', paddingBottom: '5rem', fontFamily: 'var(--font-body)' }}>
      <SEO
        title="Super Admin Portal — Employee Activities & Outreach Oversight | Shresthanshi Solar"
        description="Master supervisory dashboard to inspect employee customer contacts, verify field activity, and audit daily operations."
        canonicalPath="/super-admin"
        noIndex={true}
      />

      {/* Top Banner & Connected Navigation */}
      <div
        style={{
          backgroundColor: '#0F3324',
          color: '#FFFFFF',
          padding: '0.9rem 0',
          borderBottom: '2px solid rgba(16, 185, 129, 0.4)',
        }}
      >
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#10B981',
                  color: '#0F3324',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
                }}
              >
                SA
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h1 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#FFFFFF', lineHeight: 1.2 }}>
                    Super Admin Console
                  </h1>
                  <span
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.25)',
                      color: '#6EE7B7',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    Employee Oversight Active
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', opacity: 0.8, marginTop: '2px' }}>
                  Shresthanshi Solar Solutions • Full Employee Work Accountability
                </div>
              </div>
            </div>

            {/* Connected Action Buttons (Bridges Owner Portal & Super Admin) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              {/* Direct Bridge Button to Owner Portal */}
              <Link
                to="/owner-portal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-forest-green)',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transition: 'all 150ms ease',
                }}
              >
                <Sliders size={15} style={{ color: 'var(--color-forest-green)' }} />
                <span>Go to Owner Portal</span>
              </Link>

              <button
                type="button"
                onClick={handleExport}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
                title="Export employee outreach log to CSV"
              >
                <Download size={14} />
                <span>Export Audit CSV</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#FCA5A5',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div style={{ paddingTop: '1.75rem' }}>
        <Container>
        {/* Key Operational Insight Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.15rem',
            marginBottom: '1.75rem',
          }}
        >
          {/* 1. Active Employees */}
          <Card
            variant="white"
            padding="md"
            style={{
              borderRadius: '14px',
              border: '1.5px solid var(--border-medium)',
              boxShadow: '0 2px 8px rgba(23,75,53,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Field Staff on Duty
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-forest-green)', lineHeight: 1.1 }}>
                {employees.length} Staff Active
              </div>
              <div style={{ fontSize: '0.74rem', color: '#15803D', fontWeight: 700, marginTop: '2px' }}>
                Bhubaneswar HQ &amp; Kalahandi
              </div>
            </div>
          </Card>

          {/* 2. Total Customer Contacts */}
          <Card
            variant="white"
            padding="md"
            style={{
              borderRadius: '14px',
              border: '1.5px solid var(--border-medium)',
              boxShadow: '0 2px 8px rgba(23,75,53,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#E0F2FE',
                color: '#0369A1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <PhoneCall size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Total Outreach Logs
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0369A1', lineHeight: 1.1 }}>
                {totalActivities} Contacts
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                {activitiesToday} logged today
              </div>
            </div>
          </Card>

          {/* 3. Verified Proper Work */}
          <Card
            variant="white"
            padding="md"
            style={{
              borderRadius: '14px',
              border: '1.5px solid var(--border-medium)',
              boxShadow: '0 2px 8px rgba(23,75,53,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Work Verified by Super Admin
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#16A34A', lineHeight: 1.1 }}>
                {verifiedCount} Verified
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                {pendingReviewCount} pending review
              </div>
            </div>
          </Card>

          {/* 4. Attention Required / Flagged */}
          <Card
            variant="white"
            padding="md"
            style={{
              borderRadius: '14px',
              border: '1.5px solid var(--border-medium)',
              boxShadow: '0 2px 8px rgba(23,75,53,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: flaggedCount > 0 ? '#FEF2F2' : '#F3F4F6',
                color: flaggedCount > 0 ? '#DC2626' : '#9CA3AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                Flagged / Discrepancies
              </div>
              <div style={{ fontSize: '1.65rem', fontWeight: 900, color: flaggedCount > 0 ? '#DC2626' : '#4B5563', lineHeight: 1.1 }}>
                {flaggedCount} Issues
              </div>
              <div style={{ fontSize: '0.74rem', color: flaggedCount > 0 ? '#DC2626' : 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                {flaggedCount > 0 ? 'Requires employee review' : 'All audits clear'}
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.85rem',
            borderBottom: '2px solid var(--border-subtle)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('feed')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.7rem 1.15rem',
                borderRadius: '8px 8px 0 0',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'feed' ? '#174B35' : 'transparent',
                color: activeTab === 'feed' ? '#FFFFFF' : 'var(--color-forest-green)',
                whiteSpace: 'nowrap',
              }}
            >
              <PhoneCall size={16} />
              <span>Client Outreach &amp; Activity Log</span>
              <span
                style={{
                  backgroundColor: activeTab === 'feed' ? '#FFFFFF' : 'var(--color-soft-green)',
                  color: activeTab === 'feed' ? '#174B35' : 'var(--color-forest-green)',
                  padding: '0.1rem 0.5rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                }}
              >
                {filteredActivities.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('employees')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.7rem 1.15rem',
                borderRadius: '8px 8px 0 0',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'employees' ? '#174B35' : 'transparent',
                color: activeTab === 'employees' ? '#FFFFFF' : 'var(--color-forest-green)',
                whiteSpace: 'nowrap',
              }}
            >
              <Users size={16} />
              <span>Employee Performance &amp; Accountability</span>
              <span
                style={{
                  backgroundColor: activeTab === 'employees' ? '#FFFFFF' : 'var(--color-soft-green)',
                  color: activeTab === 'employees' ? '#174B35' : 'var(--color-forest-green)',
                  padding: '0.1rem 0.5rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                }}
              >
                {employees.length} Staff
              </span>
            </button>
          </div>

          {/* Quick Record Action */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setLogModalOpen(true)}
            iconLeft={<Plus size={16} />}
            style={{ marginBottom: '0.4rem' }}
          >
            Record Employee Outreach
          </Button>
        </div>

        {/* Tab 1: Live Client Outreach & Activity Feed */}
        {activeTab === 'feed' && (
          <div>
            {/* Filter Bar */}
            <Card
              variant="white"
              padding="sm"
              style={{
                marginBottom: '1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-medium)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search customer, phone, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem 0.55rem 2.4rem',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                    }}
                  />
                </div>

                {/* Filter by Employee */}
                <div>
                  <select
                    value={selectedEmployeeFilter}
                    onChange={(e) => setSelectedEmployeeFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="All">All Employees (Staff)</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.department})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Activity Type */}
                <div>
                  <select
                    value={selectedTypeFilter}
                    onChange={(e) => setSelectedTypeFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="All">All Activity Types</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp Outreach">WhatsApp Outreach</option>
                    <option value="Site Assessment Visit">Site Assessment Visit</option>
                    <option value="Quotation Prepared & Sent">Quotation Prepared & Sent</option>
                    <option value="Subsidy Document Verification">Subsidy Document Verification</option>
                    <option value="Net-Meter Synchronization Inspection">Net-Meter Inspection</option>
                  </select>
                </div>

                {/* Filter by Super Admin Verification */}
                <div>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="All">All Audit Statuses</option>
                    <option value="Verified Work">Verified Work Only</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Flagged Discrepancy">Flagged Issues Only</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Activities List */}
            {filteredActivities.length === 0 ? (
              <Card variant="white" padding="lg" style={{ textAlign: 'center', borderRadius: '14px', border: '1px solid var(--border-medium)' }}>
                <Users size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem' }} />
                <h3 style={{ margin: '0 0 0.35rem 0', color: 'var(--color-forest-green)' }}>No outreach records found</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Try adjusting your search criteria or employee filter.
                </p>
              </Card>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredActivities.map((act) => {
                  const emp = employees.find((e) => e.id === act.employeeId);
                  const isVerified = act.verificationStatus === 'Verified Work';
                  const isFlagged = act.verificationStatus === 'Flagged Discrepancy';

                  return (
                    <Card
                      key={act.id}
                      variant="white"
                      padding="md"
                      style={{
                        borderRadius: '14px',
                        border: isFlagged
                          ? '2px solid #FCA5A5'
                          : isVerified
                          ? '1.5px solid #86EFAC'
                          : '1.5px solid var(--border-medium)',
                        boxShadow: '0 2px 10px rgba(23,75,53,0.04)',
                        backgroundColor: isFlagged ? '#FFFDFD' : '#FFFFFF',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                        {/* Employee & Time */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '10px',
                              backgroundColor: emp?.avatarBg || '#174B35',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                              flexShrink: 0,
                            }}
                          >
                            {act.employeeName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                                {act.employeeName}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  backgroundColor: 'var(--color-soft-green)',
                                  color: 'var(--color-forest-green)',
                                  padding: '0.12rem 0.5rem',
                                  borderRadius: '6px',
                                }}
                              >
                                {emp?.department || 'Odisha Operations'}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {act.employeeRole} • Logged at {new Date(act.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, {new Date(act.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>

                        {/* Verification Status Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              fontSize: '0.74rem',
                              fontWeight: 800,
                              padding: '0.3rem 0.75rem',
                              borderRadius: '999px',
                              backgroundColor: isVerified
                                ? '#DCFCE7'
                                : isFlagged
                                ? '#FEE2E2'
                                : '#FEF3C7',
                              color: isVerified
                                ? '#15803D'
                                : isFlagged
                                ? '#B91C1C'
                                : '#B45309',
                              border: `1px solid ${
                                isVerified ? '#86EFAC' : isFlagged ? '#FCA5A5' : '#FDE68A'
                              }`,
                            }}
                          >
                            {isVerified && <CheckCircle2 size={13} />}
                            {isFlagged && <AlertTriangle size={13} />}
                            {!isVerified && !isFlagged && <Clock size={13} />}
                            <span>{act.verificationStatus}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleOpenRemarkModal(act)}
                            style={{
                              backgroundColor: '#FFFFFF',
                              color: 'var(--color-forest-green)',
                              border: '1.5px solid var(--border-medium)',
                              padding: '0.3rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            Review / Add Remarks
                          </button>
                        </div>
                      </div>

                      {/* Customer Contacted Grid */}
                      <div
                        style={{
                          backgroundColor: '#F8FAF9',
                          borderRadius: '10px',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.9rem 1.15rem',
                          marginBottom: '0.85rem',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '0.85rem',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            Customer Contacted
                          </div>
                          <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-forest-green)', marginTop: '2px' }}>
                            {act.customerName}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '3px' }}>
                            <MapPin size={13} />
                            <span>{act.customerLocation}</span>
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            Contact Number &amp; Link
                          </div>
                          <div style={{ marginTop: '2px' }}>
                            <a
                              href={`tel:${act.customerPhone}`}
                              style={{
                                fontSize: '0.92rem',
                                fontWeight: 800,
                                color: '#15803D',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                              }}
                            >
                              <PhoneCall size={14} />
                              <span>{act.customerPhone}</span>
                            </a>
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                            {act.leadReferenceId ? `Ref Lead: ${act.leadReferenceId}` : 'Direct Customer Interaction'}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            Action / Interaction Type
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: '2px' }}>
                            {act.activityType}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                            Scope: {act.durationOrScope}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            Recorded Outcome
                          </div>
                          <div style={{ marginTop: '2px' }}>
                            <span
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                backgroundColor: '#E8F2E8',
                                color: 'var(--color-forest-green)',
                                padding: '0.15rem 0.55rem',
                                borderRadius: '4px',
                                display: 'inline-block',
                              }}
                            >
                              {act.outcome}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Work Notes / Customer Discussion */}
                      <div style={{ marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '0.2rem' }}>
                          Employee Detailed Work Notes:
                        </div>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
                          {act.notes}
                        </p>
                      </div>

                      {/* Super Admin Audit Remarks (If Any) */}
                      {act.superAdminRemarks && (
                        <div
                          style={{
                            backgroundColor: isFlagged ? '#FEF2F2' : '#F0FDF4',
                            borderLeft: `3px solid ${isFlagged ? '#DC2626' : '#16A34A'}`,
                            padding: '0.55rem 0.85rem',
                            borderRadius: '0 8px 8px 0',
                            fontSize: '0.8rem',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <span style={{ fontWeight: 800, color: isFlagged ? '#991B1B' : '#166534' }}>
                            Super Admin Audit Note:
                          </span>{' '}
                          <span style={{ color: isFlagged ? '#B91C1C' : '#14532D' }}>
                            {act.superAdminRemarks}
                          </span>
                        </div>
                      )}

                      {/* Super Admin Quick Verification Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '0.6rem',
                          borderTop: '1px dashed var(--border-subtle)',
                          paddingTop: '0.65rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                          Super Admin Oversight Actions:
                        </span>

                        <button
                          type="button"
                          onClick={() => handleQuickVerify(act.id, 'Verified Work')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            backgroundColor: isVerified ? '#15803D' : '#DCFCE7',
                            color: isVerified ? '#FFFFFF' : '#15803D',
                            border: '1px solid #86EFAC',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <Check size={13} />
                          <span>{isVerified ? 'Marked Verified' : 'Mark as Proper Work'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuickVerify(act.id, 'Flagged Discrepancy')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            backgroundColor: isFlagged ? '#B91C1C' : '#FEE2E2',
                            color: isFlagged ? '#FFFFFF' : '#B91C1C',
                            border: '1px solid #FCA5A5',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <AlertTriangle size={13} />
                          <span>{isFlagged ? 'Flagged' : 'Flag Discrepancy'}</span>
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Employee Performance & Accountability Overview */}
        {activeTab === 'employees' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {employees.map((emp) => {
              const empActivities = activities.filter((a) => a.employeeId === emp.id);
              const verifiedEmpCount = empActivities.filter((a) => a.verificationStatus === 'Verified Work').length;
              const lastActivity = empActivities[0];

              return (
                <Card
                  key={emp.id}
                  variant="white"
                  padding="lg"
                  style={{
                    borderRadius: '16px',
                    border: '1.5px solid var(--border-medium)',
                    boxShadow: '0 4px 16px rgba(23,75,53,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Employee Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.15rem' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        backgroundColor: emp.avatarBg,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 900,
                      }}
                    >
                      {emp.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: 0, fontSize: '1.08rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                        {emp.name}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {emp.role}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '4px' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            backgroundColor: emp.status === 'Active & Working' ? '#DCFCE7' : '#FEF3C7',
                            color: emp.status === 'Active & Working' ? '#15803D' : '#B45309',
                            padding: '0.1rem 0.45rem',
                            borderRadius: '4px',
                          }}
                        >
                          {emp.status}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          • {emp.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      padding: '0.85rem',
                      backgroundColor: '#F8FAF9',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '1.15rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Total Client Outreach
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--color-forest-green)' }}>
                        {empActivities.length} Logs
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Verified Work
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#15803D' }}>
                        {verifiedEmpCount} / {empActivities.length}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.15rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <PhoneCall size={14} style={{ color: 'var(--color-forest-green)' }} />
                      <a href={`tel:${emp.phone}`} style={{ color: 'var(--color-forest-green)', fontWeight: 700, textDecoration: 'none' }}>
                        {emp.phone}
                      </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
                      <span>{emp.email}</span>
                    </div>
                  </div>

                  {/* Last Activity Tracked */}
                  <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Last Client Contacted:
                    </div>
                    {lastActivity ? (
                      <div style={{ marginTop: '3px', fontSize: '0.82rem', color: 'var(--color-forest-green)' }}>
                        <strong>{lastActivity.customerName}</strong> ({lastActivity.customerLocation})
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {lastActivity.activityType} • {new Date(lastActivity.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                        No outreach logged yet
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        </Container>
      </div>

      {/* Modal: Review & Add Super Admin Remarks */}
      {remarkModalOpen && activeActivityForRemark && (
        <Modal
          isOpen={remarkModalOpen}
          onClose={() => setRemarkModalOpen(false)}
          maxWidth="600px"
        >
          <div style={{ padding: '0.5rem 0' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
              Super Admin Audit — {activeActivityForRemark.id}
            </h3>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#F8FAF9', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                {activeActivityForRemark.employeeName} contacted {activeActivityForRemark.customerName}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {activeActivityForRemark.activityType} • Phone: {activeActivityForRemark.customerPhone} ({activeActivityForRemark.customerLocation})
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.5rem' }}>
                Verification Decision
              </label>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {(['Verified Work', 'Pending Review', 'Flagged Discrepancy'] as VerificationStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedVerificationChoice(st)}
                    style={{
                      padding: '0.45rem 0.95rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: selectedVerificationChoice === st ? '2px solid var(--color-forest-green)' : '1px solid var(--border-medium)',
                      backgroundColor: selectedVerificationChoice === st ? 'var(--color-soft-green)' : '#FFFFFF',
                      color: selectedVerificationChoice === st ? 'var(--color-forest-green)' : 'var(--text-body)',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <Textarea
                label="Super Admin Remarks / Instructions for Employee"
                name="superAdminRemarksInput"
                rows={3}
                placeholder="e.g. Roof survey photos verified; follow up on Wednesday for subsidy documents..."
                value={remarkInput}
                onChange={(e) => setRemarkInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button variant="outline" size="md" onClick={() => setRemarkModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={handleSaveRemark}>
                Save Audit Review
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Log New Employee Outreach Interaction */}
      {logModalOpen && (
        <Modal
          isOpen={logModalOpen}
          onClose={() => setLogModalOpen(false)}
          maxWidth="640px"
        >
          <form onSubmit={handleCreateActivity} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem 0' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
              Record Employee Outreach Activity
            </h3>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                Employee Who Made Contact
              </label>
              <select
                value={newEmpId}
                onChange={(e) => setNewEmpId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role} ({emp.department})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <Input
                  label="Customer Name"
                  name="customerName"
                  placeholder="e.g. Ramesh Sahu"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Input
                  label="Customer Phone"
                  name="customerPhone"
                  placeholder="e.g. 9438112233"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <Input
                  label="Town / Location in Odisha"
                  name="customerLocation"
                  placeholder="e.g. Junagarh, Kalahandi"
                  value={newCustLocation}
                  onChange={(e) => setNewCustLocation(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                  Activity Type
                </label>
                <select
                  value={newActivityType}
                  onChange={(e) => setNewActivityType(e.target.value as ActivityType)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    border: '1.5px solid var(--border-medium)',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="Phone Call">Phone Call</option>
                  <option value="WhatsApp Outreach">WhatsApp Outreach</option>
                  <option value="Site Assessment Visit">Site Assessment Visit</option>
                  <option value="Quotation Prepared & Sent">Quotation Prepared & Sent</option>
                  <option value="Subsidy Document Verification">Subsidy Document Verification</option>
                  <option value="Net-Meter Synchronization Inspection">Net-Meter Inspection</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                Outcome
              </label>
              <select
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="Interested - Proceeding">Interested - Proceeding</option>
                <option value="Quotation Awaited">Quotation Awaited</option>
                <option value="Site Visit Booked">Site Visit Booked</option>
                <option value="Follow-up Required">Follow-up Required</option>
                <option value="Deal Finalized">Deal Finalized</option>
                <option value="Not Reachable">Not Reachable</option>
              </select>
            </div>

            <div>
              <Textarea
                label="Work & Conversation Details"
                name="workNotes"
                rows={3}
                placeholder="What was discussed with customer? What did employee verify or propose?"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Button variant="outline" size="md" onClick={() => setLogModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Record Activity
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
