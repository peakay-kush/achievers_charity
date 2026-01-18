"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import linksData from '../data/links.json';

// Define the type for links
interface LinkItem {
    id: number;
    title: string;
    url: string;
    type: string;
    active: boolean;
}

export default function Footer() {
    const pathname = usePathname();
    const links = linksData as LinkItem[];

    if (pathname.startsWith('/admin')) return null;

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        {/* About Section */}
                        <div className="footer-section">
                            <h3>About Achievers Charity</h3>
                            <p>We are dedicated to bringing hope, dignity, and support to children and community members through compassionate humanitarian outreach.</p>
                            <div className="social-links">
                                {links.filter(link => link.type === 'social' && link.active).map(link => {
                                    let icon = 'fas fa-link';
                                    const titleLower = link.title.toLowerCase();
                                    if (titleLower.includes('facebook')) icon = 'fab fa-facebook-f';
                                    else if (titleLower.includes('twitter')) icon = 'fab fa-twitter';
                                    else if (titleLower.includes('instagram')) icon = 'fab fa-instagram';
                                    else if (titleLower.includes('linkedin')) icon = 'fab fa-linkedin-in';

                                    return (
                                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
                                            <i className={icon}></i>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/gallery">Gallery</Link></li>
                                <li><Link href="/donate">Donate</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-section">
                            <h3>Contact Us</h3>
                            <ul className="footer-contact">
                                <li><i className="fas fa-envelope"></i> achieverscharitygroup@gmail.com</li>
                                <li><i className="fas fa-phone"></i> +254112961056</li>
                                <li><i className="fas fa-map-marker-alt"></i> Limuru, Kenya</li>
                            </ul>
                        </div>

                        {/* Newsletter - mimicking original */}
                        <div className="footer-section">
                            <h3>Stay Connected</h3>
                            <p>Join our mission to make a difference in the lives of children and communities.</p>
                            <Link href="/donate" className="btn-footer-cta">Support Our Cause</Link>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Achievers Charity Group. All rights reserved.</p>
                        <p>Made and maintained by PK Automations</p>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button - Implemented via separate component or inline here if needed. 
          For now, skipping JS behavior, just layout. But we can add it. */}
        </>
    );
}
