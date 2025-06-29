import React, { useState, useRef } from "react";
import styles from "./activitySlider.module.css";

const ActivitySlider = ({ activities }) => {
  const [active, setActive] = useState(2); // Center card index
  const startX = useRef(null);
  const dragging = useRef(false);

  // Mouse/touch event handlers
  const onDragStart = (e) => {
    dragging.current = true;
    startX.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  };

  const onDragMove = (e) => {
    if (!dragging.current) return;
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = x - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && active < activities.length - 1) {
        setActive(active + 1);
        dragging.current = false;
      } else if (diff > 0 && active > 0) {
        setActive(active - 1);
        dragging.current = false;
      }
    }
  };

  const onDragEnd = () => {
    dragging.current = false;
  };

  return (
    <div
      className={styles.sliderContainer}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
      style={{ cursor: 'grab' }}
    >
      {activities.map((activity, idx) => {
        const offset = idx - active;
        if (Math.abs(offset) > 2) return null;
        // Scale and rotate based on offset, with further reduced size and rotation
        let scale = 1;
        let rotate = 0;
        let translateY = 0;
        if (offset === 0) {
          scale = 1.2;
          rotate = 0;
        } else if (Math.abs(offset) === 1) {
          scale = 0.90;
          rotate = offset * 5.5;
        } else if (Math.abs(offset) === 2) {
          scale = 0.75;
          rotate = offset * 8.5;
        }
        // Vertically center all cards
        translateY = '-50%';
        return (
          <div
            key={activity.title}
            className={styles.card}
            style={{
              zIndex: 10 - Math.abs(offset),
              transform: `
                translateX(${offset * 80}px)
                translateY(${translateY})
                scale(${scale})
                rotate(${rotate}deg)
              `,
              top: '50%',
              opacity: 1,
              pointerEvents: idx === active ? "auto" : "none",
            }}
            onClick={() => setActive(idx)}
          >
            <img src={activity.image} alt={activity.title} className={styles.cardImage} />
            <h3 className={styles.cardTitle}>{activity.title}</h3>
            <p className={styles.cardDesc}>{activity.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ActivitySlider; 