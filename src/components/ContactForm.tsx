"use client";
import { useState, FormEvent } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Oops! There was a problem submitting your form");
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage("Oops! There was a problem submitting your form");
            setStatus('error');
        }
    };


    return (
        <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            {status !== 'success' ? (
                <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input type="text" id="name" name="name" required placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Your Email *</label>
                        <input type="email" id="email" name="email" required placeholder="john@example.com" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="+254 700 000 000" />
                    </div>

                    {/* Honeypot field */}
                    <div style={{ position: 'absolute', left: '-9999px' }}>
                        <label htmlFor="website">Website</label>
                        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <input type="text" id="subject" name="subject" required placeholder="How can we help you?" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Your Message *</label>
                        <textarea id="message" name="message" rows={6} required placeholder="Tell us more about your inquiry..."></textarea>
                    </div>

                    {status === 'error' && (
                        <p style={{ color: '#DC143C', marginBottom: '15px', fontWeight: '500' }}>{errorMessage}</p>
                    )}

                    <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? (
                            <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                        ) : (
                            <><i className="fas fa-paper-plane"></i> Send Message</>
                        )}
                    </button>
                </form>
            ) : (
                <div className="form-success" id="formSuccess" style={{ display: 'block' }}>
                    <i className="fas fa-check-circle"></i>
                    <p>Thank you for your message! We&apos;ll get back to you soon.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="btn-secondary"
                        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '0.9rem' }}
                    >
                        Send another message
                    </button>
                </div>
            )}
        </div>
    );
}

