"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { activityService } from '../../services/activity.service.ts';
import styles from './styles.module.css';
import NavBar from '../../components/NavBar';
import FlyFishFooter from '../../components/FlyFishFooter/index.js';
import LoadingIndicator from '../../components/LoadingIndicator';

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await activityService.getActivities();
        setActivities(data);
        fetchRatings(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRatings = async (activitiesToRate) => {
      const ratingsData = {};
      for (const activity of activitiesToRate) {
        try {
          const reviews = await activityService.getAllReviews(activity.id);
          if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
            ratingsData[activity.id] = {
              average: (totalRating / reviews.length).toFixed(1),
              count: reviews.length
            };
          } else {
            ratingsData[activity.id] = { average: 'N/A', count: 0 };
          }
        } catch (error) {
          console.error(`Failed to fetch ratings for ${activity.id}`, error);
          ratingsData[activity.id] = { average: 'N/A', count: 0 };
        }
      }
      setRatings(ratingsData);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingIndicator text="Loading activities..." />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const displayActivities = activities;

  const handleActivityClick = (id) => {
    router.push(`/BookingScreen?id=${id}`);
  };

  return (
    <section className={styles.individualActivities}>
      <section className={styles.hero}>
        <NavBar translucent/>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>OUR ACTIVITIES</h1>
        </div>
      </section>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionHeaderTitle}>FlyFish Activities</p>
        <p>Enjoy the freedom of exploring the open sea, feeling the rush of adrenaline, and embracing the thrill of adventure at your own pace.</p>
      </div>
      <div className={styles.activitiesGrid}>
        {displayActivities.map((activity, index) => (
          <div key={index} className={styles.activityCard} onClick={() => handleActivityClick(activity.id)}>
            <img src={activity.images[0]} alt={activity.title} className={styles.activityImage} />
            <div className={styles.activityInfo}>
              <div className={styles.titles}>
                <p className={styles.activityTitle}>{activity.title}</p>
                <p className={styles.price}>{activity.price[0]} AED</p>
              </div>
              <div className={styles.titles}>
                <div className={styles.rating}>
                  ★ {ratings[activity.id]?.average || '...'} ({ratings[activity.id]?.count || 0})
                </div>
                <p className={styles.people}>{activity.people} Person</p>

              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className={styles.cardsGrid}>
        {displayActivities.map((pkg, idx) => (
          <PackageCard pkg={pkg} allActivities={displayActivities} key={pkg.id || idx} />
        ))}
      </div> */}
    </section>
  );
};

export default ActivitiesScreen;