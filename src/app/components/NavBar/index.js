"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '../../HomeScreen' },
    { name: 'Activities', path: '../../ActivitiesScreen' },
    { name: 'AboutUs', path: '../../AboutUs' },
    { name: 'Blogs', path: '../../Blogs' },
    { name: 'FlyFish Packages', path: '../../FlyFishPackages' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="FlyFish Logo" width="160" height="50" />
      </div>
      <ul className={styles.navLinks}>
        {navItems.map(item => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`${styles.navLink} ${
                pathname === item.path ? styles.active : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.navButtons}>
        <Link href="/login">
          <button
            className={`${styles.loginBtn} ${
              pathname === '/login' ? styles.active : ''
            }`}
          >
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button
            className={`${styles.signupBtn} ${
              pathname === '/signup' ? styles.active : ''
            }`}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
