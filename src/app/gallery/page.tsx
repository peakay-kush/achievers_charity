import GalleryViewer from '../../components/GalleryViewer';

export const metadata = {
    title: 'Gallery - Achievers Charity Group',
    description: 'Moments of hope, compassion, and community',
};

export default function GalleryPage() {
    return (
        <main>
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-overlay"></div>
                <div className="container">
                    <h1 className="page-title">Gallery</h1>
                    <p className="page-subtitle">Moments of hope, compassion, and community</p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="container">
                    <GalleryViewer />
                </div>
            </section>
        </main>
    );
}
