import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotoModal from "../components/PhotoModal";

export default function Galerie() {
  const nav = useNavigate();
  const [index, setIndex] = useState(-1); // -1 = fermé

  /* 30 photos */
  const photos = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    legende: `Photo ${i + 1}`,
    url: `https://picsum.photos/1200/800?random=${i + 1}`,
  }));

  const open = (i) => setIndex(i);
  const close = () => setIndex(-1);

  return (
    <>
      {index >= 0 && (
        <PhotoModal photos={photos} startIndex={index} onClose={close} />
      )}

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => nav(-1)}
            className="mb-8 text-primary hover:underline"
          >
            ← Retour
          </button>
          <h1 className="text-4xl font-bold text-secondary text-center mb-12">
            Notre galerie
          </h1>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((p, i) => (
              <figure
                key={p.id}
                onClick={() => open(i)}
                className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl cursor-pointer"
              >
                <img
                  src={p.url}
                  alt={p.legende}
                  className="w-full h-64 object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 translate-y-full group-hover:translate-y-0 transition">
                  {p.legende}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}