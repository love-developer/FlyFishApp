export const metadata = {
  title: "Apply Now - ESK IT",
  description: "ESK IT",
};

import Navbar from "../components/NavBar";


export default function RootLayout({ children }) {
  return(
<div>
  
    <Navbar />
    {children}
    </ div>
  ) 
}
