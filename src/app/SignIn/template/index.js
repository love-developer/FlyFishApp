/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import styles from "./styles.module.css";
import Image from "next/image";
import InputField from "../../components/InputField";
import ImageSlider from '../../components/ImageSlider';
import AppButton from '../../components/AppButton';
// import Navbar from '../../components/NavBar';

import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";




export default function Home() {
  const slides = [
    {
      image: '/slide1.png',
      heading: 'Adventure Starts With FlyFish!',
      caption: 'Dive into top-notch water sport and experiences that fit your budget without compromising the thrill!',
    },
    {
      image: '/slide2.png',
      heading: 'Experience Paddle Boarding!',
      caption: 'Calm waters or waves – ride your way with FlyFish excitement.',
    },
    {
      image: '/slide3.png',
      heading: 'Jet Ski like Never Before!',
      caption: 'Throttle up with safe yet thrilling jet ski rides.',
    },
    {
      image: '/slide4.png',
      heading: 'Jet Ski like Never Before!',
      caption: 'Throttle up with safe yet thrilling jet ski rides.',
    },
  ];
  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      
       {/* <Navbar /> */}
      <Container>
      <Row>
        <Col xs lg={6} sm={12}>  <div className={styles.loginSection}>
          <p className={styles.welcome}>Hello, Welcome!</p>
          <p className={styles.description}>
            With affordable packages and activities, FlyFish welcomes adventurers
            of ALL ages and skill levels!
          </p>
          <form className={styles.loginForm}>
            <div className={styles.inputGroup}>
            <p className={styles.inputTitle}>Enter Your Email *</p>
              <InputField placeholder={"testing@gmail.com"} type={"email"} />
            </div>
            <div className={styles.inputGroup}>
            <p className={styles.inputTitle}>Enter Your Password *</p>
              <InputField placeholder={"*********"} type={"password"} />
            </div>
            <Link href="/ForgetPassword" className={styles.forgotPassword}>
              Forgot password?
            </Link>
            
            <AppButton title={"Login"} />
          </form>
          <div className={styles.socialLogin}>
            <p className={styles.orLogin}> Or login with</p>
            <div className={styles.socialIcons}>
              <button className={styles.fbButton}>
                <img
                  src="/fb.png"
                  alt="Facebook"
                  className="fb-icon"
                  width="30"
                  height="30"
                />
              </button>
              <button className={styles.fbButton}>
                <img
                  src="/google.png"
                  alt="google"
                  className="fb-icon"
                  width="30"
                  height="30"
                />
              </button>
              <button className={styles.fbButton}>
                <img
                  src="/iphone.png"
                  alt="google"
                  className="fb-icon"
                  width="30"
                  height="30"
                />
              </button>
  
            </div>
      
          </div>
          <p className={styles.signupLink} color="#ff8800">
            Dont have an account ? <Link href="/SignUp">SIGN UP</Link>
          </p>
        </div>
        </Col>
        <Col xs lg={6} sm={12}>   <ImageSlider slides={slides} /></Col>
      </Row>
      </Container>

    </div>
  );
}