"use client";

import React, { useState, useEffect } from 'react';
import { User, Users, Clock, Building2, Bell, UserCheck, LogOut, Gift, ShoppingCart, Diamond, Menu, X } from 'lucide-react';
import Navbar from '../../components/NavBar';
import AboutUs from '../../AboutUs/template';
import EditProfile from '../../components/EditProfile/template';
import ReferralDashboard from '../../components/RefferalDashboard/tamplate';
import styles from './styles.module.css';

// JavaScript NotificationsModel class
class NotificationsModel {
  constructor({
    uid = "",
    id = "",
    itemId = "",
    img = "",
    title = "",
    body = "",
    notificationType = "",
    createdAt = null,
    bookingId = "",
    read = false
  } = {}) {
    this.uid = uid;
    this.id = id;
    this.itemId = itemId;
    this.img = img;
    this.title = title;
    this.body = body;
    this.notificationType = notificationType;
    this.createdAt = createdAt;
    this.bookingId = bookingId;
    this.read = read;
  }

  static fromJson(json) {
    return new NotificationsModel({
      uid: json.uid || "",
      itemId: json.itemId || "",
      id: json.id || "",
      img: json.img || "",
      title: json.title || "",
      bookingId: json.bookingId || "",
      read: json.read || false,
      body: json.body || "",
      createdAt: json.createdAt,
      notificationType: json.notificationType || ""
    });
  }

  toJson() {
    return {
      uid: this.uid,
      itemId: this.itemId,
      body: this.body,
      img: this.img,
      title: this.title,
      id: this.id,
      read: this.read,
      createdAt: this.createdAt,
      notificationType: this.notificationType,
      bookingId: this.bookingId
    };
  }
}

// Mock Firebase service (replace with actual Firebase implementation)
const mockFirebaseService = {
  async getNotifications(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data that would come from Firebase
    return [
      {
        uid: "1234",
        id: "notif_1",
        itemId: "item_123",
        img: "https://via.placeholder.com/40/10b981/ffffff?text=H",
        title: "Users Referred",
        body: "Dear Will Smith, Your friend Hani booked an activity with your referral code.",
        notificationType: "referral",
        createdAt: new Date(Date.now() - 14 * 60 * 1000), // 14 minutes ago
        bookingId: "booking_123",
        read: false
      },
      {
        uid: "1234",
        id: "notif_2",
        itemId: "item_124",
        img: "",
        title: "Complete Your Bookings",
        body: "Dear Will Smith, to complete your booking process, please check out the activities you've added in the cart.",
        notificationType: "booking",
        createdAt: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
        bookingId: "booking_124",
        read: false
      },
      {
        uid: "1234",
        id: "notif_3",
        itemId: "item_125",
        img: "https://via.placeholder.com/40/3b82f6/ffffff?text=KA",
        title: "Users Referred",
        body: "Your friend Khalid Ahmath booked an activity with your referral code.",
        notificationType: "referral",
        createdAt: new Date(Date.now() - 14 * 60 * 1000), // 14 minutes ago
        bookingId: "booking_125",
        read: true
      },
      {
        uid: "1234",
        id: "notif_4",
        itemId: "item_126",
        img: "",
        title: "Reward Points",
        body: "You have earned 40 reward points from your recent bookings!",
        notificationType: "reward",
        createdAt: new Date(Date.now() - 14 * 60 * 1000), // 14 minutes ago
        bookingId: "",
        read: false
      },
      {
        uid: "1234",
        id: "notif_5",
        itemId: "item_127",
        img: "",
        title: "FlyFish Offers",
        body: "FlyFish festival offers are coming soon! book now and save up to 40%!!",
        notificationType: "offer",
        createdAt: new Date(Date.now() - 14 * 60 * 1000), // 14 minutes ago
        bookingId: "",
        read: false
      }
    ].map(data => NotificationsModel.fromJson(data));
  }
};

// Utility function to format time
const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

