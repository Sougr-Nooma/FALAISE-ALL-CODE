import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Galerie from "./pages/Galerie";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/AdminFalaise-gestion123" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
// ...