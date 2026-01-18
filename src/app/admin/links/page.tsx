"use client";
import React, { useState, useEffect } from 'react';

interface LinkItem {
    id: number;
    title: string;
    url: string;
    type: string;
    active: boolean;
}

export default function ManageLinks() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch('/api/admin/links');
            const data = await res.json();
            setLinks(data);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to load links' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateLink = (id: number, field: keyof LinkItem, value: any) => {
        setLinks(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/admin/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(links),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Links updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save changes' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    const addLink = () => {
        const newId = links.length > 0 ? Math.max(...links.map(l => l.id)) + 1 : 1;
        setLinks([...links, {
            id: newId,
            title: 'New Social Link',
            url: 'https://',
            type: 'social',
            active: true
        }]);
    };

    const deleteLink = (id: number) => {
        if (confirm('Are you sure you want to delete this link?')) {
            setLinks(links.filter(l => l.id !== id));
        }
    };

    if (loading) return <div>Loading Links...</div>;

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Social Links</h2>
                <p>Update social media profiles and other external links</p>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    <i className={`fas fa-${message.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
                    <span>{message.text}</span>
                </div>
            )}

            <div style={{ marginBottom: '20px' }}>
                <button className="btn-admin-primary" onClick={addLink}>
                    <i className="fas fa-plus"></i> Add New Link
                </button>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Platform / Title</th>
                            <th>URL</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map(link => (
                            <tr key={link.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={link.title}
                                        onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={link.type}
                                        onChange={(e) => handleUpdateLink(link.id, 'type', e.target.value)}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                                    >
                                        <option value="social">Social Media</option>
                                        <option value="donation">Donation</option>
                                        <option value="other">Other</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="form-group-checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={link.active}
                                                onChange={(e) => handleUpdateLink(link.id, 'active', e.target.checked)}
                                            />
                                            {link.active ? <span className="badge badge-success">Active</span> : <span className="badge badge-inactive">Inactive</span>}
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn-action btn-delete"
                                        onClick={() => deleteLink(link.id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '30px' }}>
                <button className="btn-admin-primary" onClick={handleSave} disabled={saving}>
                    {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Links</>}
                </button>
            </div>
        </div>
    );
}
