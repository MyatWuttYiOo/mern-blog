import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx"; 
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">

        <Outlet />
        <Footer/>
      </main>
    </div>
  );
}