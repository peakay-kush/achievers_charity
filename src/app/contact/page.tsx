import Link from 'next/link';
import ContactForm from '../../components/ContactForm';
import linksData from '../../data/links.json';

export const metadata = {
    title: 'Contact Us - Achievers Charity Group',
    description: 'We\'d love to hear from you',
};

interface LinkItem {
    id: number;
    title: string;
    url: string;
    type: string;
    active: boolean;
}

export default function ContactPage() {
    const links = linksData as LinkItem[];

    return (
        <main>
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-overlay"></div>
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-subtitle">We&apos;d love to hear from you</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-wrapper">
                        {/* Contact Form */}
                        <ContactForm />

                        {/* Contact Information */}
                        <div className="contact-info-container">
                            <h2>Get in Touch</h2>
                            <p>Have questions or want to learn more about our work? Reach out to us through any of the following channels:</p>

                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3>Our Location</h3>
                                        <p>Limuru, Kenya<br />P.O. Box 136-00217</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3>Phone</h3>
                                        <p>+254 112961056<br />+254 740262117</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3>Email</h3>
                                        <p>
                                            <a href="mailto:achieverscharitygroup@gmail.com" className="contact-link">achieverscharitygroup@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div className="contact-info-text">
                                        <h3>Office Hours</h3>
                                        <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 10:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="social-outreach-section">
                <div className="container">
                    <div className="contact-social">
                        <h3>Follow Us</h3>
                        <div className="social-links-contact">
                            <a href="https://chat.whatsapp.com/H7Y3XeECSNVBCwIEnGzjFT" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                            {links.filter(link => link.type === 'social' && link.active).map(link => {
                                let icon = 'fas fa-link';
                                const titleLower = link.title.toLowerCase();
                                if (titleLower.includes('facebook')) icon = 'fab fa-facebook-f';
                                else if (titleLower.includes('twitter')) icon = 'fab fa-twitter';
                                else if (titleLower.includes('instagram')) icon = 'fab fa-instagram';
                                else if (titleLower.includes('linkedin')) icon = 'fab fa-linkedin-in';

                                return (
                                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}><i className={icon}></i></a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <h2>Find Us on the Map</h2>
                </div>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036287034!2d36.70730744999999!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1234567890"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Achievers Charity Group Location">
                    </iframe>
                </div>
            </section>
        </main>
    );
}
