import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types';

interface AccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="ui-accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id}
            className={`ui-accordion__item ${isOpen ? 'ui-accordion__item--open' : ''}`}
          >
            <button
              type="button"
              className="ui-accordion__trigger"
              onClick={() => handleToggle(idx)}
              aria-expanded={isOpen}
            >
              <span className="ui-accordion__question">{item.question}</span>
              <span className="ui-accordion__icon" aria-hidden="true">
                <ChevronDown size={20} />
              </span>
            </button>
            <div className="ui-accordion__collapse" aria-hidden={!isOpen}>
              <div className="ui-accordion__inner">
                <div className="ui-accordion__content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
