// components/GenderSelect.js
import React from 'react';
import styles from "./styles.module.css";

const GenderSelect = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="gender" className={styles.inputEmail}>Gender</label>
      <select
        id="gender"
        value={value}
        onChange={onChange}
        style={{
          padding: '10px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginTop: '5px'
        }}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default GenderSelect;
