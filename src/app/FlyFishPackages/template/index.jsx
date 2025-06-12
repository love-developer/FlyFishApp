"use client";
import { useState } from "react";
import styles from "./packages.module.css";

const familyPackages = [
  {
    title: "Family Pack (Basic)",
    price: "650 AED",
    details: "4 People • 3 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
  {
    title: "Family Pack (Blast)",
    price: "1465 AED",
    details: "4 People • 3 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
  {
    title: "Family Pack (Privilege)",
    price: "1820 AED",
    details: "4 People • 3 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
  {
    title: "Family Pack+",
    price: "1260 AED",
    details: "6 People • 4 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
];

const couplePackages = [
  {
    title: "Couple Pack (Basic)",
    price: "650 AED",
    details: "2 People • 3 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
  {
    title: "Couple Pack (Blast)",
    price: "950 AED",
    details: "2 People • 3 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
  {
    title: "Ideal Pack (Privilege)",
    price: "1250 AED",
    details: "2 People • 3 Activities • 2 Photographs",
    images: ["/slide1.png", "/slide2.png"],
  },
];

function PackageCard({ pkg }) {
  const [imgIdx, setImgIdx] = useState(0);
  const total = pkg.images.length;

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIdx((idx) => (idx === 0 ? total - 1 : idx - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIdx((idx) => (idx === total - 1 ? 0 : idx + 1));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgSlider}>
        <img src={pkg.images[imgIdx]} alt={pkg.title} className={styles.img} />
        {total > 1 && (
          <>
            <button className={`${styles.arrowBtn} ${styles.left}`} onClick={prevImg} aria-label="Previous image">
              <span>&#8592;</span>
            </button>
            <button className={`${styles.arrowBtn} ${styles.right}`} onClick={nextImg} aria-label="Next image">
              <span>&#8594;</span>
            </button>
          </>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{pkg.title}</span>
          <span className={styles.price}>{pkg.price}</span>
        </div>
        <div className={styles.details}>{pkg.details}</div>
        <button className={styles.detailsBtn}>View Details</button>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>PACKAGES</h1>
        </div>
      </section>

      {/* Family Packages */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Family Packages</h2>
        <p className={styles.sectionDesc}>
          Perfect for fun-loving families! Enjoy a mix of thrilling and relaxing water activities designed to create unforgettable memories together, all bundled into value-packed adventures.
        </p>
        <div className={styles.cardsGrid}>
          {familyPackages.map((pkg, idx) => (
            <PackageCard pkg={pkg} key={idx} />
          ))}
        </div>
      </section>

      {/* Couple Packages */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Couple Packages</h2>
        <p className={styles.sectionDesc}>
          Share thrilling water adventures with your special someone! Our couple packages blend excitement, romance, and relaxation—ideal for bonding and making waves together on a perfect day.
        </p>
        <div className={styles.cardsGrid}>
          {couplePackages.map((pkg, idx) => (
            <PackageCard pkg={pkg} key={idx} />
          ))}
        </div>
      </section>

      {/* Subscribe Section */}
     
    </main>
  );
}