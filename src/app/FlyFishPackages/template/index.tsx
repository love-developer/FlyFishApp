"use client";
import { useState, useEffect } from "react";
import styles from "./packages.module.css";
import Navbar from "../../components/NavBar";
import { PackageModel } from "../../../utils/models/package.model";
import LoadingIndicator from '../../components/LoadingIndicator';
import { useRouter } from 'next/navigation';
import { packageService } from "../../services/package.service";

function PackageCard({ pkg }) {
  const router = useRouter();
  const images = Array.isArray(pkg.packageActivity)
    ? pkg.packageActivity.map(a => a.url || a.imageUrl || a.img).filter(Boolean)
    : [];
  const [imgIdx, setImgIdx] = useState(0);
  const total = images.length;
  const prevImg = (e) => {  
    e.stopPropagation();
    setImgIdx((idx) => (idx === 0 ? total - 1 : idx - 1));
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIdx((idx) => (idx === total - 1 ? 0 : idx + 1));
  };

  // Extract details  
  const people = pkg.people || pkg.packageActivity?.[0]?.people || 0;
  const activitiesCount = Array.isArray(pkg.packageActivity) ? pkg.packageActivity.length : 0;
  const photographs = pkg.photographs || pkg.photos || pkg.packageActivity?.[0]?.photographs || 0;


  const handleCardClick = () => {
    router.push(`/BookPackageScreen?id=${pkg.id}`);
  };

  return (
    <div className={styles.card} style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <div className={styles.imgSlider}>
        <img src={images[imgIdx] || ""} alt={pkg.title} className={styles.img} />
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
      <div className={styles.sliderDots}>
        {images.map((_, idx) => (
          <span
            key={idx}
            className={imgIdx === idx ? styles.activeDot : styles.dot}
          />
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <span className={styles.title}>
            {pkg.title}
            <span className={styles.subTitle}> ({pkg.subTitle}) </span>
          </span>
          <span className={styles.title}>{pkg.price} AED</span>
        </div>
        <div className={styles.detailsRow}>
          <div>
          <span className={styles.dotTitle}> {people} People</span>
          
          </div>
          <div>
          <span className={styles.dotSeps}>•</span>
          <span className={styles.dotTitle}>{activitiesCount} Activities</span>
          </div>
         <div>
         <span className={styles.dotSeps}>•</span>
         <span className={styles.dotTitle}>{photographs} Photographs</span>
         </div>
          
        </div>
        <button className={styles.detailsBtn}>View Details</button>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError("");
      try {
      
        const data = await packageService.getPackages();
        // Fetch all activities
        const { activityService } = await import('../../services/activity.service');
        const activities = await activityService.getActivities();
        // Map activity IDs to their first image
        const activityImageMap = new Map(
          activities.map((activity: any) => [activity.id, activity.images?.[0] || null])
        );
        // For each package, update packageActivity.url if activity id matches
        const updatedPackages = data.map(pkg => {
          if (Array.isArray(pkg.packageActivity)) {
            pkg.packageActivity = pkg.packageActivity.map(pa => {
              if (pa.id && activityImageMap.has(pa.id)) {
                return { ...pa, url: activityImageMap.get(pa.id) };
              }
              return pa;
            });
          }
          return pkg;
        });
        setPackages(updatedPackages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
        <Navbar translucent/>
        <h1 className={styles.heroTitle}>PACKAGES</h1>
        </div>
      </section>

      {/* Family Packages */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Family Packages</h2>
        <p className={styles.sectionDesc}>
          Perfect for fun-loving families! Enjoy a mix of thrilling and relaxing water<br />activities designed to create unforgettable memories together, all bundled into<br />value-packed adventures.
        </p>
        {loading && <LoadingIndicator text="Loading packages..." />}
        {error && <div style={{color: 'red'}}>{error}</div>}
        <div className={styles.cardsGrid}>
          {packages.map((pkg, idx) => (
            <PackageCard pkg={pkg} key={pkg.id || idx} />
          ))}
        </div>
      </section>

  

      {/* Subscribe Section */}
     
    </main>
  );
}