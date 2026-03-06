import { Link } from "react-router-dom";
import useScrollTo from "../hooks/useScrollTo";

export default function Hero() {
  const scroll = useScrollTo();
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      {/* image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* contenu */}
      <div className="relative text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Découvrez l’authenticité
          <br />
          <span className="text-primary">au bord de la mer</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl">
          Poissons frais du jour, ambiance conviviale et vue imprenable sur l’océan.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            <Link to="/menu" className="px-8 py-3 rounded-lg bg-primary text-[#2F2F2F] hover:bg-[#e6dbc4] transition shadow-lg">
                Voir le Menu Complet
            </Link>

            <button
            onClick={() => scroll("#reservation")}
            className="px-8 py-3 rounded-lg border-2 border-white hover:bg-[#e6dbc4] hover:text-secondary transition"
          >
            Réserver maintenant
          </button>
        </div>
      </div>
    </section>
  );
}