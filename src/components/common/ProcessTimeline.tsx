import React from 'react';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Share Your Requirement',
    description: 'Tell us about your home roof, commercial load, or farm borewell.',
  },
  {
    number: '02',
    title: 'Site & Usage Check',
    description: 'We review your utility bills, shadow-free area, or water depth.',
  },
  {
    number: '03',
    title: 'Clear System Proposal',
    description: 'Receive an itemized capacity, structure, and scheme breakdown.',
  },
  {
    number: '04',
    title: 'Installation & Support',
    description: 'Clean execution, safety testing, and ongoing field support.',
  },
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps = defaultSteps }) => {
  return (
    <div className="process-timeline">
      {steps.map((step, index) => (
        <div key={step.number} className="process-timeline__step">
          <div className="process-timeline__header">
            <div className="process-timeline__badge">{step.number}</div>
            {index < steps.length - 1 && (
              <div className="process-timeline__connector" aria-hidden="true" />
            )}
          </div>
          <div className="process-timeline__body">
            <h3 className="process-timeline__title">{step.title}</h3>
            <p className="process-timeline__desc">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
