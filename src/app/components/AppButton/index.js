"use client";

import styles from './styles.module.css';

const AppButton = ({ title, onClick }) => {
  return (
    <button type="submit" className={styles.appButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default AppButton;
