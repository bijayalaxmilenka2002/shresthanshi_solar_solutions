import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { getAllLeads } from '@models/services/enquiryService';
import { companyConfig } from '@models/data/company';

interface TrackProgressInfo {
  stepIndex: number;
  totalSteps: number;
  stepTitle: string;
  statusLabel: string;
  description: string;
  nextAction: string;
}

interface TrackResultItem {
  id: string;
  maskedName: string;
  category: string;
  location: string;
  submittedAt: string;
  status: string;
  progress: TrackProgressInfo;
  supportPhone: string;
  supportPhoneDisplay: string;
}

interface TrackEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const STEPS = [
  'Enquiry Received',
  'Consultation',
  'Site Assessment',
  'Quotation & Subsidy',
  'Installation',
];

export const TrackEnquiryModal: React.FC<TrackEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<TrackResultItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) {
      setErrorMessage('Please enter your 10-digit mobile number or Reference ID.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setHasSearched(true);

    try {
      const res = await fetch(`/api/track?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.found && Array.isArray(data.results)) {
          setResults(data.results);
          setIsLoading(false);
          return;
        }
      }

      // Offline / Local Storage fallback
      const localLeads = getAllLeads();
      const cleanDigits = q.replace(/\D/g, '');
      const isPhone = cleanDigits.length >= 10;
      const tenDigits = cleanDigits.slice(-10);

      const matches = localLeads.filter((l) => {
        if (isPhone) {
          return l.phone.replace(/\D/g, '').includes(tenDigits);
        }
        return l.id.toLowerCase() === q.toLowerCase();
      });

      if (matches.length > 0) {
        const fallbackResults: TrackResultItem[] = matches.map((m) => {
          let stepIndex = 1;
          if (m.status === 'Contacted') stepIndex = 2;
          else if (m.status === 'Site Visit Scheduled') stepIndex = 3;
          else if (m.status === 'Quotation Sent') stepIndex = 4;
          else if (m.status === 'Converted') stepIndex = 5;

          return {
            id: m.id,
            maskedName: m.name ? `${m.name.slice(0, 2)}***` : 'Customer',
            category: m.category,
            location: m.location,
            submittedAt: m.submittedAt,
            status: m.status,
            progress: {
              stepIndex,
              totalSteps: 5,
              stepTitle: STEPS[stepIndex - 1],
              statusLabel: m.status,
              description: 'Your solar inquiry is registered in our engineering pipeline.',
              nextAction: 'Our team in Kalahandi / Bhubaneswar will assist with your requirements.',
            },
            supportPhone: '9937000624',
            supportPhoneDisplay: '+91 99370-00624',
          };
        });
        setResults(fallbackResults);
      } else {
        setResults([]);
      }
    } catch {
      setErrorMessage('Unable to connect to live tracking. Please verify your connection or call us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} titleId="track-modal-title">
      <div style={{ padding: '0.25rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-soft-green)',
              color: 'var(--color-forest-green)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <Clock size={24} />
          </div>
          <h2
            id="track-modal-title"
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--color-forest-green)',
              margin: '0 0 0.35rem',
            }}
          >
            Track Solar Application Status
          </h2>
          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-body)',
              maxWidth: '460px',
              margin: '0 auto',
              lineHeight: 1.5,
            }}
          >
            Enter your 10-digit mobile number or application Reference ID (e.g., <strong>QT-849201</strong>) to view live progress from our technical engineering team.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Mobile Number (e.g. 9438012345) or Ref ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 2.5rem 0 2.5rem',
                  borderRadius: '10px',
                  border: '1.5px solid var(--border-medium)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title="Clear input"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading || !query.trim()}
              style={{ flexShrink: 0, height: '46px' }}
            >
              {isLoading ? 'Checking Live Database...' : 'Check Status'}
            </Button>
          </div>

          {errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#DC2626',
                fontSize: '0.82rem',
                marginTop: '0.5rem',
              }}
            >
              <AlertCircle size={15} />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        {/* Results View */}
        {hasSearched && !isLoading && (
          <div>
            {results.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#F9FAFB',
                  border: '1.5px dashed var(--border-medium)',
                  borderRadius: '12px',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                }}
              >
                <AlertCircle size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem' }} />
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', color: 'var(--color-forest-green)' }}>
                  No Active Application Found
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  We couldn't find an application matching "<strong>{query}</strong>". Please make sure you entered the correct 10-digit phone number or Reference ID.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/919937000624?text=${encodeURIComponent(
                      `Hello Shresthanshi Solar Solutions! I submitted an enquiry for solar installation, but I need assistance tracking my status. My contact number is: ${query}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {results.map((item) => {
                  const stepIndex = item.progress.stepIndex;
                  const whatsappMsg = encodeURIComponent(
                    `Hello Shresthanshi Solar Solutions! I am checking my solar enquiry (Ref: ${item.id}) for ${item.category} in ${item.location}. Current status: ${item.status}. Please share an update.`
                  );

                  return (
                    <div
                      key={item.id}
                      style={{
                        borderRadius: '14px',
                        border: '1.5px solid var(--border-medium)',
                        backgroundColor: '#FFFFFF',
                        padding: '1.25rem',
                        boxShadow: '0 2px 10px rgba(23, 75, 53, 0.05)',
                      }}
                    >
                      {/* Top Bar: Reference ID & Status Badge */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginBottom: '0.85rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 800,
                              fontSize: '1rem',
                              color: 'var(--color-forest-green)',
                              backgroundColor: 'var(--color-soft-green)',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '6px',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {item.id}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyId(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: copiedId === item.id ? '#16A34A' : 'var(--text-muted)',
                              padding: '4px',
                            }}
                            title="Copy Reference ID"
                          >
                            {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>

                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '999px',
                            backgroundColor:
                              stepIndex >= 5
                                ? '#DCFCE7'
                                : stepIndex >= 3
                                ? '#FEF3C7'
                                : 'var(--color-soft-green)',
                            color:
                              stepIndex >= 5
                                ? '#166534'
                                : stepIndex >= 3
                                ? '#92400E'
                                : 'var(--color-forest-green)',
                            border: '1px solid currentColor',
                          }}
                        >
                          {item.progress.statusLabel}
                        </span>
                      </div>

                      {/* Project Details */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.1rem', color: '#174B35', fontWeight: 800 }}>
                          {item.category}
                        </h4>
                        <div
                          style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            fontSize: '0.84rem',
                            color: 'var(--text-body)',
                          }}
                        >
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} color="var(--color-forest-green)" />
                            {item.location}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={14} color="var(--text-muted)" />
                            Submitted: {new Date(item.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* 5-Step Visual Progress Bar */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                            marginBottom: '0.65rem',
                          }}
                        >
                          {/* Background Track Line */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              right: '12px',
                              height: '3px',
                              backgroundColor: 'var(--border-medium)',
                              zIndex: 1,
                            }}
                          />
                          {/* Active Filled Line */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              width: `${((stepIndex - 1) / (STEPS.length - 1)) * 100}%`,
                              height: '3px',
                              backgroundColor: 'var(--color-forest-green)',
                              zIndex: 1,
                              transition: 'width 0.4s ease',
                            }}
                          />

                          {STEPS.map((step, idx) => {
                            const isCompleted = idx + 1 <= stepIndex;
                            const isCurrent = idx + 1 === stepIndex;

                            return (
                              <div
                                key={step}
                                style={{
                                  position: 'relative',
                                  zIndex: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                }}
                              >
                                <div
                                  style={{
                                    width: '26px',
                                    height: '26px',
                                    borderRadius: '50%',
                                    backgroundColor: isCompleted ? 'var(--color-forest-green)' : '#FFFFFF',
                                    color: isCompleted ? '#FFFFFF' : 'var(--text-muted)',
                                    border: `2px solid ${isCompleted ? 'var(--color-forest-green)' : 'var(--border-medium)'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    boxShadow: isCurrent ? '0 0 0 3px rgba(23, 75, 53, 0.2)' : 'none',
                                    transition: 'all 0.2s ease',
                                  }}
                                >
                                  {isCompleted ? <Check size={14} /> : idx + 1}
                                </div>
                                <span
                                  style={{
                                    fontSize: '0.68rem',
                                    fontWeight: isCurrent ? 800 : 500,
                                    color: isCurrent ? 'var(--color-forest-green)' : 'var(--text-muted)',
                                    marginTop: '0.35rem',
                                    maxWidth: '65px',
                                    lineHeight: 1.2,
                                    display: 'none', // Shown on wider views
                                  }}
                                  className="track-step-label"
                                >
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Current Phase Card */}
                        <div
                          style={{
                            backgroundColor: 'var(--color-soft-green)',
                            borderRadius: '10px',
                            padding: '0.85rem 1rem',
                            border: '1px solid var(--border-medium)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                            <CheckCircle2 size={16} color="var(--color-forest-green)" />
                            <strong style={{ fontSize: '0.88rem', color: 'var(--color-forest-green)' }}>
                              Current Stage: {item.progress.stepTitle}
                            </strong>
                          </div>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: '0 0 0.35rem', lineHeight: 1.45 }}>
                            {item.progress.description}
                          </p>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-body)', fontWeight: 600 }}>
                            <span style={{ color: 'var(--color-forest-green)' }}>Next Step: </span>
                            {item.progress.nextAction}
                          </div>
                        </div>
                      </div>

                      {/* Direct Fast-Action Buttons */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.75rem',
                          flexWrap: 'wrap',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '0.85rem',
                        }}
                      >
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Need faster assistance? Connect with engineering desk:
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <a
                            href={`tel:${item.supportPhone}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.45rem 0.75rem',
                              borderRadius: '6px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid var(--border-medium)',
                              color: 'var(--color-forest-green)',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            <Phone size={13} />
                            <span>Call {item.supportPhoneDisplay}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${item.supportPhone}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.45rem 0.85rem',
                              borderRadius: '6px',
                              backgroundColor: '#25D366',
                              color: '#FFFFFF',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp Us</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer info & Trust badge */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} color="var(--color-forest-green)" />
            <span>Authorized PM Surya Ghar &amp; Agricultural Solar Solutions Provider</span>
          </div>
          <span>Kalahandi Head Office • Bhubaneswar Sub-Branch</span>
        </div>
      </div>
    </Modal>
  );
};
