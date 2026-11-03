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
            <div className="contact-layout__info">
              <Card variant="soft-green" padding="lg">
                <span className="badge" style={{ marginBottom: '0.75rem' }}>
                  Verified Head Office
                </span>
                <h2>{companyConfig.legalName}</h2>
                <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-sm)' }}>
                  Proprietor: <strong>{companyConfig.founder.name}</strong>
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-item__icon">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3>Registered Office Address</h3>
                      <p>{companyConfig.contact.address.full}</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-item__icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3>Phone &amp; Direct Call</h3>
                      <p>
                        <a href={companyConfig.contact.phoneHref} className="contact-action-link">
                          {companyConfig.contact.phoneDisplay}
                        </a>
                      </p>
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Button href={companyConfig.contact.phoneHref} variant="primary" size="sm">
                          Call Now
                        </Button>
                        <Button
                          href={companyConfig.contact.whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                        >
                          WhatsApp Us
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-item__icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3>Email Address</h3>
                      <p>
                        <a href={companyConfig.contact.emailHref} className="contact-action-link">
                          {companyConfig.contact.email}
                        </a>
                      </p>
                      <div style={{ marginTop: '0.5rem' }}>
                        <Button href={companyConfig.contact.emailHref} variant="outline" size="sm">
                          Send an Email
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-item__icon">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3>Consultation Hours</h3>
                      <p>{companyConfig.contact.workingHours}</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-item__icon">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3>GSTIN &amp; Verification</h3>
                      <p>GSTIN: <strong>{companyConfig.gstin}</strong></p>
                      <p style={{ fontSize: 'var(--text-xs)', marginTop: '0.25rem' }}>
                        {companyConfig.contact.confirmationNote}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card variant="outlined" padding="lg" style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <BookOpen size={18} color="var(--color-forest-green)" />
                  <h3>Prefer to Read Our Guide First?</h3>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', marginBottom: '1rem' }}>
                  Download our practical pre-investment solar guide before scheduling a site visit.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openGuideModal('Requested from Contact Us page')}
                >
                  Get a Free Solar Guide
                </Button>
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

