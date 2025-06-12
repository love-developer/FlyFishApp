/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import styles from "./styles.module.css";
import Image from "next/image";
import InputField from "@/app/components/InputField";
import ImageSlider from '@/app/components/ImageSlider';
import AppButton from '@/app/components/AppButton';
import Navbar from '@/app/components/NavBar';
import GenderSelect from '@/app/components/GenderSelect';

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

  const [gender, setGender] = useState('');



  return (
    <div className={styles.container}>
      {/* Navigation Bar */}

      <Navbar />
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
                <InputField placeholder={"hassan"} type={"email"} />
              <p className={styles.inputEmail}>
                Email Address *
              </p>
              <InputField placeholder={"hassan"} />

              <p className={styles.inputEmail}>
                Refferal Code (Optional)
              </p>
              <InputField placeholder={"hassan"} />
              <Row>
                <Col xs lg={6} sm={12}>
                <GenderSelect
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
    
                </Col>
                <Col xs lg={6} sm={12}>
                  <p className={styles.inputEmail}>
                    Birth Year
                  </p>
                  <InputField placeholder={"hassan"} />
                </Col>
              </Row>
       
              <AppButton title={"Submit"} />
            </form>
          
              </div>


          </Col>
          <Col xs lg={6} sm={12}>   <ImageSlider slides={slides} /></Col>
        </Row>
      </Container>

    </div>
  );
}