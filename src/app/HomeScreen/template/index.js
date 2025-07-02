"use client";

import styles from "./styles.module.css";
import "../../globals.css";
import FlyFishFooter from "../../components/FlyFishFooter";
import FaqItem from "../../components/FaqItem";
import NavBar from "../../components/NavBar";
import AppDownload from "../../components/AppDownload/index";
import TestimonialSlider from "../../components/Testiomonials";
import ActivitySlider from "./ActivitySlider";
import { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const blogs = [
    {
      img: "/slide1.png",
      title: "Why Watersports Are a Must-Try",
      desc: "Explore the thrill of waves and discover why watersports should be on your travel list.",
    },
    {
      img: "/slide2.png",
      title: "Top 10 Beaches for Adventure",
      desc: "We’ve handpicked the best adventure-packed beaches around the world.",
    },
    {
      img: "/slide3.png",
      title: "How to Jet Ski Like a Pro",
      desc: "Beginner or pro — these tips will level up your jet ski game in no time!",
    },
    {
      img: "/slide4.png",
      title: "Watersport Safety 101",
      desc: "A must-read guide to ensure your water adventures stay safe and fun.",
    },
    {
      img: "/slide1.png",
      title: "Group Activities for Families",
      desc: "Fun water-based group ideas perfect for family bonding vacations.",
    },
    {
      img: "/slide2.png",
      title: "Snorkeling Tips for Beginners",
      desc: "Discover what to know before your first snorkeling experience.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const getCurrentItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      items.push(blogs[(currentIndex + i) % blogs.length]);
    }
    return items;
  };

  return (
    <>
      <div className={styles.container}>
        {/* Use existing Navbar component */}

        {/* Hero Section */}
        <main className={styles.hero}>
          <NavBar translucent />
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                EXPERIENCE THE
                <br />
                OCEAN LIKE NEVER
                <br />
                BEFORE!
              </h1>
              <p className={styles.heroDescription}>
                Whether you racing across the waves or floating above the
                <br />
                sea, we guarantee an experience full of excitement and fun.
                <br />
                The ocean is calling – are you ready?
              </p>
              <div className={styles.heroButtons}>
                <div className={styles.bookActivitiesBtn}>
                  <div>
                    <img src="/book.png" className={styles.book} />
                  </div>
                  Book Activities
                </div>
                <button
                  className={
                    styles.bookActivitiesBtn + " " + styles.bookActivitiesBtn2
                  }
                  id="bookPackagesBtn"
                >
                  Book Packages
                </button>
              </div>
            </div>
          </div>
          {/* Features Section */}
          <div className={styles.featuresWrapper}>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIconwrapper}>
                  <img src="/safety.png" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Safety First</h3>
                <p className={styles.featureDescription}>
                  High-quality gear, strict
                  <br />
                  protocols, and expert
                  <br />
                  supervision always.
                </p>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIconwrapper}>
                  <img src="/trust.png" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Trusted by Many</h3>
                <p className={styles.featureDescription}>
                  Thousands of happy customers
                  <br />
                  enjoying unforgettable
                  <br />
                  adventures.
                </p>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIconwrapper}>
                  <img src="/trained.png" className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>Trained Professionals</h3>
                <p className={styles.featureDescription}>
                  Certified Professionals ensuring
                  <br />
                  a fun with safe secure
                  <br />
                  experience.
                </p>
              </div>
            </div>
          </div>
        </main>
        {/* Activity Slider Section */}
        <div className={styles.activities}>
          <p className={styles.sliderTitle}>
            Explore Water Sports With
            <br />
            FlyFish Adventures!
          </p>
          <p className={styles.sliderDescription}>
            Enjoy special offers and earn rewards points with each activity,
            <br /> enhancing your experience with exclusive perks and bonuses.
            Join us for
            <br /> a day filled with fun, excitement, and breathtaking views on
            the water!
          </p>
          <img src="/sliders.png" className={styles.sliderImage} />
          <img src="/iPhone15Pro.png" className={styles.sliderImage2} />
        </div>
        <div className={styles.discover}>
          <p className={styles.pkg}>FlyFish Packages</p>
          <p className={styles.pkgSmall}>
            brings you the best watersports under the sun!
          </p>
          <p className={styles.offerDescription}>
            FlyFish offers heart-pounding water adventures, from high-speed jet
            skiing to breathtaking
            <br /> parasailing. Whether you crave excitement or a fun ride on
            the waves, we bring you the best
            <br /> ocean experiences. Get ready to splash, soar, and make
            unforgettable memories!
          </p>
          <div className={styles.packages}>
            <div>
              <img src="/book.png" className={styles.book} />
            </div>
            Book Packages
          </div>
        </div>
        
        <section className={styles.blogsSection}>
          <h2 className={styles.blogsTitle}>Blogs</h2>
          <p className={styles.blogsSubtitle}>
            Discover Expert Tips, Inspiring Stories, and the Latest Trends!
          </p>

          <div className={styles.blogsWrapper}>
            <div className={styles.blogsGrid}>
              {blogs.map((blog, i) => (
                <div className={styles.blogCard} key={i}>
                  <img src={blog.img} alt="blog" className={styles.blogImage} />
                  <div className={styles.blogContent}>
                    <h3 className={styles.blogCardTitle}>{blog.title}</h3>
                    {blog.desc && (
                      <p className={styles.blogCardDesc}>
                        {blog.desc.length > 50
                          ? blog.desc.slice(0, 50) + "..."
                          : blog.desc}
                      </p>
                    )}
                    <div className={styles.blogCardFooter}>
                      <span className={styles.readBlog}>Read blog →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AppDownload />
        {/* Features Section */}
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
        {/* App Download Section */}
        <FlyFishFooter />
      </div>
    </>
  );
}
