
import { Inter, Hind, Anton } from "next/font/google";
import CustomCursor from "./components/CustomCursor"; // Add this import
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Navbar from "./components/NavBar";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const hind = Hind({
  subsets: ["latin"],
  variable: "--font-hind",
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400', // Anton has only one weight
});

export const metadata = {
  title: "FlyFish | Adventure Platform",
  description: "Explore adventures, activities, and more with FlyFish.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${hind.variable} ${anton.variable} main`}>
      <body className="font-inter">
        {children}
        {/* <CustomCursor /> */}
      </body>
    </html>
  );
}