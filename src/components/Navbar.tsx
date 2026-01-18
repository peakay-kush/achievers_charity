"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo.png" alt="Achievers Charity" className="logo-image" />
            </Link>
          </div>

          {/* Priority links visible on mobile */}
          <div className="mobile-priority-nav">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
            <Link href="/donate" className={pathname === '/donate' ? 'active' : ''}>Donate</Link>
          </div>

          <button
            className={`menu-toggle ${isOpen ? 'active' : ''}`}
            id="menuToggle"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isOpen ? 'active' : ''}`} id="navMenu">
            <li className="desktop-link"><Link href="/" className={pathname === '/' ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</Link></li>
            <li className="desktop-link"><Link href="/about" className={pathname === '/about' ? 'active' : ''} onClick={() => setIsOpen(false)}>About Us</Link></li>
            <li><Link href="/gallery" className={pathname === '/gallery' ? 'active' : ''} onClick={() => setIsOpen(false)}>Gallery</Link></li>
            <li className="desktop-link"><Link href="/donate" className={pathname === '/donate' ? 'active' : ''} onClick={() => setIsOpen(false)}>Donate</Link></li>
            <li><Link href="/contact" className={pathname === '/contact' ? 'active' : ''} onClick={() => setIsOpen(false)}>Contact Us</Link></li>
            <li><Link href="/donate" className="btn-donate-nav" onClick={() => setIsOpen(false)}>Donate Now</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
