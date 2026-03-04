// components/BrandColumn/BrandColumn.tsx
import React from "react";
import s from "./BrandColumn.module.css";
import type { Testimonial } from "../../types/auth.types";

interface BrandColumnProps {
  testimonials: Testimonial[];
  currentSlide: number;
  onDotClick: (index: number) => void;
}

export const BrandColumn: React.FC<BrandColumnProps> = ({
  testimonials,
  currentSlide,
  onDotClick,
}) => {
  return (
    <div className={s.brandColumn}>
      <div className={s.brandContent}>
        <a href="/" className={s.logo}>
          <i className="fas fa-chart-line"></i>
          <span>FinTrack</span>
        </a>

        <h1 className={s.brandTitle}>Управляйте своими финансами эффективно</h1>

        <p className={s.brandDescription}>
          Присоединяйтесь к более чем 50 000 пользователей, которые уже
          контролируют свои финансы с FinTrack
        </p>

        {/* Карусель отзывов */}
        <div className={s.testimonialCarousel}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${s.testimonial} ${index === currentSlide ? s.active : ""}`}
            >
              <div className={s.stars}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className={s.testimonialText}>"{testimonial.text}"</p>
              <div className={s.testimonialAuthor}>
                <img src={testimonial.avatar} alt={testimonial.author} />
                <div>
                  <strong>{testimonial.author}</strong>
                  <span>Пользователь {testimonial.years}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Индикаторы слайдов */}
          <div className={s.carouselDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${s.dot} ${index === currentSlide ? s.active : ""}`}
                onClick={() => onDotClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className={s.stats}>
          <div className={s.statItem}>
            <span className={s.statNumber}>50K+</span>
            <span className={s.statLabel}>пользователей</span>
          </div>
          <div className={s.statDivider}></div>
          <div className={s.statItem}>
            <span className={s.statNumber}>2.5B₽</span>
            <span className={s.statLabel}>под контролем</span>
          </div>
          <div className={s.statDivider}></div>
          <div className={s.statItem}>
            <span className={s.statNumber}>4.8</span>
            <span className={s.statLabel}>рейтинг</span>
          </div>
        </div>
      </div>
    </div>
  );
};
