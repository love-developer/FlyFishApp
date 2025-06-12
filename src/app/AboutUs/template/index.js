"use client";

import  styles from './styles.module.css';
import "@fortawesome/fontawesome-svg-core/styles.css";

const AboutUs = ({ title, onClick }) => {
  return (
    <div className={styles.flyfishContainer}>
    <img src="/logo.png" alt="FlyFish Logo" className={styles.flyfishLogo}/>

    <p className={ styles.flyfishdescription}>
      FlyFish is your ultimate destination for water sports and beachside adventures. From high-speed jet skiing to tranquil kayaking, we offer safe, guided experiences tailored for thrill-seekers and relaxation lovers alike. With top-notch equipment, expert instructors, and affordable packages, FlyFish ensures unforgettable memories for travelers and adventurers of all ages.
    </p>
    <div className={styles.socialIcons}>
  <a href="#" className={styles.socialIcon}>
    <img src="/fb.png" alt="Facebook" />
  </a>
  <a href="#" className={styles.socialIcon}>
    <img src="/insta.png" alt="Instagram" />
  </a>
  <a href="#" className={styles.socialIcon}>
    <img src="/tiktok.png" alt="WhatsApp" />
  </a>
  <a href="#" className={styles.socialIcon}>
    <img src="/tiktok.png" alt="TikTok" />
  </a>
  <a href="#" className={styles.socialIcon}>
    <img src="/snap.png" alt="Snapchat" />
  </a>
</div>

    <p className={styles.call}>Join us and dive into your next adventure!</p>
    <button className={styles.book}>Book Activities</button>
  </div>
  )
};

export default AboutUs;

