import Head from 'next/head';
import styles from './styles.module.css';
import "../../globals.css";
import FlyFishFooter from '../../components/FlyFishFooter';
// import AppDownload from '@/app/components/AppDownload';
import FaqItem from '../../components/FaqItem';
import TestimonialSlider from '../../components/Testiomonials';


// export default function Home() {
//   return (
//     <div className={styles.container}>

//       {/* Header */}


//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <Navbar />
//         <h1>Experience the Ocean Like Never Before!</h1>
//         <p>Whether you’re racing across the waves or floating above the sea, we guarantee an unforgettable experience. The ocean is calling – are you ready?</p>
//         <div className={styles.heroButtons}>
//           <button className={styles.primaryButton}>Book Activities</button>
//           <button className={styles.secondaryButton}>Learn More</button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className={styles.features}>
//         <div className={styles.feature}>
//           <span>✔️</span>
//           <h3>Safety First</h3>
//           <p>Highly trained instructors, strict protocols, and expert supervision always.</p>
//         </div>
//         <div className={styles.feature}>
//           <span>👥</span>
//           <h3>Trusted by Many</h3>
//           <p>Thousands of happy customers have enjoyed our adventures.</p>
//         </div>
//         <div className={styles.feature}>
//           <span>🎓</span>
//           <h3>Trained Professionals</h3>
//           <p>Certified with safe, secure, and professional training.</p>
//         </div>
//       </section>

//       {/* Explore FlyFish Adventures */}
//       <section className={styles.heroSection}>
//   <div className="container">
//     <div className="row align-items-center">
      
//       {/* Left: Images */}
//       <div className="col-md-6 d-flex justify-content-center">
//         <div className={styles.imageGroup}>
//           <img src="/a1.png" alt="Jet Ski" className={styles.image1} />
//           <img src="/a2.png" alt="Kayak" className={styles.image2} />
//         </div>
//       </div>

//       {/* Right: Text */}
//       <div className="col-md-6">
//         <div className={styles.textContent}>
//           <h2>
//             From High-Speed Thrills To Peaceful Paddles,<br />
//             FlyFish Brings You The Best Watersports Under The Sun!
//           </h2>
//           <p>
//             FlyFish Offers Heart-Pounding Water Adventures, From High-Speed Jet Skiing
//             To Breathtaking Parasailing. Whether You Crave Excitement Or A Fun Ride On
//             The Waves, We Bring You The Best Ocean Experiences. Get Ready To Splash,
//             Soar, And Make Unforgettable Memories!
//           </p>
//           <button className={styles.ctaButton}>
//             <img src="/icon-book.svg" alt="book" />
//             Book An Activity
//           </button>
//         </div>
//       </div>

//     </div>
//   </div>
// </section>


//       {/* Limited Time Offer */}
//       <section className={styles.offer}>
//         <h2>Limited Time Festival Offer!</h2>
//         <p>Enjoy Exclusive 25% off on this Activity</p>
//         <div className={styles.countdown}>
//           <div><span>04</span>Days</div>
//           <div><span>14</span>Hours</div>
//           <div><span>23</span>Minutes</div>
//           <div><span>09</span>Seconds</div>
//         </div>
//         <button className={styles.primaryButton}>Book Now</button>
//       </section>

//       {/* Blogs Section */}
//       <section className={styles.blogs}>
//         <h2>Blogs</h2>
//         <p>Discover Expert Tips, Inspiring Stories, and the Latest Trends!</p>
//         <div className={styles.blogGrid}>
//           {[...Array(5)].map((_, index) => (
//             <div key={index} className={styles.blogCard}>
//               <img src="/activity.png" alt="Google Play" />
//               <h3>5 Reasons Why Watersports Are A Must-Try For Tourists!</h3>
//               <p>Exploring the beach is fun, but nothing compares to the thrill of watersports...</p>
//               <a href="#" className={styles.blogLink}>Read blog →</a>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* App Download Section */}
      
//   <section className={`${styles.appDownload} container-fluid`}>
//   <div className="row w-100">
//     <div className="col-md-6 d-flex flex-column justify-content-center">
//       <div className={styles.appText}>
//         <h2>Book Watersports<br /> Anytime, Anywhere!</h2>
//         <p>Make your next beach day unforgettable. Select from a range of watersports, confirm your booking, and get ready for an adventure!</p>
//         <div className={styles.appButtons}>
//           <a href="#"><img src="/play.png" alt="Google Play" /></a>
//           <a href="#"><img src="/app.png" alt="App Store" /></a>
//         </div>
//       </div>
//     </div> 
//     <div className="col-md-6 d-flex justify-content-center position-relative">
//       <div className={styles.appImage}>
//         <img src="/mockup_1.png" alt="App Mockup" className={styles.appImageOne} />
//         <img src="/mockup_2.png" alt="App Mockup" className={styles.appImageTwo} />
//       </div>
//     </div>
//   </div>
// </section>






export default function Home() {
  return (
    <>
    

      <div className={styles.container}>
        {/* Use existing Navbar component */}
        
   
        {/* Hero Section */}
        <main className={styles.hero}>
  
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                EXPERIENCE THE<br />
                OCEAN LIKE NEVER<br />
                BEFORE!
              </h1>
              <p className={styles.heroDescription}>
                Whether you racing across the waves or floating above the<br />
                sea, we guarantee an experience full of excitement and fun.<br />
                The ocean is calling – are you ready?
              </p>
              <div className={styles.heroButtons}>
                <button className={styles.bookActivitiesBtn}>
                  📅 Book Activities
                </button>
                <button className={styles.bookPackagesBtn}>
                  Book Packages ▶
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <div className={styles.checkmark}>✓</div>
            </div>
            <h3 className={styles.featureTitle}>Safety First</h3>
            <p className={styles.featureDescription}>
              High-quality gear, strict<br />
              protocols, and expert<br />
              supervision always.
            </p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <div className={styles.people}>👥</div>
            </div>
            <h3 className={styles.featureTitle}>Trusted by Many</h3>
            <p className={styles.featureDescription}>
              Thousands of happy customers<br />
              enjoying unforgettable<br />
              adventures.
            </p>
          </div>
          
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <div className={styles.award}>🏆</div>
            </div>
            <h3 className={styles.featureTitle}>Trained Professionals</h3>
            <p className={styles.featureDescription}>
              Certified Professionals ensuring<br />
              a fun with safe secure<br />
              experience.
            </p>
          </div>
        </section>
       <TestimonialSlider />

       <section className={styles.faq}>
         <h2>Frequently Asking Questions</h2>
         <FaqItem
          question="Is there an age limit for the activities?"
          answer="Yes! We prioritize safety with high-quality equipment and trained professionals guiding every activity."
        />
        <FaqItem
          question="How can I book an activity?"
          answer="Yes! We prioritize safety with high-quality equipment and trained professionals guiding every activity."
        />
          <FaqItem
          question="Do I need prior experience for the watersports?"
          answer="Yes! We prioritize safety with high-quality equipment and trained professionals guiding every activity."
        />
           <FaqItem
          question="Is there an age limit for the activities?"
          answer="Yes! We prioritize safety with high-quality equipment and trained professionals guiding every activity."
        />
      </section>
      <FlyFishFooter />
      </div>
    </>
  );
}