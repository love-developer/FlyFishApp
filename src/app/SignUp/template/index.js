/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import InputField from "../../components/InputField";
import ImageSlider from '../../components/ImageSlider';
import AppButton from '../../components/AppButton';
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const { signup, signInWithGoogle, signInWithFacebook } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.fullName);
      router.push("/HomeScreen");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setError("");
    setLoading(true);

    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else if (provider === "facebook") {
        await signInWithFacebook();
      }
      router.push("/HomeScreen");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <p className={styles.inputEmail}>
                Full Name *
              </p>
              <InputField 
                placeholder={"John Doe"}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <p className={styles.inputEmail}>
                Email Address *
              </p>
              <InputField 
                placeholder={"testing@gmail.com"}
                type={"email"}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <p className={styles.inputEmail}>
                Referral Code (Optional)
              </p>
              <InputField 
                placeholder={""}
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
              />
              <p className={styles.inputEmail}>
                Password *
              </p>
              <InputField 
                placeholder={""}
                type={"password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className={styles.inputEmail}>
                Confirm Password *
              </p>
              <InputField 
                placeholder={""}
                type={"password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className={styles.empty}></div>
              <AppButton 
                title={loading ? "Loading..." : "Sign Up"} 
                type="submit"
                disabled={loading}
              />
            </form>
            <div className={styles.socialLogin}>
              <p className={styles.orLogin}> Or sign up with</p>
              <div className={styles.socialIcons}>
                <button 
                  className={styles.fbButton}
                  onClick={() => handleSocialSignIn("facebook")}
                  disabled={loading}
                >
                  <img
                    src="/fb.png"
                    alt="Facebook"
                    className="fb-icon"
                    width="30"
                    height="30"
                  />
                </button>
                <button 
                  className={styles.fbButton}
                  onClick={() => handleSocialSignIn("google")}
                  disabled={loading}
                >
                  <img
                    src="/google.png"
                    alt="google"
                    className="fb-icon"
                    width="30"
                    height="30"
                  />
                </button>
                <button 
                  className={styles.fbButton}
                  disabled={loading}
                >
                  <img
                    src="/iphone.png"
                    alt="apple"
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