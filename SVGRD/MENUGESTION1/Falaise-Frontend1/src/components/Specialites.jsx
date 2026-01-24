import Carousel from "./Carousel";
import specialites from "../data/specialites";
import { useNavigate } from "react-router-dom";

export default function Specialites() {
  const nav = useNavigate();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-12">
          Nos spécialités
        </h2>

        {/* Carroursel */}
        <Carousel slides={specialites} />

        {/* Bouton Voir plus */}
        <button
          onClick={() => nav("/menu")}
          className="mt-10 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Voir le menu complet
          {/* flèche vers le bas */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}