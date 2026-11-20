import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const margin = 14;
const contentWidth = pageWidth - margin * 2;

// Colors
const forestGreen = [23, 75, 53];
const emeraldGreen = [34, 197, 94];
const softGreen = [232, 242, 232];
const darkText = [15, 23, 42];
const mutedText = [71, 85, 105];
const borderCol = [226, 232, 240];

// Header banner
doc.setFillColor(...forestGreen);
doc.rect(0, 0, pageWidth, 42, 'F');

// Top Accent line
doc.setFillColor(74, 222, 128); // #4ADE80
doc.rect(0, 0, pageWidth, 2.5, 'F');

// Company title
doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.text('SHRESTHANSHI SOLAR SOLUTIONS', margin, 15);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(232, 242, 232);
doc.text('M/s Shreshtanshi Construction & Suppliers • Prop. Shubham Pratap Singh', margin, 21);
doc.text('GSTIN: 21AVUPM9359D1Z6  |  Head Office: Kalahandi  |  Sub-Branch: Bhubaneswar', margin, 26);

// Document Badge
doc.setFillColor(255, 255, 255);
doc.roundedRect(pageWidth - margin - 52, 9, 52, 24, 2, 2, 'F');
doc.setTextColor(...forestGreen);
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.text('MASTER CREDENTIALS', pageWidth - margin - 26, 17, { align: 'center' });
doc.setFont('helvetica', 'normal');
doc.setFontSize(7);
doc.setTextColor(...mutedText);
doc.text('Confidential Admin Document', pageWidth - margin - 26, 22, { align: 'center' });
doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - margin - 26, 27, { align: 'center' });

let y = 49;

