import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  GraduationCap,
  CheckCircle2,
  Compass,
  Wrench,
  FileCheck2,
  ArrowRight,
  Award,
  Video,
  Play,
  Maximize2,
  Calendar,
  Building2,
  Sprout,
  TreePine,
  ExternalLink,
  Newspaper,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CTASection } from '../../components/common/CTASection';
import { SEO } from '../../components/common/SEO';
import { Modal } from '../../components/ui/Modal';
import { companyConfig } from '../../data/company';
import { mediaItems, MediaItem } from '../../data/mediaData';

export const AboutPage: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Group media items into distinct categories for organized display
  const awardsMedia = mediaItems.filter((m) => m.category === 'awards');
  const videoMedia = mediaItems.filter((m) => m.category === 'videos');
  const summitMedia = mediaItems.filter((m) => m.category === 'summits');
  const installationMedia = mediaItems.filter((m) => m.category === 'installations');

  const journeyMilestones = [
    {
      year: '2024',
      title: 'Foundation & Solar Irrigation Launch',
      desc: 'Established operational base in Kalahandi and Bhubaneswar, executing turnkey borewell water pumping, agricultural MPPT controllers, and rural solar installations.',
    },
    {
      year: '2025',
      title: 'PM Surya Ghar Expansion & Utility Empanelment',
      desc: 'Empaneled under PM Surya Ghar Muft Bijli Yojana and entered into Utility-Led Aggregation with TPWODL (Tata Power & Odisha Govt JV), achieving rapid net-meter synchronizations.',
    },
    {
      year: '2025 – 2026',
      title: '350+ Installations & District First Place',
      desc: 'Completed over 350+ residential rooftop solar plants within 2 years. Awarded District 1st Place for highest verified installations by District Administration & RE Cell.',
    },
    {
      year: '2026 – Present',
      title: 'National Summit Delegate & Government Sector Work',
      desc: 'Invited by MNRE (Govt of India) as Top 100 Vendor delegate at Bharat Mandapam, New Delhi. Expanding institutional solar works for Agro Odisha and the Forest Department.',
    },
  ];

  return (
    <div className="about-page">
      <SEO
        title="About Us & Company Media | Shreshtanshi Solar Solutions"
        description="Learn about M/s Shreshtanshi Construction & Suppliers: company journey, mission, leadership, 350+ PM Surya Ghar achievements, media coverage, and official national awards."
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* 1. COMPANY INTRODUCTION */}
      <section id="company-introduction" className="page-hero bg-soft-green">
        <Container className="page-hero__grid">
          <div className="page-hero__content">
            <span className="badge" style={{ marginBottom: '1rem' }}>
              Company Introduction • Established in Odisha
            </span>
            <h1 className="page-hero__title">
              Engineering Clean Solar Power &amp; Sustainable Water Across Odisha.
            </h1>
            <p className="page-hero__subtitle">
              Headquartered at Sargiguda, Narla Road in Kalahandi with our sub-branch office in Bhubaneswar, <strong>{companyConfig.legalName}</strong> (GSTIN: {companyConfig.gstin}) delivers turnkey on-grid rooftop solar, utility aggregation, agricultural solar pumping, and environmental solar infrastructure.
            </p>
            <div className="page-hero__actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                Get a Solar Assessment
              </Button>
              <Button href="#media-coverage" variant="outline" size="lg">
                View Media &amp; Coverage
              </Button>
            </div>
          </div>
          <div className="page-hero__visual">
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(23,75,53,0.12)', border: '1.5px solid var(--border-medium)' }}>
              <img
                src="/images/solar/pm-surya-ghar-residential-350.jpg"
                alt="Shreshtanshi Solar Rooftop Installations across Odisha"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '16/11' }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. OUR JOURNEY */}
      <section id="our-journey" className="section bg-white" style={{ paddingTop: '4rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              Evolution &amp; Milestones
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-forest-green)', fontWeight: 800, marginBottom: '0.75rem' }}>
              Our Journey: From Local Innovation to National Recognition
            </h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: 1.65 }}>
              Guided by technical discipline and honest customer sizing, Shreshtanshi has grown from grassroots agricultural irrigation into an award-winning utility solar EPC contractor.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {journeyMilestones.map((ms, index) => (
              <Card
                key={ms.year}
                variant="soft-green"
                padding="lg"
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-forest-green)', color: '#FFFFFF', fontWeight: 800, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {ms.year.slice(0, 4)}
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Stage 0{index + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {ms.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                  {ms.desc}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. OUR MISSION & VISION */}
      <section id="mission-vision" className="section bg-soft-green" style={{ paddingTop: '4rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' }}>
            <Card
              variant="white"
              padding="lg"
              style={{
                borderRadius: '20px',
                border: '2px solid var(--border-medium)',
                boxShadow: '0 8px 24px rgba(23,75,53,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-soft-green)', color: 'var(--color-forest-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={24} />
              </div>
              <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '0.85rem' }}>
                Our Purpose
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '1rem' }}>
                Our Mission
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.7, margin: 0 }}>
                To empower households, farmers, and government agencies across Odisha with dependable, high-efficiency solar energy and automated water systems—combining uncompromising engineering quality, transparent financial guidance, and zero inflated promises.
              </p>
            </Card>

            <Card
              variant="white"
              padding="lg"
              style={{
                borderRadius: '20px',
                border: '2px solid var(--border-medium)',
                boxShadow: '0 8px 24px rgba(23,75,53,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-soft-green)', color: 'var(--color-forest-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sparkles size={24} />
              </div>
              <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '0.85rem' }}>
                Our Long-Term Horizon
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '1rem' }}>
                Our Vision
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.7, margin: 0 }}>
                To establish Shreshtanshi as Odisha’s most trusted and technically disciplined solar EPC enterprise, setting the benchmark for decentralized solar energy adoption, groundwater sustainability, and wildlife habitat preservation.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* 4. OUR WORK AND ACHIEVEMENTS */}
      <section id="work-achievements" className="section bg-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div style={{ maxWidth: '820px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              Execution Highlights
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-forest-green)', fontWeight: 800, marginBottom: '0.85rem' }}>
              Our Work and Proven Achievements
            </h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: 1.65 }}>
              Key achievements delivered with documented DISCOM net-meter synchronizations, District awards, and verified institutional quality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Achievement 1 */}
            <div style={{ backgroundColor: '#F8FAF8', border: '1.5px solid var(--border-medium)', borderRadius: '18px', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                350+
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                PM Surya Ghar Rooftop Installations
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                Completed 350+ grid-tied rooftop solar installations within just two years, helping households save on monthly electricity bills with direct DBT subsidy facilitation.
              </p>
            </div>

            {/* Achievement 2 */}
            <div style={{ backgroundColor: '#F8FAF8', border: '1.5px solid var(--border-medium)', borderRadius: '18px', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                1st Year
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                Utility-Led Aggregation Partner
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                Successfully completed household rooftop solar installations under Utility-Led Aggregation within one year, honored by TPWODL executive leadership.
              </p>
            </div>

            {/* Achievement 3 */}
            <div style={{ backgroundColor: '#F8FAF8', border: '1.5px solid var(--border-medium)', borderRadius: '18px', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                District #1
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                Highest Solar Installations Award
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                Awarded First Place across Kalahandi district by the District Administration and Renewable Energy Cell for verified rooftop solar volume and zero defects.
              </p>
            </div>

            {/* Achievement 4 */}
            <div style={{ backgroundColor: '#F8FAF8', border: '1.5px solid var(--border-medium)', borderRadius: '18px', padding: '1.75rem' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.35rem' }}>
                Top 100
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                MNRE National Conclave Delegate
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                Invited by Ministry of New &amp; Renewable Energy (Govt of India) among Top 100 Renewable Energy Vendors of Odisha at Bharat Mandapam, New Delhi.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. MEDIA COVERAGE & OFFICIAL CERTIFICATES */}
      <section id="media-coverage" className="section bg-soft-green" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div>
              <span className="badge" style={{ marginBottom: '0.65rem' }}>
                <Award size={14} style={{ marginRight: '0.35rem' }} />
                Media Coverage &amp; Official Accreditations
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-forest-green)', fontWeight: 800, margin: 0 }}>
                Awards, Media &amp; DISCOM Documentation
              </h2>
            </div>
            <Link to="/licences-and-certifications" className="ui-text-link" style={{ fontWeight: 700 }}>
              <span>View All Licences &amp; Certifications</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {awardsMedia.map((item) => (
              <Card
                key={item.id}
                variant="white"
                padding="none"
                hoverable
                onClick={() => setSelectedMedia(item)}
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', backgroundColor: '#0B2419' }}>
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(23,75,53,0.92)', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px' }}>
                    {item.badge}
                  </span>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-forest-green)' }}>
                    <Maximize2 size={15} />
                  </div>
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {item.verifiedBy}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, margin: 0, flexGrow: 1 }}>
                    {item.description}
                  </p>
                  <div style={{ paddingTop: '0.75rem', marginTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>{item.location}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. NEWS & PUBLICATIONS */}
      <section id="news-publications" className="section bg-white" style={{ paddingTop: '4rem', paddingBottom: '4.5rem' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto 2.75rem', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '0.85rem' }}>
              <Newspaper size={14} style={{ marginRight: '0.35rem' }} />
              Press, Releases &amp; Publications
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-forest-green)', fontWeight: 800, marginBottom: '0.75rem' }}>
              News &amp; Media Publications
            </h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.65 }}>
              Tracking state renewable energy developments, DISCOM circulars, newspaper articles, and official announcements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <Card variant="white" padding="lg" style={{ borderRadius: '16px', border: '1.5px solid var(--border-medium)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-forest-green)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Newspaper size={16} />
                <span>State Energy Conclave Bulletin • New Delhi &amp; Bhubaneswar</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                Odisha Energy Mission: Accelerating Decentralized Solar &amp; PM Surya Ghar
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Coverage of the Bharat RE Summit at Bharat Mandapam, New Delhi with Ministry of New &amp; Renewable Energy and TPWODL leadership highlighting private EPC execution benchmarks in western Odisha districts.
              </p>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Published under Renewable Energy Mission Documentation
              </span>
            </Card>

            <Card variant="white" padding="lg" style={{ borderRadius: '16px', border: '1.5px solid var(--border-medium)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-forest-green)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <FileCheck2 size={16} />
                <span>District Administration Report • Kalahandi</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-forest-green)', marginBottom: '0.65rem' }}>
                Highest Rooftop Solar Installations Achieved under PM Surya Ghar
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Official commendation honoring M/s Shresthanshi Construction &amp; Suppliers for driving household rooftop solar transitions across Bhawanipatna, Narla, Dharmagarh, and rural habitations.
              </p>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                District Renewable Energy Cell Gazette
              </span>
            </Card>
          </div>
        </Container>
      </section>

      {/* 7. COMPANY ACTIVITIES & FIELD VIDEOS */}
      <section id="events-summits" className="section bg-soft-green" style={{ paddingTop: '4.5rem', paddingBottom: '5rem' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div>
              <span className="badge" style={{ marginBottom: '0.65rem' }}>
                <Video size={14} style={{ marginRight: '0.35rem' }} />
                On-Ground Actions
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-forest-green)', fontWeight: 800, margin: 0 }}>
                Company Activities, Events &amp; Field Videos
              </h2>
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>
              Live recordings from solar sites across Odisha.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {videoMedia.map((video) => (
              <Card
                key={video.id}
                variant="white"
                padding="none"
                hoverable
                onClick={() => setSelectedMedia(video)}
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', backgroundColor: '#0B2419' }}>
                  <img
                    src={video.thumbnailUrl || '/images/solar/solar-site-assessment.jpg'}
                    alt={video.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(23,75,53,0.92)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Play size={24} style={{ marginLeft: '3px' }} />
                  </div>
                  <span style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.75)', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                    {video.badge}
                  </span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.45rem' }}>
                    {video.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, margin: 0 }}>
                    {video.description}
                  </p>
                </div>
              </Card>
            ))}

            {summitMedia.map((summit) => (
              <Card
                key={summit.id}
                variant="white"
                padding="none"
                hoverable
                onClick={() => setSelectedMedia(summit)}
                style={{
                  borderRadius: '16px',
                  border: '1.5px solid var(--border-medium)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', backgroundColor: '#0B2419' }}>
                  <img
                    src={summit.fileUrl}
                    alt={summit.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(23,75,53,0.92)', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '999px' }}>
                    {summit.badge}
                  </span>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-forest-green)' }}>
                    <Maximize2 size={15} />
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '0.45rem' }}>
                    {summit.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, margin: 0 }}>
                    {summit.description}
                  </p>
                  <div style={{ paddingTop: '0.75rem', marginTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>{summit.location}</span>
                    <span>{summit.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership & Founder Profile */}
      <section className="section bg-white">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Founder &amp; Proprietor Profile" />
          <Card variant="soft-green" padding="lg" className="founder-profile-card">
            <div className="founder-profile-card__grid">
              <div className="founder-profile-card__photo-col">
                <div className="founder-profile-card__img-wrap">
                  <img
                    src={companyConfig.founder.imageSrc}
                    alt={companyConfig.founder.name}
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
                  />
                </div>
                <div className="founder-profile-card__meta">
                  <h3>{companyConfig.founder.name}</h3>
                  <p className="founder-profile-card__role">{companyConfig.founder.role}</p>
                  <p className="founder-profile-card__subrole">{companyConfig.founder.additionalRole}</p>
                  <div className="founder-profile-card__loc">
                    <MapPin size={15} />
                    <span>{companyConfig.founder.hometown}</span>
                  </div>
                </div>
              </div>

              <div className="founder-profile-card__bio-col">
                <span className="badge" style={{ marginBottom: '0.85rem' }}>
                  Leadership Profile
                </span>
                <h2>Committed to Kalahandi, Bhubaneswar &amp; Odisha</h2>
                {companyConfig.founder.bioParagraphs.map((para, i) => (
                  <p key={i} style={{ marginTop: '0.75rem' }}>
                    {para}
                  </p>
                ))}

                <div className="founder-profile-card__education">
                  <h4>
                    <GraduationCap size={18} /> Academic Background &amp; Specialization
                  </h4>
                  <ul className="feature-list" style={{ marginTop: '0.65rem' }}>
                    {companyConfig.founder.education.map((edu) => (
                      <li key={edu} className="feature-list-item">
                        <span className="feature-list-icon">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Lightbox Modal for Media Viewing */}
      {selectedMedia && (
        <Modal
          isOpen={Boolean(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          maxWidth="840px"
          titleId="media-modal-title"
          className="award-lightbox-modal"
        >
          <div className="award-modal-content">
            <div className="award-modal-media">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.fileUrl}
                  controls
                  autoPlay
                  style={{ width: '100%', maxHeight: '52vh', borderRadius: '12px' }}
                />
              ) : (
                <img
                  src={selectedMedia.fileUrl}
                  alt={selectedMedia.title}
                  className="award-modal-img"
                />
              )}
              <span className="award-modal-badge">{selectedMedia.badge}</span>
            </div>

            <div className="award-modal-info">
              <div className="award-modal-meta-row">
                {selectedMedia.verifiedBy && (
                  <span className="award-modal-authority">
                    <ShieldCheck size={16} />
                    <strong>{selectedMedia.verifiedBy}</strong>
                  </span>
                )}
                {selectedMedia.location && (
                  <span className="award-modal-pill">
                    <MapPin size={14} /> {selectedMedia.location}
                  </span>
                )}
                {selectedMedia.date && (
                  <span className="award-modal-pill">
                    <Calendar size={14} /> {selectedMedia.date}
                  </span>
                )}
              </div>

              <h2 id="media-modal-title" className="award-modal-title">
                {selectedMedia.title}
              </h2>

              <p className="award-modal-desc">{selectedMedia.description}</p>

              <div className="award-modal-actions">
                {selectedMedia.type !== 'video' && (
                  <a
                    href={selectedMedia.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-btn ui-btn--primary ui-btn--md"
                  >
                    <ExternalLink size={16} />
                    <span>Open High-Resolution Document</span>
                  </a>
                )}
                <button
                  type="button"
                  className="ui-btn ui-btn--outline ui-btn--md"
                  onClick={() => setSelectedMedia(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Bottom CTA */}
      <CTASection
        headline="Speak With an Odisha Solar Team You Can Verify."
        supportingCopy="Connect with our team at our Kalahandi Head Office (Sargiguda, Narla Road) or our Bhubaneswar sub-branch office."
        prefillTopic="About Us Page Enquiry"
      />
    </div>
  );
};
