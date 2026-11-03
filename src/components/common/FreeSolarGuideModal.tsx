import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, AlertCircle, Download, FileText } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useSolarGuideModal } from '../../hooks/useSolarGuideModal';
import { submitSolarGuideRequest } from '../../services/enquiryService';
import { generateSolarGuidePDF } from '../../services/pdfService';
import { companyConfig } from '../../data/company';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const FreeSolarGuideModal: React.FC = () => {
  const { isGuideModalOpen, defaultMessage, closeGuideModal } = useSolarGuideModal();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (isGuideModalOpen) {
      setMessage(defaultMessage || '');
      setErrors({});
    }
  }, [isGuideModalOpen, defaultMessage]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

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

    if (!message.trim() || message.trim().length < 5) {
      nextErrors.message = 'Please briefly share your solar requirement (e.g., home, farm, or business).';
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
      const response = await submitSolarGuideRequest({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
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
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    setSubmitStatus('idle');
    closeGuideModal();
  };

  const handleDownloadChecklist = () => {
    generateSolarGuidePDF({
      customerName: name,
      phone,
      email,
      referenceId,
      specificNeed: message,
    });
  };

  return (
    <Modal isOpen={isGuideModalOpen} onClose={handleResetAndClose} titleId="solar-guide-modal-title">
      <div className="guide-modal">
        <div className="guide-modal__header">
          <div className="guide-modal__badge">
            <BookOpen size={16} />
            <span>Free Pre-Investment Solar Guide</span>
          </div>
          <h2 id="solar-guide-modal-title" className="guide-modal__title">
            Thinking About Solar? Read This Before You Invest.
          </h2>
          <p className="guide-modal__subtitle">
            A practical guide to help you make a more informed solar decision.
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className="guide-modal__success" role="status">
            <div className="guide-modal__success-icon">
              <CheckCircle2 size={36} />
            </div>
            <h3>Your Free Solar Guide Is Ready!</h3>
            <p>
              Thank you, <strong>{name}</strong>. We have logged your request (Ref: <strong>{referenceId}</strong>) and prepared your practical solar decision guide. Our team can also follow up at <strong>{phone}</strong> or <strong>{email}</strong> to answer any site-specific questions.
            </p>
            <div className="guide-modal__highlights-box">
              <h4><FileText size={16} /> What’s Covered Inside the Guide:</h4>
              <ul>
                <li>How to read your electricity bill &amp; sanctioned load before sizing solar</li>
                <li>Roof shadow analysis &amp; structural mounting checklist</li>
                <li>On-grid vs. hybrid battery storage comparison</li>
                <li>PM Surya Ghar &amp; PM-KUSUM eligibility checklist</li>
              </ul>
            </div>
            <div className="guide-modal__success-actions">
              <Button
                variant="primary"
                size="md"
                iconLeft={<Download size={18} />}
                onClick={handleDownloadChecklist}
              >
                Download Guide Summary (PDF)
              </Button>
              <Button variant="outline" size="md" onClick={handleResetAndClose}>
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="guide-modal__form" noValidate>
            {submitStatus === 'error' && Object.keys(errors).length > 0 && (
              <div className="guide-modal__alert" role="alert">
                <AlertCircle size={18} />
                <span>Please review the highlighted fields below so we can send your guide.</span>
              </div>
            )}

            <Input
              label="Name"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />

            <div className="guide-modal__row">
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

            <Textarea
              label="Message"
              name="message"
              rows={3}
              placeholder="Tell us if you are exploring solar for your home, farm water pump, or business property..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={errors.message}
              required
            />

            <div className="guide-modal__footer">
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Preparing Your Solar Guide...' : 'Get My Free Solar Guide'}
              </Button>
              <p className="guide-modal__privacy-note">
                No spam or obligation. Your details are used only to share your solar guide and answer your enquiry.
              </p>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

