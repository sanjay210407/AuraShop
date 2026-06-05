import React from "react";

export function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-body">
        <div className="skeleton-line title pulse"></div>
        <div className="skeleton-line rating pulse"></div>
        <div className="skeleton-row">
          <div className="skeleton-line price pulse"></div>
          <div className="skeleton-circle button pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="skeleton-details">
      <div className="skeleton-details-image pulse"></div>
      <div className="skeleton-details-content">
        <div className="skeleton-line breadcrumb pulse"></div>
        <div className="skeleton-line main-title pulse"></div>
        <div className="skeleton-line stars pulse"></div>
        <div className="skeleton-line main-price pulse"></div>
        <div className="skeleton-line desc-paragraph pulse"></div>
        <div className="skeleton-line desc-paragraph pulse"></div>
        <div className="skeleton-row buttons">
          <div className="skeleton-line full-btn pulse"></div>
          <div className="skeleton-circle fav-btn pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="skeleton-home">
      <div className="skeleton-banner pulse"></div>
      <div className="skeleton-section-title pulse"></div>
      <div className="skeleton-categories-row">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-category-pill pulse"></div>
        ))}
      </div>
      <ProductGridSkeleton count={4} />
    </div>
  );
}

export default function SkeletonLoader({ type, count }) {
  switch (type) {
    case "card":
      return <CardSkeleton />;
    case "grid":
      return <ProductGridSkeleton count={count} />;
    case "details":
      return <ProductDetailsSkeleton />;
    case "home":
      return <HomeSkeleton />;
    default:
      return <CardSkeleton />;
  }
}
