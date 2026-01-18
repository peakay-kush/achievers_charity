"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarActive, setSidebarActive] = useState(false);

    // Don't show admin layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/admin/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/admin/login');
            }
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const NavLink = ({ href, children, icon, activeClassName = 'active' }: any) => {
        const isActive = pathname === href;
        return (
            <Link href={href} className={isActive ? activeClassName : ''} onClick={() => setSidebarActive(false)}>
                <i className={icon}></i> {children}
            </Link>
        );
    };

    return (
        <div className="admin-container">
            {/* Admin Sidebar */}
            <aside className={`admin-sidebar ${sidebarActive ? 'active' : ''}`}>
                <div className="admin-logo">
                    <i className="fas fa-hand-holding-heart"></i>
                    <span>Achievers Admin</span>
                </div>
                <nav className="admin-nav">
                    <NavLink href="/admin" icon="fas fa-th-large">Dashboard</NavLink>
                    <NavLink href="/admin/slider" icon="fas fa-images">Hero Slider</NavLink>
                    <NavLink href="/admin/gallery" icon="fas fa-photo-video">Gallery</NavLink>
                    <NavLink href="/admin/leaders" icon="fas fa-users">Leadership</NavLink>
                    <NavLink href="/admin/featured" icon="fas fa-star">Featured</NavLink>
                    <NavLink href="/admin/links" icon="fas fa-link">Social Links</NavLink>
                    <NavLink href="/admin/settings" icon="fas fa-cog">Settings</NavLink>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="logout-link">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </a>
                </nav>
            </aside>

            {/* Admin Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button className="menu-toggle-admin" onClick={toggleSidebar} style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#2C3E50' }}>
                            <i className="fas fa-bars"></i>
                        </button>
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className="admin-user">
                        <span>Welcome, Admin</span>
                        <i className="fas fa-user-circle"></i>
                    </div>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </main>

            <style jsx>{`
                @media (max-width: 968px) {
                    .menu-toggle-admin {
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
}
