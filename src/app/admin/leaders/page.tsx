"use client";
import React, { useState, useEffect } from 'react';

interface Leader {
    id: number;
    name: string;
    role: string;
    photo: string | null;
    order?: number;
}

export default function ManageLeaders() {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const PLACEHOLDER_PATH = '/assets/images/logo.png';

    useEffect(() => {
        fetchLeaders();
    }, []);

    const fetchLeaders = async () => {
        try {
            const res = await fetch('/api/admin/leaders');
            const data = await res.json();
            // Sort by order initially
            setLeaders(data.sort((a: any, b: any) => (a.order || 99) - (b.order || 99)));
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to load leadership data' });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateLeader = (id: number, field: keyof Leader, value: any) => {
        setLeaders(prev => prev.map(leader =>
            leader.id === id ? { ...leader, [field]: value } : leader
        ));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(id);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('directory', 'leaders');

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                handleUpdateLeader(id, 'photo', data.path);
                setMessage({ type: 'success', text: 'Image uploaded successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Upload failed: ' + data.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Upload error' });
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/admin/leaders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leaders),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Leadership data updated successfully!' });
            } else {
                const errData = await res.json();
                setMessage({ type: 'error', text: 'Failed to save changes: ' + (errData.message || '') });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    const addLeader = () => {
        const newId = leaders.length > 0 ? Math.max(...leaders.map(l => l.id)) + 1 : 1;
        setLeaders([...leaders, {
            id: newId,
            name: 'New Leader',
            role: 'Role Name',
            photo: PLACEHOLDER_PATH,
            order: leaders.length + 1
        }]);
    };

    const deleteLeader = (id: number) => {
        if (confirm('Are you sure you want to delete this leader?')) {
            setLeaders(leaders.filter(l => l.id !== id));
        }
    };

    /* Helper function to get correct image source */
    const getImgSrc = (photo: string | null) => {
        if (!photo) return PLACEHOLDER_PATH;
        if (photo.startsWith('http')) return photo;
        if (photo.startsWith('/')) return photo;
        return `/${photo}`;
    };

    if (loading) return <div className="admin-loading" style={{ padding: '50px', textAlign: 'center' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#FF5A1F' }}></i>
        <p style={{ marginTop: '10px' }}>Loading Leadership...</p>
    </div>;

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Leadership</h2>
                <p>Add and manage team members and organizers</p>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`} style={{ marginBottom: '25px' }}>
                    <i className={`fas fa-${message.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
                    <span>{message.text}</span>
                </div>
            )}

            <div style={{ marginBottom: '30px' }}>
                <button className="btn-admin-primary" onClick={addLeader}>
                    <i className="fas fa-user-plus"></i> Add New Leader
                </button>
            </div>

            <div className="leaders-management-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                {leaders.map((leader) => (
                    <div key={leader.id} className="admin-form" style={{ background: '#FFFFFF', padding: '25px', borderRadius: '15px', border: '1.5px solid #E2E8F0', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                        <button
                            onClick={() => deleteLeader(leader.id)}
                            style={{ position: 'absolute', top: '15px', right: '15px', background: '#FFF5F5', border: 'none', color: '#DC143C', cursor: 'pointer', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Delete Leader"
                        >
                            <i className="fas fa-trash-alt" style={{ fontSize: '0.9rem' }}></i>
                        </button>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
                                <img
                                    src={getImgSrc(leader.photo)}
                                    alt={leader.name}
                                    style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover', border: '3px solid #F1F5F9' }}
                                    onError={(e) => { (e.target as any).src = PLACEHOLDER_PATH; }}
                                />
                                {uploading === leader.id && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fas fa-spinner fa-spin" style={{ color: '#FF5A1F', fontSize: '1.2rem' }}></i>
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ marginBottom: '5px' }}>
                                    <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Change Photo</label>
                                    <label className="btn-admin-primary" style={{ padding: '8px 12px', fontSize: '0.75rem', cursor: 'pointer', margin: '5px 0 0 0', display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
                                        <i className="fas fa-camera"></i> Upload
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, leader.id)}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={leader.name}
                                onChange={(e) => handleUpdateLeader(leader.id, 'name', e.target.value)}
                                style={{ fontWeight: '600' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label>Position / Role</label>
                            <input
                                type="text"
                                placeholder="e.g. Chairman"
                                value={leader.role}
                                onChange={(e) => handleUpdateLeader(leader.id, 'role', e.target.value)}
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label>Sort Priority (Lower first)</label>
                            <input
                                type="number"
                                value={leader.order || 99}
                                onChange={(e) => handleUpdateLeader(leader.id, 'order', parseInt(e.target.value))}
                                style={{ width: '100px' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '50px', borderTop: '1.5px solid #E2E8F0', paddingTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-admin-primary" onClick={handleSave} disabled={saving} style={{ padding: '12px 30px', fontSize: '1rem' }}>
                    {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving Changes...</> : <><i className="fas fa-save"></i> Save All Updates</>}
                </button>
            </div>
        </div>
    );
}
