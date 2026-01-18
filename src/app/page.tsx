import HeroSlider from '../components/HeroSlider';
import Link from 'next/link';
import homepageData from '../data/homepage.json';
import featuredData from '../data/featured.json';

interface FeaturedItem {
  id: number;
  caption: string;
  photo: string;
  order: number;
}

export default function Home() {
  const { mission } = homepageData;
  const featured = (featuredData as FeaturedItem[]).sort((a, b) => a.order - b.order);

  return (
    <main>
      <HeroSlider />

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
            <div className="title-underline"></div>
          </div>
          <p className="mission-text">{mission}</p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Do</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">Making a difference through compassionate action</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-child"></i>
              </div>
              <h3>Children&apos;s Homes Visits</h3>
              <p>We regularly visit children&apos;s homes to provide love, support, and essential resources to orphaned and vulnerable children.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Community Outreach</h3>
              <p>Supporting community members with food, clothing, and other necessities while fostering hope and resilience.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Supporting the Less Privileged</h3>
              <p>Restoring dignity and providing compassionate assistance to those facing hardship and poverty in our communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featured.length > 0 && (
        <section className="leadership-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured</h2>
              <div className="title-underline"></div>
              <p className="section-subtitle">Moments from our journey</p>
            </div>

            <div className="leaders-grid">
              {featured.map(item => {
                const imgSrc = item.photo.startsWith('http') || item.photo.startsWith('/') ? item.photo : `/${item.photo}`;
                return (
                  <div key={item.id} className="leader-card">
                    <div className="leader-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgSrc} alt={item.caption || 'Featured photo'} loading="lazy" />
                    </div>
                    {item.caption && (
                      <div className="leader-info">
                        <p className="leader-role" style={{ textAlign: 'center', marginTop: '0.5rem' }}>{item.caption}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Your Support Changes Lives</h2>
          <p>Every contribution brings hope and dignity to those who need it most</p>
          <div className="cta-buttons">
            <Link href="/donate" className="btn-primary">Donate Now</Link>
            <Link href="/about" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
