"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import sliderData from '../data/slider.json';

interface Slide {
    id: number;
    image: string;
    heading: string;
    description: string;
    active: boolean;
    order: number;
}

export default function HeroSlider() {
    // Filter active slides and sort
    // Filter active slides and sort
    const slides: Slide[] = (sliderData as Slide[])
        .filter(s => s.active !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        // Clear existing interval
        if (autoplayRef.current) clearInterval(autoplayRef.current);

        if (slides.length > 1 && !isHovered) {
            autoplayRef.current = setInterval(nextSlide, 5000);
        }

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHovered, slides.length]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const threshold = 50;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    if (slides.length === 0) return null;

    const getImgSrc = (image: string) => {
        if (!image) return '';
        if (image.startsWith('http')) return image;
        if (image.startsWith('/')) return image;
        return `/${image}`;
    };

    return (
        <section
            className="hero-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div key={slide.id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                        <div className="slide-image" style={{ backgroundImage: `url('${getImgSrc(slide.image)}')` }}>
                            <div className="slide-overlay"></div>
                        </div>
                        <div className="slide-content">
                            <div className="container">
                                <h1 className="slide-heading fade-in">{slide.heading}</h1>
                                <p className="slide-description fade-in">{slide.description}</p>
                                <Link href="/donate" className="btn-primary fade-in">Make a Difference</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {slides.length > 1 && (
                <>
                    <button className="slider-control prev" aria-label="Previous slide" onClick={prevSlide}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="slider-control next" aria-label="Next slide" onClick={nextSlide}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
