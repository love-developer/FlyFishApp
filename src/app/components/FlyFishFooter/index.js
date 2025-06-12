"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';

const FlyFishFooter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', { name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className={`${styles.container} py-5`}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <h2 className={`${styles.subscribe} mb-3"`}>Subscribe Now</h2>
          <h4 className={`${styles.getLatest} mb-4`}>To Get The Latest News About Us</h4>
          <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row justify-content-center gap-2">
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control mb-2 mb-md-0"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-dark">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="row mt-5 text-center justify-content-center align-items-space-between">
        <div className="col-12 col-md-4 text-center text-md-start">
          <img src="/logo.png" alt="FlyFish Logo" width="110" height="35" />
          <p className={styles.description}>
            At FlyWish, we bring the thrill of watersports to life! We offer unforgettable beachside adventures for thrill-seekers and ocean lovers. Dive into excitement, ride the waves, and make lasting memories with us!
          </p>
          <div>
            <a href="#" className="me-2"><span role="img" aria-label="facebook">🌐</span></a>
            <a href="#" className="me-2"><span role="img" aria-label="twitter">🐦</span></a>
            <a href="#" className="me-2"><span role="img" aria-label="instagram">📷</span></a>
          </div>
        </div>
        <div className="col-12 col-md-4 text-start">
          <h5>Links</h5>
          <p><a href="#" className={styles.description}>Blogs</a></p>
          <p><a href="#" className={styles.description}>Our Activities</a></p>
          <p><a href="#" className={styles.description}>Offers</a></p>
          <p><a href="#" className={styles.description}>Contact Us</a></p>
          <p><a href="#" className={styles.description}>Testimonials</a></p>
        </div>
    
        <div className="col-12 col-md-4 text-start">
          <h5>Contact Us</h5>
          <p><span role="img" aria-label="phone" className={styles.description}>📞</span> +971234561234</p>
          <p><span role="img" aria-label="email" className={styles.description}>📧</span> hr.admin@flyfish.com</p>
          <p><span role="img" aria-label="location" className={styles.description}>📍</span> No.02, Pullman Marian Island, Dubai, UAE</p>
          <p><span role="img" aria-label="website" className={styles.description}>🌐</span> www.flyfish.ae</p>
        </div>
      </div>
      {/* <div className="text-center mt-4">
        <p className={styles.description}>Copyright 2025 FlyFish | All Rights Reserved</p>
      </div> */}
    </div>
  );
};

export default FlyFishFooter;