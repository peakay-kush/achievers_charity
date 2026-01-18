"use client";
import React, { useState } from 'react';

export default function AdminSettings() {
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.new !== passwordData.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/admin/settings/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.current,
                    newPassword: passwordData.new
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully!' });
                setPasswordData({ current: '', new: '', confirm: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to update password' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="admin-section">
                <div className="section-header">
                    <h2>Admin Settings</h2>
                    <p>Manage your account settings</p>
                </div>

                {message.text && (
                    <div className={`alert alert-${message.type}`}>
                        <i className={`fas fa-${message.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
                        <span>{message.text}</span>
                    </div>
                )}

                <form className="admin-form" onSubmit={handlePasswordChange} style={{ maxWidth: '600px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#2C3E50', marginBottom: '15px' }}>
                        <i className="fas fa-lock" style={{ marginRight: '10px', color: '#FF5A1F' }}></i>
                        Change Password
                    </h3>

                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            value={passwordData.current}
                            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                value={passwordData.new}
                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordData.confirm}
                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <button type="submit" className="btn-admin-primary" disabled={saving}>
                            {saving ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
