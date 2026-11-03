import React, { useState, useEffect } from 'react';
import {
  Sun,
  Home,
  Building2,
  Droplets,
  Lightbulb,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useQuoteModal } from '../../hooks/useQuoteModal';
import { submitQuoteRequest } from '../../services/enquiryService';

interface QuoteErrors {
  name?: string;
  phone?: string;
  location?: string;
}

interface SolarTypeConfig {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  capacityLabel: string;
  capacityOptions: string[];
}

const SOLAR_CONFIGS: SolarTypeConfig[] = [
  {
    id: 'Residential Rooftop Solar',
    label: 'Home Rooftop',
    sublabel: '1 kW – 10 kW',
    icon: <Home size={18} />,
    capacityLabel: 'Average Monthly Electricity Bill',
    capacityOptions: [
      'Below ₹1,500 / month (Approx 1–2 kW)',
      '₹1,500 – ₹3,000 / month (Approx 2–3 kW)',
      '₹3,000 – ₹6,000 / month (Approx 3–5 kW)',
      '₹6,000 – ₹12,000 / month (Approx 5–10 kW)',
      '₹12,000+ / month (High Load)',
    ],
  },
  {
    id: 'Commercial Solar Plants',
    label: 'Commercial',
    sublabel: '10 kW – 100 kW+',
    icon: <Building2 size={18} />,
    capacityLabel: 'Monthly Electricity Consumption / Tariff',
    capacityOptions: [
      '₹10,000 – ₹25,000 / month (Shop / Clinic / Office)',
      '₹25,000 – ₹60,000 / month (School / Hospital / Workshop)',
      '₹60,000 – ₹1.5 Lakh / month (Rice Mill / Industry)',
      '₹1.5 Lakh+ / month (Large Commercial / High Tension)',
    ],
  },
  {
    id: 'Solar Water Pumps',
    label: 'Solar Pump',
    sublabel: 'Farm Irrigation',
    icon: <Droplets size={18} />,
    capacityLabel: 'Pump Horsepower & Setup',
    capacityOptions: [
      '3 HP Submersible Solar Pump',
      '5 HP High-Discharge Solar Pump',
      '7.5 HP Heavy-Duty Farmland Pump',
      '10 HP+ High-Volume Irrigation System',
      'Solar Dual-Mode Controller for Existing AC Pump',
    ],
  },
  {
    id: 'Solar Street Lighting',
    label: 'Street Lights',
    sublabel: 'Roads & Campus',
    icon: <Lightbulb size={18} />,
    capacityLabel: 'Estimated Number of Lighting Units',
    capacityOptions: [
      '1 – 5 Lights (Farmhouse / Private Campus)',
      '5 – 20 Lights (Village Streets / School Campus)',
      '20 – 50 Lights (Gram Panchayat Tender)',
      '50+ Lights (Block / Institutional Project)',
    ],
  },
  {
    id: 'Solar Maintenance & AMC',
    label: 'Maintenance',
    sublabel: 'Health Audit & AMC',
    icon: <Wrench size={18} />,
    capacityLabel: 'Current Solar System Details',
    capacityOptions: [
      'Residential Rooftop System (1–5 kW)',
      'Commercial Solar Power Plant (10–50 kW+)',
      'Agricultural Solar Pump System',
      'Inverter Diagnostics / Performance Audit',
    ],
  },
];

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, quotePrefillType, closeQuoteModal } = useQuoteModal();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSolarId, setSelectedSolarId] = useState('Residential Rooftop Solar');
  const [capacityChoice, setCapacityChoice] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Phone Call'>('WhatsApp');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<QuoteErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState('');

  // Find active config
  const activeConfig =
    SOLAR_CONFIGS.find((c) => c.id === selectedSolarId) || SOLAR_CONFIGS[0];

  useEffect(() => {
    if (isQuoteModalOpen) {
      if (quotePrefillType) {
        const matched = SOLAR_CONFIGS.find(
          (c) =>
            c.id.toLowerCase().includes(quotePrefillType.toLowerCase()) ||
            quotePrefillType.toLowerCase().includes(c.id.toLowerCase())
        );
        if (matched) {
          setSelectedSolarId(matched.id);
          setCapacityChoice(matched.capacityOptions[1] || matched.capacityOptions[0]);
        } else {
          setSelectedSolarId(SOLAR_CONFIGS[0].id);
          setCapacityChoice(SOLAR_CONFIGS[0].capacityOptions[1]);
        }
      } else {
        setCapacityChoice(SOLAR_CONFIGS[0].capacityOptions[1]);
      }
      setErrors({});
      setSubmitStatus('idle');
    }
  }, [isQuoteModalOpen, quotePrefillType]);

  // When user switches category, set default capacity choice
  const handleSolarTypeChange = (id: string) => {
    setSelectedSolarId(id);
    const config = SOLAR_CONFIGS.find((c) => c.id === id);
    if (config) {
      setCapacityChoice(config.capacityOptions[0]);
    }
  };

  const validate = (): boolean => {
    const nextErrors: QuoteErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!location.trim() || location.trim().length < 2) {
      nextErrors.location = 'Please mention your city, town, or district in Odisha.';
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
      const response = await submitQuoteRequest({
        name: name.trim(),
        phone: phone.trim(),
        location: location.trim(),
        solarType: selectedSolarId,
        monthlyBillOrHp: `${capacityChoice} (Prefers: ${preferredContact})`,
        message: message.trim() || undefined,
      });

      if (response.success) {
        setReferenceId(response.referenceId);
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

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setLocation('');
    setMessage('');
    setErrors({});
    setSubmitStatus('idle');
    closeQuoteModal();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Shresthanshi Solar Solutions! I have submitted a quote request (Ref: ${referenceId}) for ${selectedSolarId} in ${location}. Requirement: ${capacityChoice}. Please share estimation & subsidy details.`
  );

  return (
    <Modal
      isOpen={isQuoteModalOpen}
      onClose={handleResetAndClose}
      titleId="quote-modal-title"
      className="quote-modal-panel"
    >
      {submitStatus === 'success' ? (
        <div className="quote-modal-success" style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-soft-green)',
              color: 'var(--color-forest-green)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              backgroundColor: 'var(--color-soft-green)',
              color: 'var(--color-forest-green)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            Quote Request Received
          </span>

          <h2
            id="quote-modal-title"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--color-forest-green)',
              marginBottom: '0.4rem',
            }}
          >
            Thank You, {name}!
          </h2>

          <div
            style={{
              backgroundColor: 'var(--color-soft-green)',
              border: '1.5px solid var(--color-forest-green)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.85rem 1.25rem',
              margin: '1.25rem auto',
              maxWidth: '340px',
            }}
          >
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Reference ID
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--color-forest-green)',
                marginTop: '0.15rem',
              }}
            >
              {referenceId}
            </div>
          </div>

          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: 'var(--text-body)',
              maxWidth: '460px',
              margin: '0 auto 1.5rem',
            }}
          >
            Our engineering team in Kalahandi will evaluate your property in <strong>{location}</strong> and prepare a transparent capacity sizing and cost breakdown for <strong>{selectedSolarId}</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '380px', margin: '0 auto' }}>
            <a
              href={`https://wa.me/919438080874?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn ui-btn--primary"
              style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', gap: '0.5rem', minHeight: '46px' }}
            >
              <MessageCircle size={18} />
              <span>Connect on WhatsApp Instantly</span>
            </a>

            <Button variant="outline" fullWidth onClick={handleResetAndClose}>
              Done &amp; Close
            </Button>
          </div>
        </div>
      ) : (
        <div className="quote-modal-form-wrap">
          <div className="quote-modal__header">
            <span className="quote-modal__badge">
              <Sun size={13} />
              <span>Free Solar Estimation • No Obligation</span>
            </span>
            <h2 id="quote-modal-title" className="quote-modal__title">
              Request a Free Solar Quote
            </h2>
            <p className="quote-modal__subtitle">
              Tell us about your home, business, or farm in Odisha. We will calculate estimated generation, system capacity, and subsidy savings.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* 1. Category Selection Pills */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: 'var(--color-forest-green)',
                  marginBottom: '0.5rem',
                }}
              >
                Select Solar Requirement <span style={{ color: '#E11D48' }}>*</span>
              </label>

              <div className="quote-type-grid" role="radiogroup" aria-label="Select Solar Requirement">
                {SOLAR_CONFIGS.map((cfg) => {
                  const isActive = cfg.id === selectedSolarId;
                  return (
                    <button
                      key={cfg.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      className={`quote-type-chip ${isActive ? 'quote-type-chip--active' : ''}`}
                      onClick={() => handleSolarTypeChange(cfg.id)}
                    >
                      <span className="quote-type-chip__icon">{cfg.icon}</span>
                      <span className="quote-type-chip__label">{cfg.label}</span>
                      <span className="quote-type-chip__hint">{cfg.sublabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Personal & Contact Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Input
                label="Full Name"
                type="text"
                placeholder="e.g. Ramesh Chandra"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                error={errors.name}
                required
              />

              <Input
                label="Mobile Number (WhatsApp)"
                type="tel"
                placeholder="e.g. 9438080874"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                error={errors.phone}
                helperText="We'll send your preliminary quote via WhatsApp / SMS"
                required
              />
            </div>

            {/* 3. Location & Contact Preference */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Input
                label="City / District in Odisha"
                type="text"
                placeholder="e.g. Bhawanipatna, Kalahandi"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                }}
                error={errors.location}
                required
              />

              <div className="ui-field">
                <label className="ui-field__label">Preferred Contact Mode</label>
                <div className="quote-contact-method-group">
                  <button
                    type="button"
                    className={`quote-contact-pill ${
                      preferredContact === 'WhatsApp' ? 'quote-contact-pill--active' : ''
                    }`}
                    onClick={() => setPreferredContact('WhatsApp')}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp (Instant)</span>
                  </button>
                  <button
                    type="button"
                    className={`quote-contact-pill ${
                      preferredContact === 'Phone Call' ? 'quote-contact-pill--active' : ''
                    }`}
                    onClick={() => setPreferredContact('Phone Call')}
                  >
                    <Phone size={15} />
                    <span>Phone Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Dynamic Capacity / Bill Bracket */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="quote-capacity-select" className="ui-field__label">
                {activeConfig.capacityLabel}
              </label>
              <div className="quote-field-select-wrap">
                <select
                  id="quote-capacity-select"
                  value={capacityChoice}
                  onChange={(e) => setCapacityChoice(e.target.value)}
                  className="quote-field-select"
                >
                  {activeConfig.capacityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="quote-select-chevron" />
              </div>
            </div>

            {/* 5. Optional Requirement Notes */}
            <div style={{ marginBottom: '1.25rem' }}>
              <Textarea
                label="Additional Requirement Notes (Optional)"
                placeholder="e.g. RCC terrace space approx 500 sq ft, or 5 HP submersible borewell pump in Narla."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
              />
            </div>

            {/* Error banner */}
            {submitStatus === 'error' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  marginBottom: '1rem',
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>Please complete the required fields highlighted in red above.</span>
              </div>
            )}

            {/* Footer with Trust Badge & Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                }}
              >
                <ShieldCheck size={16} style={{ color: 'var(--color-forest-green)', flexShrink: 0 }} />
                <span>Zero spam • Direct from Kalahandi engineering office</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.65rem',
                  flex: '1 1 auto',
                  justifyContent: 'flex-end',
                }}
              >
                <Button type="button" variant="outline" size="md" onClick={handleResetAndClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  iconRight={<ArrowRight size={16} />}
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Solar Quote'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};
