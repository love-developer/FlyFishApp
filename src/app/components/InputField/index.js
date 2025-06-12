"use client";

import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import styles from './module.styless.css';

const InputField = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";


  return (
    <div className="input-container">


      {/* Input Field */}
      <input
        type={isPassword && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />

      {/* Password Toggle */}
      {isPassword && (
        <div
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
        </div>
      )}
    </div>
  );
};

export default InputField;
