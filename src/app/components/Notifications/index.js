"use client";

import React, { useState, useEffect } from 'react';
import { Bell, Gift, ShoppingCart, Diamond, Users } from 'lucide-react';
import styles from './styles.module.css';
import { useAuth } from '../../context/AuthContext';
import { notificationsService } from '../../services/notification.service';
import LoadingIndicator from '../LoadingIndicator';

// Utility function to format time
const formatTimeAgo = (date) => {
  if (!date) return '';
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};


// Notifications Component
const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("Please log in to see your notifications.");
      return;
    }

    setLoading(true);
    notificationsService.getMyNotifications(user.uid)
      .then((notificationsList) => {
        setNotifications(notificationsList);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load notifications");
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, [user]);

  const getNotificationIcon = (notification) => {
    // If notification has an image, use it
    if (notification.img) {
      return (
        <div className={styles.notificationIcon}>
          <img src={notification.img} alt="Notification" />
        </div>
      );
    }

    // Otherwise, use icon based on notification type
    

  };

  const handleClearAll = async () => {
    if (!user) return;
    try {
      await notificationsService.markAllAsRead(user.uid);
      // The real-time listener will automatically update the UI
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      // Optionally show an error to the user
    }
  };

  if (loading) {
    return (
      <div className={styles.notificationsPanel}>
        <LoadingIndicator text="Loading notifications..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.notificationsPanel}>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.notificationsPanel}>
      

      <div className={styles.notificationsList}>
        {notifications.length === 0 ? (
          <div className={styles.pageDescription} style={{ textAlign: 'center', padding: '2rem' }}>
            No notifications found
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
            >
              <div className={styles.notificationContent}>
                {getNotificationIcon(notification)}
                <div className={styles.notificationDetails}>
                  <div className={styles.notificationHeader}>
                    <h3 className={styles.notificationTitle}>{notification.title}</h3>
                    <span className={styles.notificationTime}>
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                  <p className={styles.notificationMessage}>{notification.body}</p>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.notificationsHeader}>
        <h2 className={styles.notificationsTitle}>Notifications</h2>
        <button className={styles.clearAllButton} onClick={handleClearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Notifications; 