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

export default function SignIn() {
  const router = useRouter();
  const { login, signInWithGoogle, signInWithFacebook } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
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
      <Container>
        <Row>
          <Col xs lg={6} sm={12}>
            <div className={styles.loginSection}>
              <p className={styles.welcome}>Hello, Welcome!</p>
              <p className={styles.description}>
                With affordable packages and activities, FlyFish welcomes adventurers
                of ALL ages and skill levels!
              </p>
              {error && <p className={styles.error}>{error}</p>}
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <p className={styles.inputTitle}>Enter Your Email *</p>
                  <InputField 
                    placeholder={"testing@gmail.com"} 
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <p className={styles.inputTitle}>Enter Your Password *</p>
                  <InputField 
                    placeholder={"*********"} 
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Link href="/ForgetPassword" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
                
                <AppButton 
                  title={loading ? "Loading..." : "Login"} 
                  type="submit"
                  disabled={loading}
                />
              </form>
              <div className={styles.socialLogin}>
                <p className={styles.orLogin}> Or login with</p>
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
                Dont have an account? <Link href="/SignUp">SIGN UP</Link>
              </p>
            </div>
          </Col>
          <Col xs lg={6} sm={12}>
            <ImageSlider slides={slides} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}