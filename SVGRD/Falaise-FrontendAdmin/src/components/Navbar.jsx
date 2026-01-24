import useScrollTo from "../hooks/useScrollTo";

const links = [
  { label: "Accueil",      anchor: "#accueil" },
  { label: "Menu",         anchor: "#menu" },
  { label: "Réservation",  anchor: "#reservation" },
  // { label: "Réclamation",  anchor: "#reclamation" },
  { label: "Blog",         anchor: "#blog" },
  { label: "À propos",     anchor: "#a-propos" },
];

export default function Navbar() {
  const scroll = useScrollTo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <span
          className="text-2xl font-extrabold text-primary cursor-pointer"
          onClick={() => scroll("#accueil")}
        >
          La Falaise
        </span>

        <div className="hidden md:flex space-x-2">
          {links.map((l) => (
            <button
              key={l.anchor}
              onClick={() => scroll(l.anchor)}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-primary transition"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll("#reclamation")}
          className="ml-4 bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Aidez-nous à nous améliorer
        </button>

        <button className="md:hidden text-2xl">☰</button>
      </nav>
    </header>
  );
}
