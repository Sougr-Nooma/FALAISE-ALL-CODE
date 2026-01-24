import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogSlides from "../data/blogSlides";

export default function BlogSection() {
  const [idx, setIdx] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % blogSlides.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIdx((i) => (i + 1) % blogSlides.length);
  const prev = () => setIdx((i) => (i - 1 + blogSlides.length) % blogSlides.length);

  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-12">Blog & Moments</h2>

        {/* Carrousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src={blogSlides[idx].url}
              alt={blogSlides[idx].legende}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold">{blogSlides[idx].legende}</h3>
            </div>
          </div>

          {/* Flèches */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
          >
            ›
          </button>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-4">
            {blogSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === idx ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bouton vers page galerie */}
        <button
          onClick={() => nav("/galerie")}
          className="mt-10 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Accéder à notre galerie
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}