import Image from 'next/image'
import styles from './page.module.css'
import SignIn from "./SignIn/template";
import "./globals.css";

export default function Home() {
  return (
    <SignIn />
  )
}
