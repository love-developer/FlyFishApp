"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

// Components
import Navbar from "../../components/NavBar";
import BookingHistory from "../../components/BookingHistory";
import AboutUs from "../../AboutUs/template";
import EditProfile from "../../components/EditProfile/template";
import ReferralDashboard from "../../components/RefferalDashboard/tamplate";
import Notifications from "../../components/Notifications";

// Context
import { useAuth } from "../../context/AuthContext";

// Styles
import styles from "./styles.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// Static Pages
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

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar Component
const Sidebar = ({ activeTab, onTabChange, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const sidebarItems = [
    { icon: "/profile.png", label: "Edit Profile", key: "edit-profile" },
    { icon: "/refferal.png", label: "Referral Dashboard", key: "referral-dashboard" },
    { icon: "/history.png", label: "Booking History", key: "booking-history" },
    { icon: "/about.png", label: "About Us", key: "about-us" },
    { icon: "/notification.png", label: "Notifications", key: "notifications" },
    { icon: "/logout.png", label: "Log Out", key: "log-out" },
  ];

  return (
    <>
      <div className={`${styles.sidebar} ${isMobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.sidebarNav}>
          <nav>
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={`${styles.sidebarItem} ${activeTab === item.key ? styles.active : ""}`}
                onClick={() => {
                  onTabChange(item.key);
                  setIsMobileMenuOpen(false);
                }}
              >
                <img src={item.icon} alt={item.label} className={styles.sidebarIcon} />
                <span className={styles.sideBarLabel}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.show : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const { signOut, user } = useAuth();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1023);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onTabChange = (tab) => {
    if (isMobile) {
      setAccordionOpen(accordionOpen === tab ? null : tab);
      setActiveTab(tab === activeTab ? null : tab);
    } else {
      setActiveTab(tab);
    }

    if (tab === "log-out") {
      setSigningOut(true);
      Promise.resolve(signOut && signOut()).finally(() => setSigningOut(false));
    }
  };

  const renderContent = () => {
    if (signingOut && activeTab === "log-out") {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "edit-profile":
        return <EditProfile />;
      case "referral-dashboard":
        return <ReferralDashboard />;
      case "booking-history":
        return <BookingHistory />;
      case "about-us":
        return <AboutUs />;
      case "notifications":
        return <Notifications />;
      case "contact-us":
        return <ContactUs />;
      case "log-out":
        return <LogOuts />;
      default:
        return isMobile ? null : <EditProfile />;
    }
  };

  const profilePic = user?.profilePic || "https://via.placeholder.com/50";
  const fullName = user?.fullName || "User Name";

  const mobileItems = [
    { icon: "/profile.png", label: "Edit Profile", key: "edit-profile" },
    { icon: "/language.svg", label: "Language Preferences", key: "language-preferences" },
    { icon: "/refferal.png", label: "Referral Dashboard", key: "referral-dashboard" },
    { icon: "/privacy.svg", label: "Privacy Policy", key: "privacy-policy" },
    { icon: "/about.png", label: "About Us", key: "about-us" },
    { icon: "/terms.svg", label: "Terms & Conditions", key: "terms-conditions" },
    { icon: "/partners.svg", label: "Partners offers", key: "partners-offers" },
    { icon: "/delete.svg", label: "Delete account", key: "delete-account" },
    { icon: "/logout.svg", label: "Log Out", key: "log-out" },
  ];

  return (
    <>
      <div className={styles.neo}>
        <Navbar />
        <div className={styles.profileHeader}>
          <img src={profilePic} alt="Profile" className={styles.profileImage} />
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>{fullName}</span>
          </div>
        </div>
      </div>

      <div className={styles.dashboardContainer}>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={styles.mobileMenuButton}>
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
            {isMobile
              ? mobileItems.map((item) => (
                  <div key={item.key} className={styles.accordionItem}>
                    <button
                      className={`${styles.accordionButton} ${activeTab === item.key ? styles.active : ""}`}
                      onClick={() => onTabChange(item.key)}
                    >
                      <img src={item.icon} alt={item.label} className={styles.sidebarIcon} />
                      <span className={styles.sideBarLabel}>{item.label}</span>
                      <span className={styles.accordionIcon}>
                        {accordionOpen === item.key ? <IoIosArrowDown /> : <IoIosArrowForward />}
                      </span>
                    </button>

                    <div className={`${styles.accordionContent} ${accordionOpen === item.key ? styles.open : ""}`}>
                      {renderContent(item.key)}
                    </div>
                  </div>
                ))
              : renderContent()}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileSection;
