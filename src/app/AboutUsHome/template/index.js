"use client";

import styles from './styles.module.css';
import NavBar from '../../components/NavBar/index.js';
import FlyFishFooter from '../../components/FlyFishFooter/index.js';
import AppDownload from '../../components/AppDownload/index.js';

const AboutUsHome = () => {

  return (

    <section className={styles.individualActivities}>
      <section className={styles.hero}>
        <NavBar translucent />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>ABOUT</h1>
        </div>
      </section>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionHeaderTitle}>ABOUT US</p>
        <p>Welcome to FlyFish, UAE’s premier water sports adventure company! We specialize in thrilling ocean experiences, from Jet Ski rides and Parasailing to Fly boarding, Kayaking, and Banana Boat rides. Located in the heart of Dubai, we cater to adrenaline seekers and families alike, ensuring safe, unforgettable moments on the water. Our professional instructors and high-quality equipment guarantee an exceptional experience. Whether you are looking for high-speed excitement or a relaxing ocean escape, FlyFish has something for everyone. Join us for an adventure of a lifetime and make unforgettable memories on Dubai’s stunning coastline. Your adventure starts here!</p>
      </div>

      {/* CEO/Founder Message Card */}
      <div className={styles.ceoMessageCard}>
        <img
          src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80"
          alt="CEO/Founder"
          className={styles.ceoImage}
        />
        <div className={styles.ceoTextBlock}>
          <p className={styles.ceoTitle}><b>Message from the CEO/Founder</b></p>
          <p className={styles.ceoText}>
            At FlyFish, our passion for the ocean drives everything we do. We started this journey with a vision to create the ultimate watersports experience in Dubai, blending adventure, safety, and top-tier service. Every ride, every wave, and every smile from our guests fuel our commitment to excellence. Whether you are seeking an adrenaline rush or a peaceful escape on the water, we are here to make it unforgettable. Thank you for choosing FlyFish—we look forward to creating amazing memories with you!
          </p>
          <p className={styles.ceoSignature}><b>[Owners Name]</b><br />Founder, FlyFish Adventures</p>
        </div>

      </div>
      <AppDownload />
    </section>

  );
};

export default AboutUsHome;