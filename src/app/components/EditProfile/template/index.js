"use client";

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';

export default function EditProfile() {


  return (
    <div className={styles.editProfileCard}>
    <div className={styles.editProfileHeader}>
      <div className={styles.profileInfo}>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        <div>
          <div className={styles.profileNameRow}>
            <span className={styles.profileName}>Will Smith Jen</span>
            <span className={styles.profileEmail}>(willsmith123@gmail.com)</span>
          </div>
          <div className={styles.profileActionsRow}>
            <button className={styles.profileActionBtn}>Change Profile Picture</button>
            <button className={styles.profileActionBtn}>Remove Picture</button>
            <button className={styles.profileActionBtn}>Delete Account</button>
          </div>
        </div>
      </div>
      <div className={styles.languageDropdownWrapper}>
        <select className={styles.languageDropdown}>
          <option>English</option>
          <option>Arabic</option>
        </select>
      </div>
    </div>
    <form className={styles.editProfileForm}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Name</label>
          <input className={styles.formInput} type="text" value="Will Smith" readOnly />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Mobile Number</label>
          <input className={styles.formInputOrange} type="text" value="+9712" readOnly />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Date of Birth</label>
          <input className={styles.formInput} type="text" value="1996/06/18" readOnly />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <div className={styles.passwordInputWrapper}>
            <input className={styles.formInput} type="password" value="************" readOnly />
            <span className={styles.eyeIcon}>{/* <Eye /> */}</span>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Confirm Password</label>
          <div className={styles.passwordInputWrapper}>
            <input className={styles.formInput} type="password" value="************" readOnly />
            <span className={styles.eyeIcon}>{/* <Eye /> */}</span>
          </div>
        </div>
        <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="button" className={styles.changePasswordBtn}>Change password</button>
        </div>
      </div>
      <div className={styles.formActionsRow}>
        <button type="submit" className={styles.saveBtn}>Save Changes</button>
        <button type="button" className={styles.discardBtn}>Discard</button>
      </div>
    </form>
  </div>
  );
}