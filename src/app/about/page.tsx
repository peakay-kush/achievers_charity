import Link from 'next/link';
import homepageData from '../../data/homepage.json';
import leadersData from '../../data/leaders.json';

export const metadata = {
    title: 'About Us - Achievers Charity Group',
};

interface Leader {
    id: number;
    name: string;
    role: string;
    photo: string;
    order: number;
}

export default function About() {
    const { mission, vision } = homepageData;
    const leaders = (leadersData as Leader[]).sort((a, b) => a.order - b.order);

    return (
        <main>
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-overlay"></div>
                <div className="container">
                    <h1 className="page-title">About Us</h1>
                    <p className="page-subtitle">Learn about our journey and commitment to humanity</p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="content-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Story</h2>
                        <div className="title-underline"></div>
                    </div>

                    <div className="story-content">
                        <p>Achievers Charity Group was founded with a simple yet powerful vision: to bring hope, dignity, and tangible support to those who need it most in our communities. What started as a small group of compassionate individuals has grown into a dedicated organization touching hundreds of lives.</p>

                        <p>We believe that every child deserves love and care, every community member deserves support, and every person facing hardship deserves to be treated with dignity and respect. These values guide everything we do.</p>

                        <p>Our work focuses on visiting children&apos;s homes, supporting community members, and helping the less privileged. Through consistent outreach, compassionate action, and unwavering commitment, we strive to make a lasting difference in the lives of those we serve.</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-vision-section">
                <div className="container">
                    <div className="mv-grid">
                        <div className="mv-card">
                            <div className="mv-icon"><i className="fas fa-bullseye"></i></div>
                            <h3>Our Mission</h3>
                            <p>{mission}</p>
                        </div>

                        <div className="mv-card">
                            <div className="mv-icon"><i className="fas fa-eye"></i></div>
                            <h3>Our Vision</h3>
                            <p>{vision}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Core Values</h2>
                        <div className="title-underline"></div>
                    </div>

                    <div className="values-grid">
                        {[
                            { icon: 'fas fa-heart', title: 'Compassion', desc: 'We approach every individual with empathy, understanding, and genuine care.' },
                            { icon: 'fas fa-shield-alt', title: 'Dignity', desc: 'We honor the inherent worth of every person, treating all with respect.' },
                            { icon: 'fas fa-hand-holding-heart', title: 'Service', desc: 'We are committed to selfless action that creates meaningful change.' },
                            { icon: 'fas fa-balance-scale', title: 'Transparency', desc: 'We operate with honesty and accountability in all our activities.' },
                            { icon: 'fas fa-users', title: 'Community', desc: 'We believe in the power of collective action and unity.' },
                            { icon: 'fas fa-lightbulb', title: 'Hope', desc: 'We inspire hope and possibility in the lives we touch.' }
                        ].map((val, idx) => (
                            <div key={idx} className="value-card">
                                <div className="value-icon"><i className={val.icon}></i></div>
                                <h3>{val.title}</h3>
                                <p>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="leadership-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Leadership</h2>
                        <div className="title-underline"></div>
                        <p className="section-subtitle">Dedicated individuals guiding our mission</p>
                    </div>

                    <div className="leaders-grid">
                        {leaders.map(leader => {
                            const imgSrc = leader.photo
                                ? (leader.photo.startsWith('http') || leader.photo.startsWith('/') ? leader.photo : `/${leader.photo}`)
                                : '/assets/images/logo.png';

                            return (
                                <div key={leader.id} className="leader-card">
                                    <div className="leader-image">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imgSrc} alt={leader.name} loading="lazy" />
                                    </div>
                                    <div className="leader-info">
                                        <h3 className="leader-name">{leader.name}</h3>
                                        <p className="leader-role">{leader.role}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="container">
                    <h2>Join Us in Making a Difference</h2>
                    <p>Your support helps us continue our mission of compassion and service</p>
                    <div className="cta-buttons">
                        <Link href="/donate" className="btn-primary">Support Our Work</Link>
                        <Link href="/contact" className="btn-secondary">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
