// components/FaqItem.js
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./faq.css"; // custom styles

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={toggleFAQ}>
      <div className="faq-question">
        <h3>{question}</h3>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="icon"
        />
      </div>
      {isOpen && <p className="faq-answer">{answer}</p>}
    </div>
  );
}
