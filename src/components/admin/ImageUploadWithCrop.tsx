"use client";
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';

interface ImageUploadWithCropProps {
    onUploadComplete: (path: string) => void;
    directory: string;
    aspectRatio?: number;
    buttonLabel?: string;
    existingImage?: string;
}

export default function ImageUploadWithCrop({ onUploadComplete, directory, aspectRatio = 16 / 9, buttonLabel = "Upload Image", existingImage }: ImageUploadWithCropProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [processing, setProcessing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result?.toString() || null);
                setIsModalOpen(true);
                setZoom(1); // Reset zoom
            });
            reader.readAsDataURL(file);
        }
    };

    const handleSaveCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setProcessing(true);
        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

            // Create a File from Blob
            const file = new File([croppedImageBlob], `cropped-${Date.now()}.jpg`, { type: 'image/jpeg' });

            // Upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('directory', directory);

            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                onUploadComplete(data.path);
                setIsModalOpen(false);
                setImageSrc(null);
            } else {
                alert('Upload failed: ' + data.message);
            }
        } catch (e) {
            console.error(e);
            alert('Something went wrong');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label className="btn-admin-primary" style={{ padding: '8px 15px', fontSize: '0.9rem', cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <i className="fas fa-camera"></i>
                    {buttonLabel}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
                {imageSrc && !isModalOpen && <span style={{ fontSize: '0.8rem', color: 'green' }}>Ready</span>}
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <h3 style={{ color: 'white', marginBottom: '10px', zIndex: 10000 }}>Crop Image</h3>
                    <div style={{ position: 'relative', width: '90%', height: '60%', background: '#333', borderRadius: '8px', overflow: 'hidden' }}>
                        <Cropper
                            image={imageSrc || ''}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            showGrid={true}
                        />
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '20px', width: '90%', maxWidth: '400px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                            <i className="fas fa-search-minus"></i>
                            <input
                                type="range"
                                min={0.5}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                style={{ flex: 1 }}
                            />
                            <i className="fas fa-search-plus"></i>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    background: '#718096',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCrop}
                                disabled={processing}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    background: '#FF5A1F',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {processing && <i className="fas fa-spinner fa-spin"></i>}
                                Save & Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
