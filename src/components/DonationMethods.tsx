"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function DonationMethods() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    return (
        <>
            <div className="methods-grid">
                {/* M-Pesa */}
                <div className="method-card">
                    <div className="method-icon mpesa-color">
                        <i className="fas fa-mobile-alt"></i>
                    </div>
                    <h3>M-Pesa</h3>
                    <div className="method-details">
                        <p><strong>Send Money to:</strong> 0705896158</p>
                        <p><strong>Name:</strong> Samuel Ndegwa</p>
                        <p className="method-note">For Kenya-based donors</p>
                    </div>
                    <button className="btn-method" onClick={() => copyToClipboard('0705896158')}>Copy Phone Number</button>
                </div>

                {/* Bank Transfer */}
                <div className="method-card">
                    <div className="method-icon bank-color">
                        <i className="fas fa-university"></i>
                    </div>
                    <h3>Bank Transfer</h3>
                    <div className="method-details">
                        <p><strong>Bank:</strong> coming soon</p>
                    </div>
                    <button className="btn-method" onClick={() => copyToClipboard('1234567890')}>Copy Account</button>
                </div>

                {/* Direct Contact */}
                <div className="method-card">
                    <div className="method-icon contact-color">
                        <i className="fas fa-phone-alt"></i>
                    </div>
                    <h3>Contact Us</h3>
                    <div className="method-details">
                        <p><strong>Phone:</strong> 0112961056</p>
                        <p><strong>Email:</strong> achieverscharitygroup@gmail.com</p>
                        <p className="method-note">For other donation arrangements</p>
                    </div>
                    <Link href="/contact" className="btn-method">Get in Touch</Link>
                </div>
            </div>

            {/* Notification Toast */}
            <div className={`toast ${copied ? 'show' : ''}`} id="copyToast" style={{ display: copied ? 'flex' : 'none', opacity: copied ? 1 : 0, top: '20px', right: '20px', position: 'fixed', zIndex: 9999 }}>
                <i className="fas fa-check-circle"></i>
                <span>Copied to clipboard!</span>
            </div>
        </>
    );
}
