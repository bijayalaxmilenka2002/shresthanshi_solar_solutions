import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Clock,
  MessageSquare,
  MessageCircle,
  Building2,
  UserCheck,
  Zap,
  Award,
  ArrowRight,
  ExternalLink,
  Shield,
  Check,
} from 'lucide-react';
import { Container } from '@views/components/ui/Container';
import { Card } from '@views/components/ui/Card';
import { Input, Textarea } from '@views/components/ui/Input';
import { Button } from '@views/components/ui/Button';
import { ImagePlaceholder } from '@views/components/ui/ImagePlaceholder';
import { Breadcrumbs } from '@views/components/common/Breadcrumbs';
import { SEO } from '@views/components/common/SEO';
import { companyConfig } from '@models/data/company';
import { submitContactEnquiry } from '@models/services/enquiryService';
import { useSolarGuideModal } from '@controllers/hooks/useSolarGuideModal';
import { useSiteSettings, useTrackModal } from '@/app/providers';

interface ContactErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { openGuideModal } = useSolarGuideModal();
  const { openTrackModal } = useTrackModal();
  const { settings } = useSiteSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [customerType, setCustomerType] = useState('Homeowner');
  const [solutionInterest, setSolutionInterest] = useState('Residential Rooftop Solar');
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    'Phone Call' | 'WhatsApp' | 'Email'
  >('Phone Call');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    const solutionParam = searchParams.get('solution');
    const audienceParam = searchParams.get('audience');
    const intentParam = searchParams.get('intent');

    if (solutionParam === 'commercial-solar') {
      setCustomerType('Business / Commercial Enterprise');
      setSolutionInterest('Commercial & Institutional Solar');
    } else if (solutionParam === 'solar-water-pumps') {
      setCustomerType('Farmer / Agricultural Landowner');
      setSolutionInterest('Solar Water Pumps & Dual-Mode Panels');
    } else if (solutionParam === 'solar-maintenance-support') {
      setSolutionInterest('Solar Maintenance & Health Audits');
    }

    if (intentParam === 'street-lights') {
      setCustomerType('Gram Panchayat / Block Administration');
      setSolutionInterest('Solar Street Lighting Systems');
    } else if (intentParam === 'sensor-pumps') {
      setCustomerType('Gram Panchayat / Block Administration');
      setSolutionInterest('Solar Overhead Sensor Pumps & Filters');
    } else if (intentParam === 'borewell') {
      setCustomerType('Farmer / Agricultural Landowner');
      setSolutionInterest('Borewells & Tubewell Drilling');
    } else if (intentParam === 'fabrication') {
      setCustomerType('Business / Commercial Enterprise');
      setSolutionInterest('Metal & Furniture Fabrication');
    } else if (intentParam === 'pipeline') {
      setCustomerType('Government / PSU Agency');
      setSolutionInterest('Rural Drinking Water Pipeline Distribution');
    } else if (intentParam === 'wall-painting' || intentParam === 'printing') {
      setCustomerType('Government / PSU Agency');
      setSolutionInterest('Swachh Bharat Wall Painting & Printing');
    }

    if (audienceParam === 'farmers') {
      setCustomerType('Farmer / Agricultural Landowner');
      setSolutionInterest('Solar Water Pumps & Dual-Mode Panels');
    } else if (audienceParam === 'businesses-institutions') {
      setCustomerType('Business / Commercial Enterprise');
      setSolutionInterest('Commercial & Institutional Solar');
    }

    if (intentParam === 'subsidy') {
      setMessage('I would like guidance on solar installation costs and applicable government scheme eligibility.');
    }
  }, [searchParams]);

  const validate = (): boolean => {
    const nextErrors: ContactErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!location.trim() || location.trim().length < 2) {
      nextErrors.location = 'Please enter your town, block, or district in Odisha.';
    }

    if (!message.trim() || message.trim().length < 8) {
      nextErrors.message = 'Please share a few details about your energy or water-pumping requirement.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validate()) {
      setSubmitStatus('error');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitContactEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        customerType,
        solutionInterest,
        preferredContactMethod,
        message: message.trim(),
      });

      if (res.success) {
        setReferenceId(res.referenceId);
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setMessage('');
    setErrors({});
    setSubmitStatus('idle');
  };

  return (
    <div>
      <SEO
        title="Contact Us & Request Solar Site Assessment — Kalahandi (Head Office) & Bhubaneswar Sub-Branch"
        description="Connect with our team at our Kalahandi Head Office (+91 99370 00624) or our Bhubaneswar sub-branch (+91 9438-080-874). Request an honest rooftop or farm borewell solar site assessment across Odisha."
        canonicalPath="/contact"
      />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <section className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              No-Obligation Solar Consultation
            </span>
            <h1 className="page-hero__title">Start Your Solar Conversation With Us.</h1>
            <p className="page-hero__subtitle">
              Whether you are exploring rooftop solar for your home, daytime solar for a commercial property, or a solar water pump for agricultural irrigation in Odisha, reach out to our team at our Kalahandi Head Office or our Bhubaneswar sub-branch for clear, honest guidance.
            </p>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: solar consultation & site evaluation]"
              sublabel="Technical Solar Consultation • Kalahandi (Head Office) & Bhubaneswar Sub-Branch"
              aspectRatio="1/1"
              variant="white"
              src="/images/solar-consultation-rooftop.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      <section className="section bg-white" style={{ paddingTop: '2.5rem', paddingBottom: '4.5rem' }}>
        <Container className="container--wide">
          <div className="contact-layout">
            {/* Left Column: Verified Business Contact Details */}
            <div className="contact-layout__info">
              <Card
                variant="soft-green"
                padding="lg"
                style={{
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--color-soft-green)',
                  boxShadow: '0 4px 20px rgba(23, 75, 53, 0.05)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                }}
              >
                <div>
                  {/* Header Tag & Title */}
                  <div style={{ marginBottom: '1.15rem' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        backgroundColor: '#FFFFFF',
                        color: 'var(--color-forest-green)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '999px',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        border: '1px solid var(--border-medium)',
                        marginBottom: '0.65rem',
                        boxShadow: '0 1px 4px rgba(23, 75, 53, 0.06)',
                      }}
                    >
                      <Building2 size={14} style={{ color: 'var(--color-forest-green)' }} />
                      <span>Kalahandi (HQ) • Bhubaneswar Sub-Branch</span>
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.55rem)',
                        fontWeight: 800,
                        color: 'var(--color-forest-green)',
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      M/s Shreshtanshi Construction &amp; Suppliers
                    </h2>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-forest-green)', marginTop: '0.2rem' }}>
                      (Shresthanshi Solar Solutions)
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        marginTop: '0.5rem',
                        fontSize: '0.82rem',
                        color: 'var(--text-body)',
                      }}
                    >
                      <UserCheck size={15} style={{ color: 'var(--color-forest-green)', flexShrink: 0 }} />
                      <span>Proprietor: <strong>{settings?.contact?.proprietor || companyConfig.proprietor}</strong></span>
                    </div>

                    <div
                      style={{
                        marginTop: '0.75rem',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        backgroundColor: '#DCFCE7',
                        border: '1px solid #86EFAC',
                        color: '#15803D',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                      <span>Live Engineering Desk: Fast Telephone &amp; WhatsApp Responses</span>
                    </div>
                  </div>

                  {/* Modular Contact Cards List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {/* 1. Direct Call & WhatsApp Hub */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '14px',
                        border: '1px solid var(--border-medium)',
                        padding: '1rem 1.15rem',
                        display: 'flex',
                        gap: '0.85rem',
                        alignItems: 'flex-start',
                        boxShadow: '0 2px 6px rgba(23, 75, 53, 0.03)',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--color-soft-green)',
                          color: 'var(--color-forest-green)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <Phone size={20} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                          Calling Lines &amp; Direct WhatsApp
                        </div>

                        {/* Primary Contact */}
                        <div style={{ marginBottom: '0.65rem', paddingBottom: '0.55rem', borderBottom: '1px dashed var(--border-subtle)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.04em', backgroundColor: '#DCFCE7', padding: '0.08rem 0.4rem', borderRadius: '4px' }}>
                              Primary Hotline (HQ)
                            </span>
                          </div>
                          <a
                            href={companyConfig.contact.primaryPhoneHref}
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              color: 'var(--color-forest-green)',
                              textDecoration: 'none',
                              display: 'inline-block',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {companyConfig.contact.primaryPhoneDisplay}
                          </a>
                        </div>

                        {/* Secondary Contact */}
                        <div style={{ marginBottom: '0.75rem' }}>
                          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.15rem' }}>
                            Secondary Helpline (Sub-Branch)
                          </div>
                          <a
                            href={companyConfig.contact.secondaryPhoneHref}
                            style={{
                              fontSize: '1rem',
                              fontWeight: 700,
                              color: 'var(--text-body)',
                              textDecoration: 'none',
                              display: 'inline-block',
                            }}
                          >
                            {companyConfig.contact.secondaryPhoneDisplay}
                          </a>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <a
                            href={companyConfig.contact.primaryPhoneHref}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              backgroundColor: 'var(--color-forest-green)',
                              color: '#FFFFFF',
                              padding: '0.42rem 0.85rem',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(23, 75, 53, 0.2)',
                            }}
                          >
                            <Phone size={13} />
                            <span>Call Primary</span>
                          </a>

                          <a
                            href={companyConfig.contact.secondaryPhoneHref}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#FFFFFF',
                              color: 'var(--color-forest-green)',
                              border: '1.5px solid var(--border-medium)',
                              padding: '0.4rem 0.75rem',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            <Phone size={13} />
                            <span>Call Secondary</span>
                          </a>

                          <a
                            href={`https://wa.me/91${companyConfig.contact.primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent('Hello Shresthanshi Solar Solutions, I would like to inquire about solar installation.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#25D366',
                              color: '#FFFFFF',
                              padding: '0.42rem 0.85rem',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* 2. Registered Office Addresses */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '14px',
                        border: '1px solid var(--border-medium)',
                        padding: '0.9rem 1.15rem',
                        display: 'flex',
                        gap: '0.85rem',
                        alignItems: 'flex-start',
                        boxShadow: '0 2px 6px rgba(23, 75, 53, 0.03)',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--color-soft-green)',
                          color: 'var(--color-forest-green)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <MapPin size={20} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                          Operational Bases &amp; Offices
                        </div>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--color-forest-green)', fontWeight: 600, lineHeight: 1.45 }}>
                          {settings?.contact?.address || companyConfig.contact.address.full}
                        </p>
                      </div>
                    </div>

                    {/* 3. Official Email & Consultation Hours */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '0.65rem',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid var(--border-medium)',
                          padding: '0.8rem 1rem',
                        }}
                      >
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                          Official Email
                        </div>
                        <a
                          href={`mailto:${settings?.contact?.email || companyConfig.contact.email}`}
                          style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-forest-green)', textDecoration: 'none', wordBreak: 'break-all' }}
                        >
                          {settings?.contact?.email || companyConfig.contact.email}
                        </a>
                      </div>

                      <div
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid var(--border-medium)',
                          padding: '0.8rem 1rem',
                        }}
                      >
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                          Consultation Hours
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#15803D' }}>
                          24/7 Field &amp; Technical Support
                        </div>
                      </div>
                    </div>

                    {/* 4. GSTIN & Registration */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid var(--border-medium)',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                          Government GSTIN Registration
                        </div>
                        <code style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                          {companyConfig.gstin}
                        </code>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        <CheckCircle2 size={13} />
                        <span>Registered Enterprise</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Free Solar Guide Download Strip */}
                <div
                  style={{
                    padding: '0.9rem 1.15rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1.5px dashed var(--color-forest-30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.85rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-soft-green)',
                        color: 'var(--color-forest-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                        Prefer to Read Our Solar Guide?
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Free pre-investment guide summary with sizing checklist.
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openGuideModal('Requested from Contact Us page')}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Get Free PDF
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column: Interactive Solar Enquiry & Assessment Form */}
            <div className="contact-layout__form">
              <Card
                variant="white"
                padding="lg"
                className="contact-form-card"
                style={{
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-medium)',
                  boxShadow: '0 4px 20px rgba(23, 75, 53, 0.05)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.45rem' }}>
                      <span className="badge">
                        <MessageSquare size={14} /> Solar Assessment &amp; Sizing Intake
                      </span>
                      <button
                        type="button"
                        onClick={() => openTrackModal()}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-forest-green)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: 'var(--color-soft-green)',
                        }}
                      >
                        <Clock size={13} />
                        <span>Already submitted? Track status live</span>
                      </button>
                    </div>
                    <h2 style={{ margin: 0, fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', color: 'var(--color-forest-green)' }}>
                      Tell Us About Your Solar Requirement
                    </h2>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                      Fill in your property and power details below. Sizing calculations and subsidy estimates are handled by our technical engineers.
                    </p>
                  </div>

                  {submitStatus === 'success' ? (
                    <div className="contact-form-success" role="status" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                      <div className="guide-modal__success-icon">
                        <CheckCircle2 size={42} />
                      </div>
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--color-forest-green)', fontWeight: 800 }}>
                        Thank You! Your Solar Enquiry Has Been Received.
                      </h3>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: 'var(--color-soft-green)',
                          color: 'var(--color-forest-green)',
                          padding: '0.4rem 0.85rem',
                          borderRadius: '8px',
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          fontSize: '1.05rem',
                          margin: '0.5rem 0 1rem',
                        }}
                      >
                        <span>Reference ID: {referenceId}</span>
                      </div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 1rem' }}>
                        We have logged your enquiry for <strong>{solutionInterest}</strong> ({customerType}) securely in our engineering database. Our team (Kalahandi Head Office &amp; Bhubaneswar Sub-Branch) will reach out to <strong>{name}</strong> via <strong>{preferredContactMethod}</strong> ({preferredContactMethod === 'Email' ? email : phone}).
                      </p>
                      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                          type="button"
                          variant="primary"
                          size="md"
                          iconLeft={<Clock size={16} />}
                          onClick={() => openTrackModal(referenceId)}
                        >
                          Track Status Live
                        </Button>
                        <a
                          href={`https://wa.me/91${companyConfig.contact.primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hello Shresthanshi Solar Solutions! I have submitted an assessment enquiry (Ref: ${referenceId}) for ${solutionInterest}. Name: ${name}, Phone: ${phone}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            textDecoration: 'none',
                          }}
                        >
                          <MessageCircle size={17} />
                          <span>Chat on WhatsApp</span>
                        </a>
                        <Button variant="outline" size="md" onClick={handleReset}>
                          Submit Another Enquiry
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-form" noValidate>
                      {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                        <div className="guide-modal__alert" role="alert" style={{ marginBottom: '1rem' }}>
                          <AlertCircle size={18} />
                          <span>Please complete the required fields highlighted below before submitting.</span>
                        </div>
                      )}

                      <div className="grid-2">
                        <Input
                          label="Full Name"
                          name="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          error={errors.name}
                          required
                        />
                        <Input
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          error={errors.phone}
                          required
                        />
                      </div>

                      <div className="grid-2">
                        <Input
                          label="Email ID"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          error={errors.email}
                          required
                        />
                        <Input
                          label="Town / Block & District"
                          name="location"
                          placeholder="e.g., Bhawanipatna / Bhubaneswar"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          error={errors.location}
                          required
                        />
                      </div>

                      <div className="grid-2">
                        <div className="ui-field">
                          <label htmlFor="customer-type-select" className="ui-field__label">
                            I Am Enquiring As A
                          </label>
                          <select
                            id="customer-type-select"
                            className="ui-field__input"
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                          >
                            <option value="Homeowner">Homeowner</option>
                            <option value="Farmer / Agricultural Landowner">Farmer / Agricultural Landowner</option>
                            <option value="Business / Commercial Enterprise">Business / Commercial Enterprise</option>
                            <option value="Gram Panchayat / Block Administration">Gram Panchayat / Block Administration</option>
                            <option value="Government / PSU Agency">Government / PSU Agency</option>
                            <option value="Institutional Campus / School">Institutional Campus / School</option>
                          </select>
                        </div>

                        <div className="ui-field">
                          <label htmlFor="solution-interest-select" className="ui-field__label">
                            Service / Solution of Interest
                          </label>
                          <select
                            id="solution-interest-select"
                            className="ui-field__input"
                            value={solutionInterest}
                            onChange={(e) => setSolutionInterest(e.target.value)}
                          >
                            <option value="Residential Rooftop Solar">Residential Rooftop Solar</option>
                            <option value="Commercial & Institutional Solar">Commercial &amp; Institutional Solar</option>
                            <option value="Solar Water Pumps & Dual-Mode Panels">Solar Water Pumps &amp; Dual-Mode Panels</option>
                            <option value="Solar Overhead Sensor Pumps & Filters">Solar Overhead Sensor Pumps &amp; Filters</option>
                            <option value="Solar Street Lighting Systems">Solar Street Lighting Systems</option>
                            <option value="Solar Maintenance & Health Audits">Solar Maintenance &amp; Health Audits</option>
                            <option value="General Project Feasibility & Quotation">General Project Feasibility &amp; Quotation</option>
                          </select>
                        </div>
                      </div>

                      {/* Preferred Contact Method */}
                      <div className="ui-field">
                        <span className="ui-field__label">Preferred Contact Method</span>
                        <div className="contact-method-pills" role="radiogroup" aria-label="Preferred Contact Method">
                          {(['Phone Call', 'WhatsApp', 'Email'] as const).map((method) => (
                            <label
                              key={method}
                              className={`contact-method-pill ${
                                preferredContactMethod === method ? 'contact-method-pill--active' : ''
                              }`}
                            >
                              <input
                                type="radio"
                                name="preferredContactMethod"
                                value={method}
                                checked={preferredContactMethod === method}
                                onChange={() => setPreferredContactMethod(method)}
                                className="sr-only"
                              />
                              <span>{method}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Textarea
                        label="Your Requirement / Message"
                        name="message"
                        rows={3}
                        placeholder="Share your approximate monthly electricity bill, roof type, or borewell water requirement..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        error={errors.message}
                        required
                      />

                      <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting to Engineering Database...' : 'Submit Solar Enquiry'}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Bottom Trust & Peace-of-Mind Strip */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.75rem',
                    fontSize: '0.76rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={16} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                    <span>MongoDB Atlas Database Verified</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                    <span>Average Reply: &lt; 2 Hours</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={16} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                    <span>100% Free Site Assessment</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* =========================================================================
              LOWER REGIONAL HUBS & DISTRICT COVERAGE GRID (Fills empty screen space)
              ========================================================================= */}
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2rem' }}>
              <span className="badge" style={{ marginBottom: '0.5rem' }}>
                <Building2 size={14} /> Dual-Office Presence &amp; Statewide Reach
              </span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--color-forest-green)', margin: '0 0 0.5rem' }}>
                Engineering Teams Based Locally in Kalahandi &amp; Bhubaneswar
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                Whether you need a residential rooftop site survey in Bhubaneswar, an agricultural borewell solar pump in Kalahandi, or an institutional microgrid anywhere in Odisha, our field engineers travel directly to your property.
              </p>
            </div>

            {/* 3 Regional Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {/* Card 1: Kalahandi Head Office */}
              <Card
                variant="white"
                padding="lg"
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  boxShadow: '0 2px 12px rgba(23, 75, 53, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-soft-green)',
                      color: 'var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#174B35', fontWeight: 800 }}>
                      Kalahandi Head Office (HQ)
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 700 }}>
                      Registered Departmental HQ &amp; Warehouse
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  <strong>Address:</strong> Plot No- 406, Khata No- 225/51, Sargiguda, Narla Road, Kalahandi, Odisha – 766110.<br />
                  Central equipment inventory, high-discharge agricultural solar pump testing, and field technician dispatch.
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <a
                    href="tel:+919937000624"
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest-green)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Phone size={14} />
                    <span>+91 99370 00624</span>
                  </a>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Western Odisha Coverage</span>
                </div>
              </Card>

              {/* Card 2: Bhubaneswar Sub-Branch */}
              <Card
                variant="white"
                padding="lg"
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  boxShadow: '0 2px 12px rgba(23, 75, 53, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-soft-green)',
                      color: 'var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#174B35', fontWeight: 800 }}>
                      Bhubaneswar Sub-Branch
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#0369A1', fontWeight: 700 }}>
                      Coastal &amp; Capital Region Coordination
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  <strong>Address:</strong> Sub-Branch Office: Bhubaneswar, Odisha.<br />
                  Handles urban PM Surya Ghar residential rooftop designs, TPCODL net-metering synchronization, and corporate solar plant planning.
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <a
                    href="tel:+919438080874"
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest-green)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Phone size={14} />
                    <span>+91 9438-080-874</span>
                  </a>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Coastal Odisha Hub</span>
                </div>
              </Card>

              {/* Card 3: 30-District Turnkey Engineering Guarantee */}
              <Card
                variant="white"
                padding="lg"
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  boxShadow: '0 2px 12px rgba(23, 75, 53, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--color-soft-green)',
                      color: 'var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#174B35', fontWeight: 800 }}>
                      All-Odisha Service Network
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#7C3AED', fontWeight: 700 }}>
                      Turnkey Site Visit Guarantee
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  <strong>Subsidy Filing:</strong> Full end-to-end PM Surya Ghar portal submission (up to ₹78,000 subsidy assistance) and DISCOM bi-directional net-meter approval included with every installation.
                </p>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => openTrackModal()}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-forest-green)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <Clock size={14} />
                    <span>Track Your Application</span>
                    <ArrowRight size={13} />
                  </button>
                  <span style={{ fontSize: '0.74rem', color: '#15803D', fontWeight: 700 }}>30 Districts Covered</span>
                </div>
              </Card>
            </div>

            {/* District Badges Bar */}
            <div
              style={{
                backgroundColor: 'var(--color-soft-green)',
                borderRadius: '14px',
                border: '1.5px solid var(--border-medium)',
                padding: '1.25rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                Active Installation &amp; Service Engineering Footprint
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.45rem' }}>
                {[
                  'Kalahandi',
                  'Bhawanipatna',
                  'Junagarh',
                  'Dharmagarh',
                  'Narla',
                  'Kesinga',
                  'Khordha',
                  'Bhubaneswar',
                  'Balangir',
                  'Sambalpur',
                  'Bargarh',
                  'Nuapada',
                  'Koraput',
                  'Rayagada',
                  'Nabarangpur',
                  'Cuttack',
                  'Puri',
                  'Ganjam',
                  'All 30 Odisha Districts',
                ].map((district) => (
                  <span
                    key={district}
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-forest-green)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      boxShadow: '0 1px 3px rgba(23, 75, 53, 0.04)',
                    }}
                  >
                    📍 {district}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};


