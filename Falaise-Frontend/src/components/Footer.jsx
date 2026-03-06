import { NavLink } from "react-router-dom";

export default function Footer() {
  
  // Fonction pour scroller vers une section
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#111B1C] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-sm">

        {/* Liens rapides */}
        <div>
          <h3 className="font-semibold mb-3">Liens rapides</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => scrollToSection('#accueil')}
                className="hover:text-primary transition text-left"
              >
                Accueil
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('#menu')}
                className="hover:text-primary transition text-left"
              >
                Menu
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('#reservation')}
                className="hover:text-primary transition text-left"
              >
                Réservation
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('#reclamation')}
                className="hover:text-primary transition text-left"
              >
                Réclamation
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('#blog')}
                className="hover:text-primary transition text-left"
              >
                Blog
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('#a-propos')}
                className="hover:text-primary transition text-left"
              >
                À propos
              </button>
            </li>
          </ul>
        </div>

        {/* Nous suivre */}
        <div>
          <h3 className="font-semibold mb-3">Nous suivre</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://www.facebook.com/share/1hLvbTQcFV/" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                Facebook
              </a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/cafelafalaise?igsh=NXR3NTBwbmxsaDdz" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-primary transition"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2">
            <li>+216 58 112 311</li>
            <li>
              <a
                href="https://maps.app.goo.gl/GfDyANsaoc2Yt9L7A"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-primary transition"
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