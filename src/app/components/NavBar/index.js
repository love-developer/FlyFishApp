"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const Navbar = ({ translucent = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: "Home", path: "/HomeScreen" },
    { name: "Activities", path: "/ActivitiesScreen" },
    { name: "AboutUs", path: "/AboutUsHome" },
    { name: "Blogs", path: "/Blogs" },
    { name: "FlyFish Packages", path: "/FlyFishPackages" },
  ];

  const handleProfileClick = () => {
    router.push("/ProfileSection");
  };

  const handleCartClick = () => {
    router.push("/mycart");
  };

  // Detect mobile view for logo switching
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={`${styles.navbar} ${translucent ? styles.navbarTranslucent : ""}`}>
      {/* Desktop Logo */}
      {!isMobile && (
        <img src="/logo.png" alt="FlyFish Logo" className={styles.logoDesktop} />
      )}
      {/* Mobile Logo */}
      {isMobile && (
        <img src="/about.png" alt="FlyFish Mobile Logo" className={styles.logoMobile} />
      )}
      {/* Desktop Nav Links */}
      {!isMobile && (
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${pathname === item.path ? styles.active : ""}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {/* Desktop Nav Buttons */}
      {!isMobile && (
        <div className={styles.navButtons}>
          {user ? (
            <div className={styles.navUser}>
              <img src="/bell.png" className={styles.navIcon} />
              <img src="/cart.png" className={styles.navIcon} onClick={handleCartClick} />
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt="Profile"
                className={styles.profileImage}
                onClick={handleProfileClick}
              />
            </div>
          ) : (
            <>
              <Link href="/SignIn">
                <button className={`${styles.loginBtn} ${pathname === "/login" ? styles.active : ""}`}>Login</button>
              </Link>
              <Link href="/SignUp">
                <button className={`${styles.signupBtn} ${pathname === "/signup" ? styles.active : ""}`}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      )}
      {/* Mobile Cart and Hamburger */}
      {isMobile && (
        <div className={styles.mobileIcons}>
          <img src="/cart.png" className={styles.navIcon} onClick={handleCartClick} />
          <div
            className={styles.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" width="32" height="3" rx="1.5" fill="#222" />
              <rect y="15" width="32" height="3" rx="1.5" fill="#222" />
              <rect y="23" width="32" height="3" rx="1.5" fill="#222" />
            </svg>
          </div>
        </div>
      )}
      {/* Mobile Nav Links Dropdown */}
      {isMobile && (
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navItems.map((item) => (
            <li key={item.path} onClick={() => setMenuOpen(false)}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${pathname === item.path ? styles.active : ""}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;