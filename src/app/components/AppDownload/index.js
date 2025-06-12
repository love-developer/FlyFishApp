import React from 'react';
import './styles.module.css';

const AppDownload = () => {
  return (
    <section className={`${styles.appDownload} container-fluid`}>
    <div className="row w-100">
      <div className="col-md-6 d-flex flex-column justify-content-center">
        <div className={styles.appText}>
          <h2>Book Watersports<br /> Anytime, Anywhere!</h2>
          <p>Make your next beach day unforgettable. Select from a range of watersports, confirm your booking, and get ready for an adventure!</p>
          <div className={styles.appButtons}>
            <a href="#"><img src="/play.png" alt="Google Play" /></a>
            <a href="#"><img src="/app.png" alt="App Store" /></a>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center position-relative">
        <div className={styles.appImage}>
          <img src="/mockup_1.png" alt="App Mockup" className={styles.appImageOne} />
          <img src="/mockup_2.png" alt="App Mockup" className={styles.appImageTwo} />
        </div>
      </div>
    </div>
  </section>

  );
};

export default AppDownload;