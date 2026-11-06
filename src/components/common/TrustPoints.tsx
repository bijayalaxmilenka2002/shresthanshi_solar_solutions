import React from 'react';
import { ShieldCheck, Compass, FileCheck2, MapPin } from 'lucide-react';

interface TrustPointsProps {
  compact?: boolean;
}

export const TrustPoints: React.FC<TrustPointsProps> = ({ compact = false }) => {
  const points = [
    {
      icon: <Compass size={20} />,
      title: 'Need-Based Assessment',
      detail: 'Sized around your actual utility bills, roof space, or borewell water head.',
    },
    {
      icon: <ShieldCheck size={20} />,
      title: 'Verified Odisha Enterprise',
      detail: 'Registered GSTIN (21AVUPM9359D1Z6) serving Bhubaneswar with established department in Kalahandi.',
    },
    {
      icon: <FileCheck2 size={20} />,
      title: 'Clear Scheme Guidance',
      detail: 'Straightforward information on PM Surya Ghar and PM-KUSUM rules.',
    },
    {
      icon: <MapPin size={20} />,
      title: 'On-Ground Execution',
      detail: 'Experienced in solar water pumps, rooftop systems, and structural fabrication.',
    },
  ];

  return (
    <div className={`trust-points ${compact ? 'trust-points--compact' : ''}`}>
      {points.map((pt) => (
        <div key={pt.title} className="trust-points__item">
          <div className="trust-points__icon">{pt.icon}</div>
          <div>
            <h3 className="trust-points__title">{pt.title}</h3>
            {!compact && <p className="trust-points__detail">{pt.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

