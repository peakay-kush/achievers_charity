"use client";
import React, { useState, useEffect } from 'react';
import ImageUploadWithCrop from '@/components/admin/ImageUploadWithCrop';

interface Slide {
    id: number;
    image: string;
    heading: string;
    description: string;
    active?: boolean;
    order?: number;
}

export default function ManageSlider() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSlides();
    }, []);

    /* Helper function to get correct image source */
    const getImgSrc = (image: string) => {
        if (!image) return '/assets/images/placeholder.jpg';
        if (image.startsWith('http')) return image;
        if (image.startsWith('/')) return image;
        return `/${image}`;
    };

    const fetchSlides = async () => {
        try {
            const res = await fetch('/api/admin/slider');
            const data = await res.json();
            setSlides(data);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to load slides' });
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
        formData.append('directory', 'slider');

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                handleUpdateSlide(id, 'image', data.path);
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

    const handleUpdateSlide = (id: number, field: keyof Slide, value: string) => {
        setSlides(prev => prev.map(slide =>
            slide.id === id ? { ...slide, [field]: value } : slide
        ));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            const res = await fetch('/api/admin/slider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slides),
            });
            if (res.ok) {
                setMessage({ type: 'success', text: 'Slider updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save changes' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    const addSlide = () => {
        const newId = slides.length > 0 ? Math.max(...slides.map(s => s.id)) + 1 : 1;
        setSlides([...slides, {
            id: newId,
            image: '/assets/images/placeholder.jpg',
            heading: 'New Heading',
            description: 'New Description',
            active: true,
            order: slides.length + 1
        }]);
    };

    const deleteSlide = (id: number) => {
        if (confirm('Are you sure you want to delete this slide?')) {
            setSlides(slides.filter(s => s.id !== id));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Manage Hero Slider</h2>
                <p>Update images and text for the main homepage banner</p>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    <i className={`fas fa-${message.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
                    <span>{message.text}</span>
                </div>
            )}

            <div className="slider-management-list">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="admin-form" style={{ background: '#F8F9FA', padding: '25px', borderRadius: '15px', marginBottom: '25px', position: 'relative', border: '1.5px solid #E2E8F0' }}>
                        <div style={{ position: 'absolute', top: '-12px', left: '20px', background: '#FF5A1F', color: 'white', padding: '2px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
                            Slide #{index + 1}
                        </div>
                        <button
                            onClick={() => deleteSlide(slide.id)}
                            style={{ position: 'absolute', top: '15px', right: '15px', background: '#FFF5F5', color: '#DC143C', border: '1.5px solid #DC143C', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Delete Slide"
                        >
                            <i className="fas fa-trash-alt" style={{ fontSize: '0.9rem' }}></i>
                        </button>

                        <div style={{ marginBottom: '20px' }}>
                            <img
                                src={getImgSrc(slide.image)}
                                alt="Slide Preview"
                                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }}
                                onError={(e) => { (e.target as any).src = '/assets/images/placeholder.jpg'; }}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Heading</label>
                                <input
                                    type="text"
                                    value={slide.heading}
                                    onChange={(e) => handleUpdateSlide(slide.id, 'heading', e.target.value)}
                                />
                            </div>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <label>Image</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexDirection: 'column' }}>
                                    <input
                                        type="text"
                                        value={slide.image}
                                        onChange={(e) => handleUpdateSlide(slide.id, 'image', e.target.value)}
                                        style={{ width: '100%' }}
                                        placeholder="Image URL or Upload path"
                                    />
                                    <label className="btn-admin-primary" style={{ padding: '8px 15px', fontSize: '0.9rem', cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                        <i className="fas fa-camera"></i>
                                        Upload Slide Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, slide.id)}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                    {uploading === slide.id && <span style={{ fontSize: '0.8rem', color: '#FF5A1F' }}>Uploading...</span>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label>Description</label>
                            <textarea
                                rows={2}
                                value={slide.description}
                                onChange={(e) => handleUpdateSlide(slide.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button className="btn-admin-primary" style={{ background: '#2D3748' }} onClick={addSlide}>
                    <i className="fas fa-plus"></i> Add New Slide
                </button>
                <button className="btn-admin-primary" onClick={handleSave} disabled={saving}>
                    {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-save"></i> Save Changes</>}
                </button>
            </div>
        </div>
    );
}
