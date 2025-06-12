/* eslint-disable @next/next/no-img-element */
"use client";


import styles from "./styles.module.css";
import InputField from "../../components/InputField";
import ImageSlider from '../../components/ImageSlider';
import AppButton from '../../components/AppButton';
import Link from "next/link";

import { Col, Container, Row } from "react-bootstrap";




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
      <Container>
        <Row>
          <Col xs lg={6} sm={12}>  <div className={styles.loginSection}>
            <p className={styles.welcome}>Hello, Welcome!</p>
            <p className={styles.description}>
              With affordable packages and activities, FlyFish welcomes adventurers
              of ALL ages and skill levels!
            </p>
            <form className={styles.loginForm}>

                <p className={styles.inputEmail}>
                  Full Name *
                </p>
                <InputField placeholder={"John Doe"} />
              <p className={styles.inputEmail}>
                Email Address *
              </p>
              <InputField placeholder={"testing@gmail.com"} type={"email"}/>

              <p className={styles.inputEmail}>
                Refferal Code (Optional)
              </p>
              <InputField placeholder={""} />
              <p className={styles.inputEmail}>
                 Password *
              </p>
              <InputField placeholder={""} type={"password"} />
              <p className={styles.inputEmail}>
              Confirm   Password *
              </p>
              <InputField placeholder={""} type={"password"} />
              <div className={styles.empty}></div>
              <AppButton title={"Sign Up"} />
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
              Already have an account? <Link href="/SignIn">SIGN IN</Link>
            </p>
          </div>
          </Col>
          <Col xs lg={6} sm={12}>   <ImageSlider slides={slides} /></Col>
        </Row>
      </Container>

    </div>
  );
}