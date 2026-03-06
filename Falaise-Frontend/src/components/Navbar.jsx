import useScrollTo from "../hooks/useScrollTo";

const links = [
  { label: "Accueil",      anchor: "#accueil" },
  { label: "Menu",         anchor: "#menu" },
  { label: "Réservation",  anchor: "#reservation" },
  { label: "Blog",         anchor: "#blog" },
  { label: "À propos",     anchor: "#a-propos" },
];

export default function Navbar() {
  const scroll = useScrollTo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111B1C] backdrop-blur shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO + NOM à gauche */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scroll("#accueil")}
        >
          <img 
            src="/IMG\LOGO FALAISE.png"                    // ← mets ton logo ici
            alt="Logo La Falaise" 
            className="h-15 w-auto max-w-[240px] object-contain rounded-lg" //object-contain rounded-lg. rounded-full object-cover
          />
          {/* <span className="text-2xl font-extrabold text-primary">
            La Falaise
          </span> */}
        </div>

        {/* Liens de navigation au centre */}
        <div className="hidden md:flex space-x-2">
          {links.map((l) => (
            <button
              key={l.anchor}
              onClick={() => scroll(l.anchor)}
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#2F2F2F] transition"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Bouton aide à droite */}
        <button
          onClick={() => scroll("#reclamation")}
          className="hidden md:block ml-4 bg-primary text-[#2F2F2F] px-5 py-2 rounded-lg shadow hover:bg-[#e6dbc4] transition text-sm"
        >
          Aidez-nous à nous améliorer
        </button>

        {/* Menu mobile */}
        <button className="md:hidden text-2xl">☰</button>
      </nav>
    </header>
  );
}