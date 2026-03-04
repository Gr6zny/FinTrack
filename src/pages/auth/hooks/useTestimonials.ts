// hooks/useTestimonials.ts
import { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "../constants/auth.constants";

export const useTestimonials = (autoPlayInterval: number = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }, []);

  return {
    testimonials: TESTIMONIALS,
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};
