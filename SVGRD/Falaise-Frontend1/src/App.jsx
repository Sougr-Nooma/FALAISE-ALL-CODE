import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home      from "./pages/Home";
import Menu      from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Reclamation from "./pages/Reclamation";
import Blog      from "./pages/Blog";
import About     from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/menu"        element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reclamation" element={<Reclamation />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/a-propos"    element={<About />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}