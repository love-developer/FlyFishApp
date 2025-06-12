"use client";

import React, { useEffect, useState } from 'react';
import PartnerService from '../../services/partner.service';
import styles from './styles.module.css';
import Image from 'next/image';
import bannerImage from '../../../../public/partners.png'; // Adjust path if needed

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const partnersService = new PartnerService();

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true);
        const data = await partnersService.getAllPartners();
        setPartners(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    fetchPartners();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;


  return (
    <section className={styles.individualActivities}>
    <div className={styles.banner}>
    <img src="./partners.png"  className={styles.banner} />
      <div className={styles.text}>PARTNERS OFFERS</div>
    </div>
        <div className={styles.sectionHeader}>
          <h2>Individual Activities</h2>
          <p>Enjoy the freedom of exploring the open sea, feeling the rush of adrenaline, and embracing the thrill of adventure at your own pace.</p>
        </div>
        <div className={styles.activitiesGrid}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.activityCard}>
              <img src={partner.image} alt={partner.companyName} className={styles.activityImage} />
              <div className={styles.activityInfo}>
                <div className={styles.titles}>
                <h3>{partner.title}</h3>
                <p className={styles.price}>{partner.location} AED</p>
                </div>
                <div className={styles.titles}>
                <p className={styles.people}>{partner.people} Person</p>
                <div className={styles.rating}>
                  ★ {partner.rating} ({Math.floor(Math.random() * 100) + 1})
                </div>
                </div>
              
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default Partners;