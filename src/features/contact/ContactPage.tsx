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
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SEO } from '../../components/common/SEO';
import { companyConfig } from '../../data/company';
import { submitContactEnquiry } from '../../services/enquiryService';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { useSiteSettings } from '../../app/providers';

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
        title="Contact Us & Request Solar Site Assessment — Kalahandi, Odisha"
        description="Connect with our Kalahandi office (+91 9438-080-874). Request an honest rooftop or farm borewell solar site assessment across Odisha."
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
              Whether you are exploring rooftop solar for your home, daytime solar for a commercial property, or a solar water pump for agricultural irrigation in Odisha, reach out to our team in Kalahandi for clear, honest guidance.
            </p>
          </div>
          <div className="page-hero__visual">
            <ImagePlaceholder
              label="[Image: solar consultation & site evaluation]"
              sublabel="Technical Solar Consultation • Kalahandi, Odisha"
              aspectRatio="1/1"
              variant="white"
              src="/images/solar-consultation-rooftop.jpg"
              imgFit="cover"
            />
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="contact-layout">
            {/* Left Column: Verified Business Contact Details */}
            <div className="contact-layout__info" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Card
                variant="soft-green"
                padding="lg"
                style={{
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-medium)',
                  backgroundColor: 'var(--color-soft-green)',
                  boxShadow: '0 4px 20px rgba(23, 75, 53, 0.05)',
                }}
              >
                {/* Header Tag & Title */}
                <div style={{ marginBottom: '1.35rem' }}>
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
                      marginBottom: '0.75rem',
                      boxShadow: '0 1px 4px rgba(23, 75, 53, 0.06)',
                    }}
                  >
                    <Building2 size={14} style={{ color: 'var(--color-forest-green)' }} />
                    <span>Verified Head Office &amp; Operations</span>
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
                      marginTop: '0.65rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-body)',
                    }}
                  >
                    <UserCheck size={15} style={{ color: 'var(--color-forest-green)', flexShrink: 0 }} />
                    <span>Proprietor: <strong>{settings?.contact?.proprietor || companyConfig.proprietor}</strong></span>
                  </div>
                </div>

                {/* Modular Contact Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* 1. Registered Office Address */}
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
                      <MapPin size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Registered Office Address
                      </div>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-forest-green)', fontWeight: 600, lineHeight: 1.5 }}>
                        {settings?.contact?.address || companyConfig.contact.address.full}
                      </p>
                    </div>
                  </div>

                  {/* 2. Direct Call & WhatsApp */}
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
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Calling Line &amp; Direct WhatsApp
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                        {settings?.contact?.phoneDisplay || companyConfig.contact.phoneDisplay}
                      </div>

                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <a
                          href={settings?.contact?.phoneHref || companyConfig.contact.phoneHref}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            backgroundColor: 'var(--color-forest-green)',
                            color: '#FFFFFF',
                            padding: '0.45rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(23, 75, 53, 0.2)',
                            transition: 'opacity 150ms ease',
                          }}
                        >
                          <Phone size={14} />
                          <span>Call Now</span>
                        </a>

                        <a
                          href={`https://wa.me/91${(settings?.contact?.whatsappNumber || '9438080874').replace(/\D/g, '')}?text=${encodeURIComponent('Hello Shresthanshi Solar Solutions, I would like to inquire about solar installation.')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            padding: '0.45rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                            transition: 'opacity 150ms ease',
                          }}
                        >
                          <MessageCircle size={15} />
                          <span>WhatsApp Us</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 3. Email Inquiries */}
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
                      <Mail size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Official Email Inquiries
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.65rem', overflowWrap: 'break-word' }}>
                        {settings?.contact?.email || companyConfig.contact.email}
                      </div>

                      <a
                        href={`mailto:${settings?.contact?.email || companyConfig.contact.email}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--color-forest-green)',
                          border: '1.5px solid var(--border-medium)',
                          padding: '0.42rem 0.95rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          transition: 'all 150ms ease',
                        }}
                      >
                        <Mail size={14} />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>

                  {/* 4. Consultation & Response Hours */}
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
                      <Clock size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
                          Consultation &amp; Working Hours
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#15803D',
                            backgroundColor: '#DCFCE7',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                          Active Response Line
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-forest-green)', fontWeight: 600, lineHeight: 1.5 }}>
                        {settings?.contact?.workingHours || companyConfig.contact.workingHours}
                      </p>
                    </div>
                  </div>

                  {/* 5. GSTIN & Official Registration */}
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
                      <ShieldCheck size={20} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        GSTIN &amp; Government Registration
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <code style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-forest-green)', backgroundColor: 'var(--color-soft-green)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                          {companyConfig.gstin}
                        </code>
                        <span style={{ fontSize: '0.74rem', color: '#15803D', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle2 size={13} />
                          <span>Registered Enterprise in Odisha</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integrated Guide Download Strip at Bottom of Card */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '1rem 1.25rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1.5px dashed var(--color-forest-30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--color-soft-green)',
                        color: 'var(--color-forest-green)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                        Prefer to Read Our Solar Guide First?
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Free pre-investment guide summary with checklist &amp; PM Surya Ghar details.
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openGuideModal('Requested from Contact Us page')}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Get Free Guide (PDF)
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column: Interactive Solar Enquiry & Assessment Form */}
            <div className="contact-layout__form">
              <Card variant="white" padding="lg" className="contact-form-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="badge" style={{ marginBottom: '0.5rem' }}>
                    <MessageSquare size={14} /> Solar Assessment &amp; Enquiry Form
                  </span>
                  <h2>Tell Us About Your Solar Requirement</h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Fill in your details below and select your preferred contact method. Our team will respond with clear, site-specific guidance.
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <div className="contact-form-success" role="status">
                    <div className="guide-modal__success-icon">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3>Thank You! Your Solar Enquiry Has Been Received.</h3>
                    <p>
                      We have logged your enquiry under Reference ID <strong>{referenceId}</strong> for{' '}
                      <strong>{solutionInterest}</strong> ({customerType}).
                    </p>
                    <p>
                      Our team in Kalahandi will reach out to <strong>{name}</strong> via your preferred contact method (<strong>{preferredContactMethod}</strong> at <strong>{preferredContactMethod === 'Email' ? email : phone}</strong>).
                    </p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Button variant="primary" size="md" onClick={handleReset}>
                        Submit Another Enquiry
                      </Button>
                      <Button href={companyConfig.contact.phoneHref} variant="outline" size="md">
                        Call {companyConfig.contact.phoneDisplay}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    {submitStatus === 'error' && Object.keys(errors).length > 0 && (
                      <div className="guide-modal__alert" role="alert">
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
                        placeholder="e.g., Bhawanipatna, Kalahandi"
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
                          <option value="Solar Overhead Sensor Pumps & Filters">Solar Overhead Sensor Pumps &amp; Community Filters</option>
                          <option value="Solar Street Lighting Systems">Solar Street Lighting Systems</option>
                          <option value="Solar Maintenance & Health Audits">Solar Maintenance &amp; Health Audits</option>
                          <option value="General Project Feasibility & Quotation">General Solar Project Feasibility &amp; Quotation</option>
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
                      rows={4}
                      placeholder="Share your approximate monthly electricity bill, roof type, or borewell water requirement..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={errors.message}
                      required
                    />

                    <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting Your Enquiry...' : 'Submit Solar Enquiry'}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

