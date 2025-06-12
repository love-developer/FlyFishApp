"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { activityService } from '../../services/activity.service.ts';
import styles from './styles.module.css';

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const data = await activityService.getActivities();
        setActivities(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const displayActivities = activities;

  const handleActivityClick = (id) => {
    router.push(`/BookingScreen?id=${id}`);
  };

  return (
    <section className={styles.individualActivities}>
      <div className={styles.sectionHeader}>
        <h2>Individual Activities</h2>
        <p>Enjoy the freedom of exploring the open sea, feeling the rush of adrenaline, and embracing the thrill of adventure at your own pace.</p>
      </div>
      <div className={styles.activitiesGrid}>
        {displayActivities.map((activity, index) => (
          <div key={index} className={styles.activityCard} onClick={() => handleActivityClick(activity.id)}>
            <img src={activity.images[0]} alt={activity.title} className={styles.activityImage} />
            <div className={styles.activityInfo}>
              <div className={styles.titles}>
                <h3>{activity.title}</h3>
                <p className={styles.price}>{activity.price[0]} AED</p>
              </div>
              <div className={styles.titles}>
                <p className={styles.people}>{activity.people} Person</p>
                <div className={styles.rating}>
                  ★ {activity.rating} ({Math.floor(Math.random() * 100) + 1})
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitiesScreen;