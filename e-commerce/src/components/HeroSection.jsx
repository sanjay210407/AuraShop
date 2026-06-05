import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Define Your Living Space",
    subtitle: "ARTISAN COLLECTION",
    description: "Curated stoneware, intelligent workspace lighting, and ergonomic seating for the modern sanctuary.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop&q=80",
    theme: "light",
    cta: "Explore Home",
    category: "Home & Living"
  },
  {
    id: 2,
    title: "Unrivaled Audio Isolation",
    subtitle: "SONICESCAPE HEADPHONES",
    description: "Neutralize ambient noise and immerse yourself in studio-grade acoustic clarity. Free shipping included.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1600&auto=format&fit=crop&q=80",
    theme: "dark",
    cta: "Shop Electronics",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Sustainability In Motion",
    subtitle: "ECO-FRIENDLY FITNESS",
    description: "100% biodegradable natural cork yoga mats, double-insulated flasks, and latex bands for active living.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&auto=format&fit=crop&q=80",
    theme: "dark",
    cta: "View Fitness",
    category: "Fitness & Outdoors"
  }
];

export default function HeroSection({ setCurrentTab, setSearchQuery }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleCtaClick = (category) => {
    if (setSearchQuery) {
      setSearchQuery(""); // Clear searches
    }
    setCurrentTab("products");
  };

  return (
    <div className="hero-slider">
      {/* Slider Controls */}
      <button className="slider-control prev" onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={24} />
      </button>
      <button className="slider-control next" onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={24} />
      </button>

      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`hero-slide ${isActive ? "active" : ""} slide-theme-${slide.theme}`}
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${slide.image})` }}
          >
            <div className="hero-slide-content">
              <span className="hero-subtitle">
                <Sparkles size={14} className="subtitle-icon" />
                {slide.subtitle}
              </span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              <button className="hero-cta-button" onClick={() => handleCtaClick(slide.category)}>
                <span>{slide.cta}</span>
                <ArrowRight size={18} className="cta-icon" />
              </button>
            </div>
          </div>
        );
      })}

      {/* Slide Indicators */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
