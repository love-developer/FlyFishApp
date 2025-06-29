import { Inter, Hind, Anton, Montserrat, Lora, Inria_Serif } from "next/font/google";
import CustomCursor from "./components/CustomCursor"; // Add this import
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Navbar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const hind = Hind({
  subsets: ["latin"],
  variable: "--font-hind",
  weight: ["300", "400", "500", "600", "700"],
});

const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  weight: '400', // Anton has only one weight
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: '--font-lora',
  weight: ["400", "500", "600", "700"],
});

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  variable: '--font-inria-serif',
  weight: ["400", "700"],
});

export const metadata = {
  title: "FlyFish | Adventure Platform",
  description: "Explore adventures, activities, and more with FlyFish.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${hind.variable} ${anton.variable} ${montserrat.variable} ${lora.variable} ${inriaSerif.variable} main`}>
      <body className="font-inter">
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        {/* <CustomCursor /> */}
      </body>
    </html>
  );
}