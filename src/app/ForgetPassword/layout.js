import Navbar from "../components/NavBar";

export const metadata = {
  title: "Apply Now - ESK IT",
  description: "ESK IT",
};

export default function RootLayout({ children }) {
  return(
    <div className="main">
    
        <Navbar />
        {children}
        </ div>
      ) 
}
