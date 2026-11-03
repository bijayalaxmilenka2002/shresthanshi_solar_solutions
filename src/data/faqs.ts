import { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'How is the right solar system size chosen for my property?',
    answer:
      'We review your past 6–12 months of electricity bills, sanctioned load, and unshaded roof or land area so the system capacity matches your actual usage.',
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Do solar panels work on cloudy or monsoon days in Odisha?',
    answer:
      'Yes. Solar panels continue generating power from diffused daylight on overcast days, though at lower output than on clear sunny days.',
  },
  {
    id: 'faq-3',
    category: 'residential',
    question: 'What is the difference between on-grid and hybrid rooftop solar?',
    answer:
      'On-grid solar connects directly to the utility grid to lower monthly bills via net metering. Hybrid solar adds batteries so essential appliances run during power cuts.',
  },
  {
    id: 'faq-4',
    category: 'residential',
    question: 'How much shadow-free roof space is needed per kW?',
    answer:
      'Each 1 kW of rooftop solar typically requires 80–100 sq. ft. of unshaded roof area. Elevated frames can also preserve terrace space underneath.',
  },
  {
    id: 'faq-5',
    category: 'subsidy',
    question: 'How do PM Surya Ghar and PM-KUSUM solar schemes work?',
    answer:
      'PM Surya Ghar supports eligible residential rooftop systems using approved DCR panels and net metering. PM-KUSUM supports eligible farmers for solar water pumps during official state portal windows.',
  },
  {
    id: 'faq-6',
    category: 'agricultural',
    question: 'How is a solar water pump matched to a borewell?',
    answer:
      'Pump horsepower (HP) and panel wattage are selected based on your water source (borewell, well, or pond), pumping depth, and daily crop water requirement.',
  },
  {
    id: 'faq-7',
    category: 'commercial',
    question: 'Why is solar well-suited for shops, offices, and commercial units?',
    answer:
      'Commercial buildings use most of their power between 9 AM and 6 PM—matching peak solar generation hours and directly reducing daytime grid draw.',
  },
  {
    id: 'faq-8',
    category: 'maintenance',
    question: 'What routine care does a solar installation need?',
    answer:
      'Periodic panel cleaning to remove dust and scheduled checks of wiring, earthing pits, inverter logs, and structure fasteners.',
  },
];
