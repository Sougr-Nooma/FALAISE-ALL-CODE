import { useState, useEffect } from "react";

export default function Carousel({ slides }) {
  const [idx, setIdx] = useState(0);

  /* auto-play 4s */
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto select-none">
      {/* IMAGE */}
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <img
          src={slides[idx].img}
          alt={slides[idx].title}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* LÉGENDE */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
        <h3 className="text-2xl font-bold">{slides[idx].title}</h3>
        <p className="text-sm opacity-90">{slides[idx].desc}</p>
      </div>

      {/* FLECHES */}
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

      {/* INDICATEURS */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
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
  );
}