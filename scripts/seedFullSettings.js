const LIVE_URL = 'https://shresthanshisolarsolutions.vercel.app';

async function seedFullSettings() {
  console.log('Seeding complete, robust settings to MongoDB Atlas...');
  const payload = {
    settings: {
      announcement: {
        enabled: true,
        badge: 'PM Surya Ghar Subsidy Alert',
        text: 'Government assistance up to ₹78,000 for residential rooftop solar & PM-KUSUM for solar pumps in Odisha.',
        linkText: 'Check Eligibility',
        linkUrl: '/resources/subsidy-scheme-guidance',
      },
      contact: {
        primaryPhoneDisplay: '+91 99370 00024',
        primaryPhoneHref: 'tel:+919937000024',
        secondaryPhoneDisplay: '+91 94381 88047',
        secondaryPhoneHref: 'tel:+919438188047',
        phoneDisplay: '+91 99370 00024',
        phoneHref: 'tel:+919937000024',
        whatsappNumber: '9937000024',
        email: 'shresthanshi@gmail.com',
        workingHours: '24/7 Technical Support & Field Assistance',
        address: 'Head Office: Plot No. 106, Khata No. 226/61, Karlapada, Mukhiguda, Kalahandi, Odisha – 766110 • Sub-Branch Office: Bhubaneswar, Odisha',
        proprietor: 'Mr. Shubham Pratap Singh',
      },
      hero: {
        badge: 'Homes • Farms • Businesses in Odisha',
        title: 'Make the Sun Work for You.',
        subtitle: 'Practical rooftop solar, commercial daytime power, and agricultural solar water pumping—sized around what your property actually needs.',
      },
      sections: {
        heroCaption: true,
        achievementsSection: true,
        applications: true,
        governmentProjects: true,
        awardsSection: true,
        licencesSection: true,
        testimonialsSection: true,
        coreServices: true,
        processTimeline: true,
        fieldHighlights: true,
        faqSection: true,
        trustBanner: true,
      },
    },
  };

  const res = await fetch(`${LIVE_URL}/api/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log('Result:', data);
}

seedFullSettings();
