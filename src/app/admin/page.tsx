"use client";
import React from 'react';
import Link from 'next/link';
import sliderData from '../../data/slider.json';
import galleryData from '../../data/gallery.json';
import leadersData from '../../data/leaders.json';

export default function AdminDashboard() {
    // Quick stats from JSON data
    const sliderCount = sliderData.length;

    const galleryCount = galleryData.length;
    const leadersCount = leadersData.length;

    return (
        <div>
            {/* Dashboard Stats */}
            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon slider-icon">
                        <i className="fas fa-images"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{sliderCount}</h3>
                        <p>Hero Slides</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon gallery-icon">
                        <i className="fas fa-photo-video"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{galleryCount}</h3>
                        <p>Gallery Items</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon partners-icon" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{leadersCount}</h3>
                        <p>Leaders</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-section">
                <div className="section-header">
                    <h2>Quick Actions</h2>
                    <p>Commonly used management tools</p>
                </div>
                <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <Link href="/admin/slider" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <i className="fas fa-images" style={{ fontSize: '2rem', color: '#FF5A1F', marginBottom: '10px', display: 'block' }}></i>
                            <h4 style={{ margin: 0 }}>Update Slider</h4>
                        </div>
                    </Link>
                    <Link href="/admin/gallery" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <i className="fas fa-photo-video" style={{ fontSize: '2rem', color: '#4A90E2', marginBottom: '10px', display: 'block' }}></i>
                            <h4 style={{ margin: 0 }}>Gallery</h4>
                        </div>
                    </Link>
                    <Link href="/admin/leaders" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <i className="fas fa-users" style={{ fontSize: '2rem', color: '#28A745', marginBottom: '10px', display: 'block' }}></i>
                            <h4 style={{ margin: 0 }}>Leaders</h4>
                        </div>
                    </Link>
                    <Link href="/admin/links" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <i className="fas fa-link" style={{ fontSize: '2rem', color: '#667eea', marginBottom: '10px', display: 'block' }}></i>
                            <h4 style={{ margin: 0 }}>Social Links</h4>
                        </div>
                    </Link>
                    <Link href="/admin/featured" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <i className="fas fa-star" style={{ fontSize: '2rem', color: '#FFD700', marginBottom: '10px', display: 'block' }}></i>
                            <h4 style={{ margin: 0 }}>Featured</h4>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Site Info */}
            <div className="admin-section">
                <div className="section-header">
                    <h2>System Information</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <div className="info-card" style={{ background: '#F8F9FA', padding: '20px', borderRadius: '10px' }}>
                        <h4>Configuration</h4>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                            <li style={{ marginBottom: '10px' }}><strong>Frontend:</strong> Next.js 15+</li>
                            <li style={{ marginBottom: '10px' }}><strong>Storage:</strong> JSON Files</li>
                            <li style={{ marginBottom: '10px' }}><strong>Auth:</strong> JWT & HTTP-Only Cookies</li>
                        </ul>
                    </div>
                    <div className="info-card" style={{ background: '#F8F9FA', padding: '20px', borderRadius: '10px' }}>
                        <h4>Help & Support</h4>
                        <p style={{ fontSize: '0.9rem', color: '#5D6D7E', marginTop: '10px' }}>
                            For any technical issues or feature requests, contact PK Automations.
                        </p>
                        <a href="mailto:info@pkautomations.com" style={{ color: '#FF5A1F', fontWeight: '600', textDecoration: 'none', display: 'block', marginTop: '10px' }}>
                            Get Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