// Helper: Section Header
function drawSectionHeader(title, iconText = '■') {
  doc.setFillColor(...softGreen);
  doc.roundedRect(margin, y, contentWidth, 7.5, 1.5, 1.5, 'F');
  doc.setTextColor(...forestGreen);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${iconText}  ${title}`, margin + 3, y + 5.2);
  y += 10.5;
}

// Helper: Key-Value Box
function drawInfoBox(items) {
  const boxHeight = items.length * 6.5 + 4;
  doc.setDrawColor(...borderCol);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, 'FD');

  let itemY = y + 5;
  items.forEach(([label, value, isHighlight]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...forestGreen);
    doc.text(label, margin + 4, itemY);

    doc.setFont('helvetica', isHighlight ? 'bold' : 'normal');
    doc.setFontSize(8.5);
    if (isHighlight) {
      doc.setTextColor(185, 28, 28); // Highlight red/dark
    } else {
      doc.setTextColor(...darkText);
    }
    doc.text(value, margin + 55, itemY);

    itemY += 6.5;
  });

  y += boxHeight + 4;
}

// --- SECTION 1 ---
drawSectionHeader('1. OWNER & ADMIN PORTAL ACCESS', '🔒');
drawInfoBox([
  ['Owner Portal URL:', 'https://shresthanshisolarsolutions.vercel.app/owner-portal'],
  ['Super Admin URL:', 'https://shresthanshisolarsolutions.vercel.app/super-admin'],
  ['Authorized Usernames:', 'admin   or   shubham', true],
  ['Security Password / PIN:', 'shresthanshi2026', true],
  ['Purpose & Usage:', 'View inquiries, change lead statuses, publish alert banner, export CSV'],
]);

// --- SECTION 2 ---
drawSectionHeader('2. LIVE WEBSITE & DEPLOYMENT (VERCEL & GITHUB)', '🌐');
drawInfoBox([
  ['Live Production URL:', 'https://shresthanshisolarsolutions.vercel.app', true],
  ['Hosting Platform:', 'Vercel (Serverless Global Edge Network)'],
  ['Vercel Project Name:', 'shresthanshi_solar_solutions'],
  ['GitHub Repository:', 'github.com/bijayalaxmilenka2002/shresthanshi_solar_solutions'],
  ['Production Branch:', 'main (every git push auto-deploys in ~30 seconds)'],
  ['Maintenance Required:', 'Zero daily maintenance required. Self-healing 24/7 cloud uptime.'],
]);

// --- SECTION 3 ---
drawSectionHeader('3. DATABASE SPECIFICATIONS (MONGODB ATLAS CLOUD)', '🗄️');
drawInfoBox([
  ['Database Cloud:', 'MongoDB Atlas (AWS Cloud / Mumbai Region)'],
  ['Cluster Hostname:', 'cluster0.ve0setx.mongodb.net'],
  ['Database Name:', 'shresthanshi_solar'],
  ['Database Collections:', 'leads (Customer Inquiries)  |  settings (Notice & Alert Banners)'],
  ['Database User:', 'gb7411286_db_user'],
  ['Vercel Secret Key:', 'MONGODB_URI (Stored securely in Vercel Environment Variables)'],
]);

// --- SECTION 4 ---
drawSectionHeader('4. OFFICIAL BUSINESS IDENTITY & OFFICE HUBS', '🏢');
drawInfoBox([
  ['Legal Entity Name:', 'M/s Shreshtanshi Construction & Suppliers'],
  ['Trade / Brand Name:', 'Shresthanshi Solar Solutions (Prop. Shubham Pratap Singh)'],
  ['GSTIN Registration:', '21AVUPM9359D1Z6 (Odisha Government Registered)', true],
  ['Primary Phone / WhatsApp:', '+91 99370 00024  (Direct Hotline)'],
  ['Secondary Support Phone:', '+91 94381 88047'],
  ['Official Business Email:', 'shresthanshi@gmail.com'],
  ['Head Office (HQ):', 'Plot No. 106, Khata No. 226/61, Karlapada, Mukhiguda, Kalahandi - 766110'],
  ['Sub-Branch Office:', 'Plot No. 891/2145, Bomikhal, Near Rasulgarh, Bhubaneswar - 751010'],
]);

// --- SECTION 5: Instructions / Note ---
doc.setFillColor(254, 243, 199); // Soft amber
doc.setDrawColor(245, 158, 11);
doc.roundedRect(margin, y, contentWidth, 19, 1.5, 1.5, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(146, 64, 14);
doc.text('IMPORTANT SECURITY & HANDOVER NOTE:', margin + 4, y + 5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(120, 53, 15);
doc.text('• Keep this document confidential. The PIN "shresthanshi2026" grants administrative control to live site settings.', margin + 4, y + 9.5);
doc.text('• The website runs autonomously in the cloud without requiring your local PC to be turned on.', margin + 4, y + 13.5);
doc.text('• When new showcase project videos arrive, add them to the repository and push to main for instant live updates.', margin + 4, y + 17);

// Footer
doc.setFillColor(...forestGreen);
doc.rect(0, pageHeight - 9, pageWidth, 9, 'F');
doc.setFont('helvetica', 'normal');
doc.setFontSize(7);
doc.setTextColor(255, 255, 255);
doc.text('Shresthanshi Solar Solutions • Master Admin Documentation • Confidential', margin, pageHeight - 3.5);
doc.text('Page 1 of 1', pageWidth - margin, pageHeight - 3.5, { align: 'right' });

// Output
const outPath = path.resolve('SHRESTHANSHI_PROJECT_CREDENTIALS.pdf');
const publicDir = path.resolve('public/documents');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const publicOutPath = path.resolve('public/documents/SHRESTHANSHI_PROJECT_CREDENTIALS.pdf');

const pdfData = doc.output('arraybuffer');
fs.writeFileSync(outPath, Buffer.from(pdfData));
fs.writeFileSync(publicOutPath, Buffer.from(pdfData));

console.log(`PDF successfully generated at:`);
console.log(`- ${outPath}`);
console.log(`- ${publicOutPath}`);
