"use client";
import { useState } from 'react';
import galleryData from '../data/gallery.json';

// Helper functions
const convertGoogleDriveLink = (url: string) => {
    if (url.includes('drive.google.com/uc?')) return url;
    if (url.includes('/folders/')) {
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Cpath fill="%234285f4" d="M100 80h80l20 20h100c11 0 20 9 20 20v100c0 11-9 20-20 20H100c-11 0-20-9-20-20V100c0-11 9-20 20-20z"/%3E%3Ctext x="50%25" y="75%25" text-anchor="middle" fill="%23666" font-family="Arial" font-size="14" font-weight="bold"%3EClick to view album%3C/text%3E%3C/svg%3E';
    }
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
    // Fallback for non-drive links or errors
    if (!url.includes('drive.google.com')) return url;

    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16"%3EInvalid Google Drive link%3C/text%3E%3C/svg%3E';
}

const isGoogleDriveFolder = (url: string) => url.includes('/folders/');

interface GalleryItem {
    id: number;
    image: string;
    title: string;
    date: string;
}

export default function GalleryViewer() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [currentCaption, setCurrentCaption] = useState<string>('');

    // Sort logic
    const sortedData = [...(galleryData as GalleryItem[])].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const openLightbox = (image: string, title: string) => {
        setCurrentImage(image);
        setCurrentCaption(title);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="gallery-grid">
                {sortedData.map(photo => {
                    const imageUrl = convertGoogleDriveLink(photo.image);
                    const isFolder = isGoogleDriveFolder(photo.image);
                    const displayTitle = photo.title;
                    const displayDate = new Date(photo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                    return (
                        <div
                            key={photo.id}
                            className="gallery-item"
                            onClick={() => {
                                if (isFolder) window.open(photo.image, '_blank');
                                else openLightbox(imageUrl, displayTitle);
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageUrl} alt={displayTitle} loading="lazy" />
                            <div className="gallery-overlay">
                                <div className="gallery-info">
                                    <h3>{displayTitle}</h3>
                                    <p>{displayDate}</p>
                                </div>
                                {isFolder ? (
                                    <button className="gallery-view-btn" aria-label="View album">
                                        <i className="fas fa-folder-open"></i>
                                    </button>
                                ) : (
                                    <button className="gallery-view-btn" aria-label="View image">
                                        <i className="fas fa-search-plus"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox - Simple implementation */}
            {lightboxOpen && (
                <div className="lightbox" id="lightbox" style={{ display: 'flex' }}>
                    <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>&times;</button>
                    <div className="lightbox-content">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={currentImage} alt={currentCaption} id="lightboxImage" />
                        <div className="lightbox-caption">{currentCaption}</div>
                    </div>
                </div>
            )}
        </>
    );
}
