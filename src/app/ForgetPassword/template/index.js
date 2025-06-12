/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./styles.module.css";
import InputField from "../../components/InputField";
import ImageSlider from '../../components/ImageSlider';
import AppButton from '../../components/AppButton';
// import Navbar from '../../components/NavBar';

import { Col, Container, Row } from "react-bootstrap";




export default function ForgetPassword() {
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
          {/* 1st  */}
          <p className={styles.welcome}>Forgot your passwordv ?</p>
          <p className={styles.description}>
          Enter your email to reset your password.
          </p>
            {/* second  */}
          <form className={styles.loginForm}>
        
            <div className={styles.inputGroup}>
            <p className={styles.inputEmail}>
          Enter your email address *
          </p>
              <InputField placeholder={"johndoe@gmail.com"} />
            </div>
              {/* third  */}
             <Container></Container>
            <AppButton  title={"Send Link"} className={styles.buttons}/>
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
        
        </div>
        </Col>
        <Col xs lg={6} sm={12}>   <ImageSlider slides={slides} /></Col>
      </Row>
      </Container>

    </div>
  );
}