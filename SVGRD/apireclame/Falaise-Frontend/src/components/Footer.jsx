import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-sm">

        {/* Liens rapides */}
        <div>
          <h3 className="font-semibold mb-3">Liens rapides</h3>
          <ul className="space-y-2">
            <li><NavLink to="/">Accueil</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            <li><NavLink to="/reservation">Réservation</NavLink></li>
            <li><NavLink to="/reclamation">Réclamation</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/a-propos">À propos</NavLink></li>
          </ul>
        </div>

        {/* Nous suivre */}
        <div>
          <h3 className="font-semibold mb-3">Nous suivre</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2">
            <li>+212 5 22 22 22 22</li>
            <li>+212 6 12 34 56 78</li>
            <li>
              <a
                href="https://maps.google.com/?q=La+Falaise+Restaurant"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Voir sur Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs">
        © 2024 La Falaise – Tous droits réservés
      </div>
    </footer>
  );
}