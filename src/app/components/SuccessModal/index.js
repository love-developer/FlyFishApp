"use client";

import { useEffect } from 'react';
import styles from './styles.module.css';

const SuccessModal = ({ isOpen, onClose, title, description }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.successModalOverlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.successModalContent}>
        <div className={styles.iconWrapper}>
          <img src="/success.png" alt="Success" className={styles.checkIcon} />
        </div>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalDescription}>{description}</p>
      </div>
    </div>
  );
};

export default SuccessModal; 