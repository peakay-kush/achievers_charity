"use client";
import React, { useState, useEffect } from 'react';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

export default function ManageGallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchGallery();
    }, []);

    /* Helper function to get correct image source */
    const getImgSrc = (image: string) => {
        if (!image) return '/assets/images/placeholder.jpg';
        if (image.startsWith('http')) return image;
        if (image.startsWith('/')) return image;
        return `/${image}`;
    };

    const fetchGallery = async () => {
        try {
            const res = await fetch('/api/admin/gallery');
            const data = await res.json();
            setItems(data);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to load gallery' });
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(id);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('directory', 'gallery');

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                handleUpdateItem(id, 'image', data.path);
                setMessage({ type: 'success', text: 'Image uploaded successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Upload failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Upload error' });
        } finally {
            setUploading(null);
        }
    };

    const handleUpdateItem = (id: number, field: keyof GalleryItem, value: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/admin/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Gallery updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save changes' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    const addItem = () => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([{ id: newId, title: 'New Image', category: 'Events', image: '/assets/images/gallery/placeholder.jpg' }, ...items]);
    };

    const deleteItem = (id: number) => {
        if (confirm('Are you sure you want to delete this gallery item?')) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    if (loading) return <div>Loading Gallery...</div>;

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Gallery</h2>
                <p>Add and remove photos from the website gallery</p>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    <i className={`fas fa-${message.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
                    <span>{message.text}</span>
                </div>
            )}

            <div style={{ marginBottom: '20px' }}>
                <button className="btn-admin-primary" onClick={addItem}>
                    <i className="fas fa-plus"></i> Add New Image
                </button>
            </div>

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Image URL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div style={{ position: 'relative', width: '80px', height: '60px' }}>
                                        <img
                                            src={getImgSrc(item.image)}
                                            alt={item.title}
                                            className="table-image"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { (e.target as any).src = '/assets/images/placeholder.jpg'; }}
                                        />
                                        {uploading === item.id && (
                                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <i className="fas fa-spinner fa-spin" style={{ color: 'white' }}></i>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', cursor: 'pointer', display: 'block' }}>
                                            <i className="fas fa-camera"></i> Change
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, item.id)}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={item.category}
                                        onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                                    >
                                        <option value="Events">Events</option>
                                        <option value="Donations">Donations</option>
                                        <option value="Outreach">Outreach</option>
                                        <option value="Community">Community</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={item.image}
                                        onChange={(e) => handleUpdateItem(item.id, 'image', e.target.value)}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn-action"
                                        style={{ background: '#FFF5F5', color: '#DC143C', border: '1px solid #DC143C' }}
                                        onClick={() => deleteItem(item.id)}
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
                    {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Gallery Changes</>}
                </button>
            </div>
        </div>
    );
}
