"use client";
import React, { useState, useEffect } from 'react';
import ImageUploadWithCrop from '@/components/admin/ImageUploadWithCrop';

interface FeaturedItem {
    id: number;
    caption: string;
    photo: string;
    order: number;
}

export default function ManageFeatured() {
    const [items, setItems] = useState<FeaturedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchFeatured();
    }, []);

    const fetchFeatured = async () => {
        try {
            const res = await fetch('/api/admin/featured');
            const data = await res.json();
            setItems(data.sort((a: any, b: any) => a.order - b.order));
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to load featured data' });
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
        formData.append('directory', 'featured');

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                handleUpdateItem(id, 'photo', data.path);
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

    /* Helper function to get correct image source */
    const getImgSrc = (image: string) => {
        if (!image) return '/assets/images/placeholder.jpg';
        if (image.startsWith('http')) return image;
        if (image.startsWith('/')) return image;
        return `/${image}`;
    };

    const handleUpdateItem = (id: number, field: keyof FeaturedItem, value: any) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/admin/featured', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Featured images updated successfully!' });
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
        setItems([...items, {
            id: newId,
            caption: '',
            photo: '/assets/images/placeholder.jpg',
            order: items.length + 1
        }]);
    };

    const deleteItem = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Featured Images</h2>
                <p>Update specialized feature images for the homepage</p>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {items.map((item) => (
                    <div key={item.id} className="admin-form" style={{ background: '#FFFFFF', padding: '20px', borderRadius: '15px', border: '1.5px solid #E2E8F0', position: 'relative' }}>
                        <button
                            onClick={() => deleteItem(item.id)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: '#FFF5F5', color: '#DC143C', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Delete"
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>

                        <div style={{ marginBottom: '15px' }}>
                            <img
                                src={getImgSrc(item.photo)}
                                alt="Preview"
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                onError={(e) => { (e.target as any).src = '/assets/images/placeholder.jpg'; }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                            <label className="btn-admin-primary" style={{ padding: '8px 15px', fontSize: '0.9rem', cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                <i className="fas fa-camera"></i>
                                Change Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, item.id)}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            {uploading === item.id && <span style={{ marginLeft: '10px', color: '#FF5A1F', fontSize: '0.9rem' }}>Uploading...</span>}
                        </div>

                        <div className="form-group">
                            <label>Caption (Optional)</label>
                            <input
                                type="text"
                                value={item.caption}
                                onChange={(e) => handleUpdateItem(item.id, 'caption', e.target.value)}
                            />
                        </div>

                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label>Order</label>
                            <input
                                type="number"
                                value={item.order}
                                onChange={(e) => handleUpdateItem(item.id, 'order', parseInt(e.target.value))}
                                style={{ width: '80px' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px' }}>
                <button className="btn-admin-primary" onClick={handleSave} disabled={saving}>
                    {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Changes</>}
                </button>
            </div>
        </div>
    );
}
