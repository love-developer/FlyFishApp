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
    <footer className={styles.container}>
      <section className={styles.subscribeSection}>
        <h2 className={styles.subscribe}>Subscribe Now</h2>
        <h4 className={styles.getLatest}>To Get The Latest News About Us</h4>
        <form onSubmit={handleSubmit} className={styles.subscribeForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input    
            type="email"
            className={styles.input}
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.subscribeBtn}>Subscribe</button>
        </form>
      </section>
      <div className={styles.footerColumns}>
        <div className={styles.footerCol}>
          <img src="/logo.png" alt="FlyFish Logo" width="110" height="35" />
          <p className={styles.aboutDesc}>
            At FlyWish, we bring the thrill of watersports to life! We offer unforgettable beachside adventures for thrill-seekers and ocean lovers. Dive into excitement, ride the waves, and make lasting memories with us!
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}><img src="/fb.png" alt="Facebook" /></a>
            <a href="#" className={styles.socialIcon}><img src="/insta.png" alt="Instagram" /></a>
            <a href="#" className={styles.socialIcon}><img src="/tiktok.png" alt="Tiktok" /></a>
          </div>
        </div>
        <div className={styles.footerCol}>
          <h5 className={styles.footerTitle}>Links</h5>
          <ul className={styles.footerLinks}>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Offers</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policies</a></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h5 className={styles.footerTitle}>Help</h5>
          <ul className={styles.footerLinks}>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h5 className={styles.footerTitle}>Contact Us</h5>
          <ul className={styles.footerContact}>
            <li><img src="/phone-f.png" alt="Phone" className={styles.contactIcon}/> +971234561234</li>
            <li><img src="/email-f.png" alt="Email" className={styles.contactIcon}/> hr.admin@flyfish.com</li>
            <li><img src="/location-f.png" alt="Location" className={styles.contactIcon}/> No:02, Pullman Marjan Island, Dubai, UAE</li>
            <li><img src="/web-f.png" alt="Website" className={styles.contactIcon}/> www.flyfish.ae</li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        Copyright 2025 FlyFish | All Rights Reserved
      </div>
    </footer>
  );
};

export default FlyFishFooter;