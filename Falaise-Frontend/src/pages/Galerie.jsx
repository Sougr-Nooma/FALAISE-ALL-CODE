import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhotoModal from "../components/PhotoModal";
import axios from "axios";

export default function Galerie() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  // Déclarer la fonction
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/gallery");
      setItems(res.data);
    } catch (err) {
      console.error("Erreur chargement galerie", err);
    }
    setLoading(false);
  };

  // Wrapper pour éviter l'appel synchrone direct
  useEffect(() => {
    const loadItems = () => {
      fetchItems();
    };
    loadItems();
  }, []);

  const open = (i) => setIndex(i);
  const close = () => setIndex(-1);

  const isVideo = (item) => item.type === "video";

  if (loading) return <div className="py-32 text-center">Chargement...</div>;

  return (
    <>
      {index >= 0 && (
        <PhotoModal items={items} startIndex={index} onClose={close} />
      )}

      <section className="py-32 px-6 bg-white min-h-screen">
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
            {items.map((item, i) => (
              <figure
                key={item.id}
                onClick={() => open(i)}
                className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl cursor-pointer"
              >
                {isVideo(item) ? (
                  item.video_url ? (
                    <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
                      <span className="text-white text-4xl">▶️</span>
                    </div>
                  ) : (
                    <video
                      src={`http://localhost:8000/storage/${item.file_path}`}
                      className="w-full h-64 object-cover"
                      preload="metadata"
                    />
                  )
                ) : (
                  <img
                    src={`http://localhost:8000/storage/${item.file_path}`}
                    alt={item.titre}
                    className="w-full h-64 object-cover"
                  />
                )}
                
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    isVideo(item) ? "bg-red-600 text-white" : "bg-blue-600 text-white"
                  }`}>
                    {isVideo(item) ? "🎥" : "📷"}
                  </span>
                </div>

                <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-3 translate-y-full group-hover:translate-y-0 transition">
                  {item.titre}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}