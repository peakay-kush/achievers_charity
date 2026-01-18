import DonationMethods from '../../components/DonationMethods';

export const metadata = {
    title: 'Donate - Achievers Charity Group',
    description: 'Your generosity changes lives',
};

export default function DonatePage() {
    return (
        <main>
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-overlay"></div>
                <div className="container">
                    <h1 className="page-title">Donate</h1>
                    <p className="page-subtitle">Your generosity changes lives</p>
                </div>
            </section>

            {/* Donation Appeal Section */}
            <section className="donate-appeal">
                <div className="container">
                    <div className="appeal-content">
                        <h2>Why Your Support Matters</h2>
                        <p>Every donation to Achievers Charity Group directly impacts the lives of children and families in need. Your generosity helps us provide essential support, bring hope to children&apos;s homes, and restore dignity to the less privileged in our communities.</p>

                        <div className="impact-grid">
                            <div className="impact-item">
                                <div className="impact-icon"><i className="fas fa-utensils"></i></div>
                                <h3>Food & Nutrition</h3>
                                <p>Providing nutritious meals to children and families</p>
                            </div>

                            <div className="impact-item">
                                <div className="impact-icon"><i className="fas fa-tshirt"></i></div>
                                <h3>Clothing & Essentials</h3>
                                <p>Supplying clothing and basic necessities</p>
                            </div>

                            <div className="impact-item">
                                <div className="impact-icon"><i className="fas fa-home"></i></div>
                                <h3>Children&apos;s Homes</h3>
                                <p>Supporting orphanages and care facilities</p>
                            </div>

                            <div className="impact-item">
                                <div className="impact-icon"><i className="fas fa-hand-holding-heart"></i></div>
                                <h3>Community Programs</h3>
                                <p>Funding outreach and support initiatives</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation Methods Section */}
            <section className="donation-methods">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How to Donate</h2>
                        <div className="title-underline"></div>
                        <p className="section-subtitle">Choose your preferred donation method</p>
                    </div>

                    <DonationMethods />
                </div>
            </section>

            {/* Transparency Section */}
            <section className="transparency-section">
                <div className="container">
                    <div className="transparency-content">
                        <div className="transparency-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h2>Our Commitment to Transparency</h2>
                        <p>We are committed to using your donations responsibly and effectively. Every contribution directly supports our programs and the communities we serve. We maintain full transparency in our operations and are happy to provide updates on how your donations make a difference.</p>
                        <div className="transparency-points">
                            <div className="point">
                                <i className="fas fa-check"></i>
                                <span>100% of donations go directly to programs</span>
                            </div>
                            <div className="point">
                                <i className="fas fa-check"></i>
                                <span>Regular updates on fund utilization</span>
                            </div>
                            <div className="point">
                                <i className="fas fa-check"></i>
                                <span>Accountable and ethical practices</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Thank You Section */}
            <section className="thank-you-section">
                <div className="container">
                    <div className="thank-you-content">
                        <i className="fas fa-heart"></i>
                        <h2>Thank You for Your Generosity</h2>
                        <p>Your support brings hope and transforms lives. Together, we can create lasting change in our communities.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