// Sidebar Component
const Sidebar = ({ activeTab, onTabChange, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const sidebarItems = [
    { icon: User, label: 'Edit Profile', key: 'edit-profile' },
    { icon: Users, label: 'Referral Dashboard', key: 'referral-dashboard' },
    { icon: Clock, label: 'Booking History', key: 'booking-history' },
    { icon: Building2, label: 'About Us', key: 'about-us' },
    { icon: Bell, label: 'Notifications', key: 'notifications' },
    { icon: UserCheck, label: 'Contact Us', key: 'contact-us' },
    { icon: LogOut, label: 'Log Out', key: 'log-out' },
  ];

  return (
    <>
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarNav}>
          <nav>
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.key}
                  className={`${styles.sidebarItem} ${activeTab === item.key ? styles.active : ''}`}
                  onClick={() => {
                    onTabChange(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <IconComponent />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div 
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.show : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

// Notifications Component
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const fetchedNotifications = await mockFirebaseService.getNotifications("1234");
        setNotifications(fetchedNotifications);
      } catch (err) {
        setError("Failed to load notifications");
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
    const iconProps = { className: styles.notificationIcon };
    
    switch (notification.notificationType) {
      case 'referral':
        return (
          <div className={`${iconProps.className} green`}>
            <Users />
          </div>
        );
      case 'booking':
        return (
          <div className={`${iconProps.className} orange`}>
            <ShoppingCart />
          </div>
        );
      case 'reward':
        return (
          <div className={`${iconProps.className} blue`}>
            <Diamond />
          </div>
        );
      case 'offer':
        return (
          <div className={`${iconProps.className} orange`}>
            <Gift />
          </div>
        );
      default:
        return (
          <div className={`${iconProps.className} blue`}>
            <Bell />
          </div>
        );
    }
  };

  const handleClearAll = async () => {
    // Here you would typically make an API call to mark all notifications as read
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  if (loading) {
    return (
      <div className={styles.notificationsPanel}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
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
      <div className={styles.notificationsHeader}>
        <h2 className={styles.notificationsTitle}>Notifications</h2>
        <button className={styles.clearAllButton} onClick={handleClearAll}>
          Clear All
        </button>
      </div>

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
                  <div className={styles.notificationType}>
                    Type: {notification.notificationType}
                    {notification.bookingId && ` • Booking: ${notification.bookingId}`}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Dummy Components for other tabs

const BookingHistory = () => (
  <div className={styles.pageContent}>
    <h1 className={styles.pageTitle}>Booking History</h1>
    <p className={styles.pageDescription}>
      View all your past and upcoming bookings. You can see booking details,
      payment status, and download receipts for your activities.
    </p>
  </div>
);

// const AboutUs = () => (
//   <div className="page-content">
//     <h1 className="page-title">About Us</h1>
//     <p className="page-description">
//       Learn more about our company, mission, values, and the team behind
//       our platform. Discover our story and what drives us to provide
//       the best experience for our users.
//     </p>
//   </div>
// );

const ContactUs = () => (
  <div className={styles.pageContent}>
    <h1 className={styles.pageTitle}>Contact Us</h1>
    <p className={styles.pageDescription}>
      Get in touch with our support team. You can find our contact information,
      submit a support ticket, or use our live chat feature for immediate assistance.
    </p>
  </div>
);

const LogOuts = () => (
  <div className={styles.pageContent}>
    <h1 className={styles.pageTitle}>Log Out</h1>
    <p className={styles.pageDescription}>
      Are you sure you want to log out of your account? You will need to
      sign in again to access your dashboard and account features.
    </p>
  </div>
);

// Main Dashboard Component
export default function ProfileSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notifications');

  const renderContent = () => {
    switch (activeTab) {
      case 'edit-profile':
        return <EditProfile />;
      case 'referral-dashboard':
        return <ReferralDashboard />;
      case 'booking-history':
        return <BookingHistory />;
      case 'about-us':
        return <AboutUs />;
      case 'notifications':
        return <Notifications />;
      case 'contact-us':
        return <ContactUs />;
      case 'log-out':
        return <LogOuts />;
      default:
        return <Notifications />;
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={styles.mobileMenuButton}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.contentHeader}>
              <p className={styles.contentSubtitle}>
                Our complete range of personal development content.
              </p>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}