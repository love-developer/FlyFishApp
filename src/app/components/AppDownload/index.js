import React from 'react';
import styles from './styles.module.css';

const AppDownload = () => {
  return (
    <section className={styles.appDownloadSection}>
      <div className={styles.appDownloadContent}>
        <div className={styles.appDownloadText}>
          <p className={styles.appDownloadTitle}>Book Watersports<br />Anytime, Anywhere!</p>
          <p className={styles.appDownloadDesc}>
            Make your next beach day unforgettable. Select from a<br />
            range of watersports, confirm your booking, and get ready<br />
            for an adventure!
          </p>
          <div className={styles.appDownloadButtons}>
            <a href="#" className={styles.storeBtn}>
              <img src="/play.png" alt="Get it on Google Play" height="48" />
            </a>
            <a href="#" className={styles.storeBtn}>
              <img src="/app.png" alt="Download on the App Store" height="48" />
            </a>
          </div>
        </div>
        <div className={styles.appDownloadMockups}>
          <img src="/mockup_2.png" alt="App Mockup 2" className={styles.mockupImg2} />
          <img src="/mockup_1.png" alt="App Mockup 1" className={styles.mockupImg1} />

        </div>
      </div>
    </section>
  );
};

export default AppDownload;