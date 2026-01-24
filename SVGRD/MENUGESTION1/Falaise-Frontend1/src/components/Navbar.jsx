import { NavLink } from "react-router-dom";

export default function Navbar() {
  const link = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ` +
    (isActive
      ? "bg-primary text-white"
      : "text-gray-700 hover:bg-accent hover:text-primary");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-extrabold text-primary">
          La Falaise
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-2">
          <NavLink to="/" className={link}>Accueil</NavLink>
          <NavLink to="/menu" className={link}>Menu</NavLink>
          <NavLink to="/reservation" className={link}>Réservation</NavLink>
          <NavLink to="/reclamation" className={link}>Réclamation</NavLink>
          <NavLink to="/blog" className={link}>Blog</NavLink>
          <NavLink to="/a-propos" className={link}>À propos</NavLink>
        </div>

        {/* CTA toujours visible */}
        <NavLink
          to="/reservation"
          className="ml-4 bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Réserver une table
        </NavLink>

        {/* Burger mobile (simple) */}
        <button className="md:hidden text-2xl">☰</button>
      </nav>
    </header>
  );
}