"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navbar from '../../components/NavBar';
import BookingHistory from '../../components/BookingHistory';
import AboutUs from '../../AboutUs/template';
import EditProfile from '../../components/EditProfile/template';
import ReferralDashboard from '../../components/RefferalDashboard/tamplate';
import styles from './styles.module.css';
import Notifications from '../../components/Notifications';
import { useAuth } from '../../context/AuthContext';

// Sidebar Component
const Sidebar = ({ activeTab, onTabChange, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const sidebarItems = [
    { icon: '/profile.png', label: 'Edit Profile', key: 'edit-profile' },
    { icon: '/refferal.png', label: 'Referral Dashboard', key: 'referral-dashboard' },
    { icon: '/history.png', label: 'Booking History', key: 'booking-history' },
    { icon: '/about.png', label: 'About Us', key: 'about-us' },
    { icon: '/notification.png', label: 'Notifications', key: 'notifications' },
    // { icon: '/contact.png', label: 'Contact Us', key: 'contact-us' },
    { icon: '/logout.png', label: 'Log Out', key: 'log-out' },
  ];

  return (
    <>
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarNav}>
          <nav>
            {sidebarItems.map((item) => {
              return (
                <button
                  key={item.key}
                  className={`${styles.sidebarItem} ${activeTab === item.key ? styles.active : ''}`}
                  onClick={() => {
                    onTabChange(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={item.icon} alt={item.label} className={styles.sidebarIcon} />
                  <span className={styles.sideBarLabel}>{item.label}</span>
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
const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  React.useEffect(() => {
    if (activeTab === 'log-out') {
      setSigningOut(true);
      // Simulate async sign out
      Promise.resolve(signOut && signOut())
        .finally(() => {
          setSigningOut(false);
          // Optionally, redirect or reset state here
        });
    }
  }, [activeTab, signOut]);

  const renderContent = () => {
    if (activeTab === 'log-out') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      );
    }
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
      default:
        return <Notifications />;
    }
  };

  return (
    <>
      <div className={styles.neo}>
      <Navbar />
        </div> 
    
      <div className={styles.dashboardContainer}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={styles.mobileMenuButton}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        <Sidebar 
          activeTab={activeTab}
          onTabChange={onTabChange}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSection;