import { jsPDF } from 'jspdf';
import { companyConfig } from '../data/company';

export interface SolarGuidePdfOptions {
  customerName?: string;
  phone?: string;
  email?: string;
  referenceId?: string;
  specificNeed?: string;
}

export const generateSolarGuidePDF = (options: SolarGuidePdfOptions = {}): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Primary Colors
  const forestGreen = [23, 75, 53] as const; // #174B35
  const softGreen = [232, 242, 232] as const; // #E8F2E8
  const darkText = [30, 41, 59] as const;
  const mutedText = [100, 116, 139] as const;

  // 1. Header Top Banner (Forest Green)
  doc.setFillColor(...forestGreen);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SHRESTHANSHI SOLAR SOLUTIONS', margin, 14);

  // Subtitle & Proprietor
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('M/s Shreshtanshi Construction & Suppliers • Prop. Shubham Pratap Singh', margin, 20);
  doc.text(`Registered GSTIN: ${companyConfig.gstin} | Kalahandi & Across Odisha`, margin, 25);

  // Official Seal Badge
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - margin - 42, 8, 42, 22, 2, 2, 'F');
  doc.setTextColor(...forestGreen);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('OFFICIAL GUIDE', pageWidth - margin - 37, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('ODISHA ENTERPRISE', pageWidth - margin - 38, 20);
  doc.text('GOVT REGISTERED', pageWidth - margin - 37, 25);

  // 2. Document Title Ribbon
  let y = 46;
  doc.setFillColor(...softGreen);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
  doc.setTextColor(...forestGreen);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text("PRE-INVESTMENT SOLAR BUYER'S DECISION GUIDE & CHECKLIST", margin + 4, y + 9);

  // 3. Customer Info Box
  y = 66;
  doc.setDrawColor(210, 225, 215);
  doc.setFillColor(250, 252, 250);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...forestGreen);
  doc.text('PREPARED EXCLUSIVELY FOR:', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkText);
  doc.setFontSize(9);
  doc.text(`Client Name: ${options.customerName || 'Valued Solar Consumer'}`, margin + 4, y + 13);
  doc.text(`Contact: ${options.phone || 'Recorded on Portal'}`, margin + 4, y + 18);

  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  doc.text(`Issue Date: ${dateStr}`, margin + 95, y + 13);
  doc.text(`Reference ID: ${options.referenceId || 'SS-GUIDE-' + Math.floor(100000 + Math.random() * 900000)}`, margin + 95, y + 18);

  // 4. Section 1: Demand Sizing
  y = 96;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...forestGreen);
  doc.text('1. SIZING SOLAR TO YOUR ACTUAL LOAD & CONSUMPTION', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkText);
  y += 5;
  const p1 = [
    '• For Homes: Check your past 12 months of utility electricity bills (TPWODL / Odisha DISCOMs). A 1 kW on-grid solar plant generates approx. 120 units (kWh) per month in Odisha climate.',
    '• Typical Sizing: 2 kW for Rs 1,500 - Rs 2,500 monthly bills; 3 kW for Rs 3,000 - Rs 5,000 bills; 5 kW+ for large households with multiple ACs.',
    '• For Farms: Sizing depends on borewell depth, pump horsepower (3 HP to 10 HP), and irrigated acreage. Standalone solar pumps operate zero-fuel irrigation during daylight hours.',
    '• Commercial Properties: Sized to match 9 AM - 6 PM daytime working loads to directly offset higher commercial tariff brackets.',
  ];
  p1.forEach((line) => {
    const split = doc.splitTextToSize(line, contentWidth);
    doc.text(split, margin, y);
    y += split.length * 4.5;
  });

  // 5. Section 2: Roof & Site Feasibility
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...forestGreen);
  doc.text('2. SHADOW-FREE TERRACE & STRUCTURAL FEASIBILITY', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkText);
  y += 5;
  const p2 = [
    '• Shadow-Free Area: Requires approx. 80 to 100 sq. ft. of unshaded roof space per 1 kW of solar capacity between 9:00 AM and 4:00 PM.',
    '• Usable Terrace Clearance: Opt for elevated galvanized mounting frames (minimum 7 to 8 ft clearance) so your rooftop space remains 100% usable for family gatherings or drying clothes.',
    '• Odisha Weather Durability: Insist on hot-dip galvanized steel mounting structures (minimum 80 microns galvanizing) with anti-corrosion hardware engineered to resist cyclonic wind speeds.',
  ];
  p2.forEach((line) => {
    const split = doc.splitTextToSize(line, contentWidth);
    doc.text(split, margin, y);
    y += split.length * 4.5;
  });

  // 6. Section 3: On-Grid vs Hybrid vs Pumps
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...forestGreen);
  doc.text('3. UNDERSTANDING ON-GRID, HYBRID & SOLAR PUMPING', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkText);
  y += 5;
  const p3 = [
    '• On-Grid Solar (Highest Return): Connected directly to the utility grid with a bi-directional Net Meter. Excess power exported to grid offsets nighttime usage. Typical ROI is 3 to 4 years.',
    '• Hybrid Solar (Grid + Battery): Connects to grid and includes a solar battery bank (LiFePO4) to power essential fans, lights, and appliances during power outages.',
    '• Dual-Mode Solar Pump Controllers: Smart controllers running agricultural borewell pumps on daytime solar and electric grid at night, saving thousands in diesel costs.',
  ];
  p3.forEach((line) => {
    const split = doc.splitTextToSize(line, contentWidth);
    doc.text(split, margin, y);
    y += split.length * 4.5;
  });

  // 7. Section 4: PM Surya Ghar & Subsidies
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...forestGreen);
  doc.text('4. PM SURYA GHAR & AGRICULTURAL SCHEME CHECKLIST', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkText);
  y += 5;
  const p4 = [
    '• PM Surya Ghar Muft Bijli Yojana: Direct Central Govt subsidy of Rs 33,000 for 1 kW, Rs 66,000 for 2 kW, and up to Rs 78,000 for 3 kW and above for eligible residential consumers.',
    '• DCR Module Mandate: To claim subsidy, panels must be Domestic Content Requirement (DCR) certified manufactured in India with ALMM approval.',
    '• Nodal Assistance: We handle end-to-end portal registration, DISCOM net-meter feasibility application, installation documentation, and subsidy disbursement assistance.',
  ];
  p4.forEach((line) => {
    const split = doc.splitTextToSize(line, contentWidth);
    doc.text(split, margin, y);
    y += split.length * 4.5;
  });

  // 8. Bottom Contact & Engineering Office Footer Box
  const footerBoxY = 256;
  doc.setFillColor(...forestGreen);
  doc.roundedRect(margin, footerBoxY, contentWidth, 26, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('NEED A FREE SITE ASSESSMENT OR DETAILED QUOTATION IN ODISHA?', margin + 4, footerBoxY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Office: ${companyConfig.contact.address.full}`, margin + 4, footerBoxY + 13);
  doc.text(
    `Direct WhatsApp / Phone: ${companyConfig.contact.phoneDisplay} | Official Email: ${companyConfig.contact.email}`,
    margin + 4,
    footerBoxY + 18
  );
  doc.text('Proprietor: Shubham Pratap Singh (MBA, BPUT) • Turnkey Solar Engineering', margin + 4, footerBoxY + 23);

  // 9. Document Legal Notice
  doc.setTextColor(...mutedText);
  doc.setFontSize(7);
  doc.text(
    `© ${new Date().getFullYear()} ${companyConfig.legalName}. Educational Guide for Solar Consumers in Kalahandi & Odisha.`,
    margin,
    289
  );

  // Trigger browser download
  const filename = `Shresthanshi-Solar-Buyers-Guide-${(options.customerName || 'Customer').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(filename);
};

