"use client";

import React, { useEffect, useRef, useState } from "react";

type GalleryItem = {
  id: string;
  content: React.ReactNode;
  caption?: string;
};

interface GalleryProps {
  items: GalleryItem[];
  mode?: "standard" | "overflow" | "carousel" | "grid";
  gridColumns?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showCaptions?: boolean;
  showNavigation?: boolean;
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({
  items,
  mode = "standard",
  gridColumns = 3,
  autoplay = false,
  autoplaySpeed = 3000,
  showCaptions = true,
  showNavigation = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoplay || isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, items.length, isHovering]);

  useEffect(() => {
    if (
      (mode === "overflow" || mode === "carousel") &&
      scrollContainerRef.current
    ) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / items.length;
      container.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, mode, items.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const renderNavigation = () => {
    if (!showNavigation) return null;

    return (
      <div className="flex justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-4 z-10">
        <button
          onClick={handlePrev}
          className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
          aria-label="Next"
        >
          →
        </button>
      </div>
    );
  };

  const renderDots = () => {
    if (!showNavigation || mode === "grid") return null;

    return (
      <div className="flex justify-center mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full mx-1 ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  const renderCaption = (item: GalleryItem) => {
    if (!showCaptions || !item.caption) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
        {item.caption}
      </div>
    );
  };

  // Different gallery rendering based on mode
  const renderGallery = () => {
    switch (mode) {
      case "overflow":
        return (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {items.map((item, index) => (
              <div
                key={item.id ? item.id : index}
                className="flex-shrink-0 w-full snap-center relative"
              >
                <div className="h-full flex items-center justify-center p-4">
                  {item.content}
                </div>
                {renderCaption(item)}
              </div>
            ))}
          </div>
        );

      case "carousel":
        return (
          <div
            ref={scrollContainerRef}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out">
                {items.map((item, index) => (
                  <div
                    key={item.id ? item.id : index}
                    className="flex-shrink-0 w-full relative"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    <div className="h-full flex items-center justify-center p-4">
                      {item.content}
                    </div>
                    {renderCaption(item)}
                  </div>
                ))}
              </div>
            </div>
            {renderNavigation()}
          </div>
        );

      case "grid":
        return (
          <div
            className={`grid gap-4`}
            style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="relative">
                <div className="h-full">{item.content}</div>
                {renderCaption(item)}
              </div>
            ))}
          </div>
        );

      case "standard":
      default:
        return (
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`relative transition-opacity duration-300 ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="h-full flex items-center justify-center">
                  {item.content}
                </div>
                {renderCaption(item)}
              </div>
            ))}
            {renderNavigation()}
          </div>
        );
    }
  };

  return (
    <div className={`gallery-container ${className}`}>
      {renderGallery()}
      {renderDots()}
    </div>
  );
};

export default Gallery;
