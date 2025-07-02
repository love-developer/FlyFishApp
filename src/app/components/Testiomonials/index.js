"use client";

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const testimonials = [
  {
    name: 'Rezina Mogal',
    location: 'Germany',
    date: '12.03.2024',
    rating: 5,
    text: 'Had an amazing time! The staff was super friendly, and the experience was beyond thrilling. The views were stunning, and everything was well!',
    image: './Profiles.png'
  },
  {
    name: 'Mohamed Razek',
    location: 'Germany',
    date: '12.02.2025',
    rating: 5,
    text: 'This was hands down one of the best experiences we’ve had on the water! The team was friendly.',
    image: './Profiles.png'
  },
  {
    name: 'Rezina Mogal',
    location: 'Germany',
    date: '12.03.2024',
    rating: 5,
    text: 'Absolutely thrilling experience! The jet ski ride was incredible, and the team ensured top-notch safety. Can’t wait to come back!',
    image: './Profiles.png'
  },
  {
    name: 'User 4',
    location: 'Germany',
    date: '12.03.2024',
    rating: 5,
    text: 'Fantastic service and thrilling moments. Highly recommend!',
    image: './Profiles.png'
  },
  {
    name: 'User 5',
    location: 'Germany',
    date: '12.03.2024',
    rating: 5,
    text: 'Safe, fun, and memorable. Great value for money!',
    image: './Profiles.png'
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 1000) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      (prev - itemsPerSlide + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      (prev + itemsPerSlide) % testimonials.length
    );
  };

  const getCurrentItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      items.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <div className="container testimonial-section py-5">
      <h3 className="text-center mb-3">Testimonials</h3>
      <p className="text-center mb-5">Read what our customers say about our company and services.</p>

      <div className={`testimonial-slider slide-animation items-${itemsPerSlide}`}>
        {getCurrentItems().map((testimonial, index) => (
          <div key={index} className="testimonial-card fade-in">
            <div className="card p-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5>{testimonial.name}</h5>
                  <p className="text-muted">{testimonial.location}</p>
                </div>
                <p className="text-muted">{testimonial.date}</p>
              </div>
              <div className="mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pagination-container mt-4">
        <button onClick={handlePrev} className="arrow-btn mx-2"><FaAngleLeft /></button>
        <button onClick={handleNext} className="arrow-btn mx-2"><FaAngleRight /></button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
