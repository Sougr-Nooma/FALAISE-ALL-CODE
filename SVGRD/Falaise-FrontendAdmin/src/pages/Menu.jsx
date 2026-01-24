import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";


const categories = [
  { id: "cafes",   titre: "Cafés",      couleur: "bg-amber-100" },
  { id: "jus",     titre: "Jus & Boissons", couleur: "bg-green-100" },
  { id: "pates",   titre: "Pâtes",      couleur: "bg-yellow-100" },
  { id: "pizzas",  titre: "Pizzas",     couleur: "bg-red-100" },
  { id: "poissons",titre: "Poissons",   couleur: "bg-blue-100" },
  { id: "desserts",titre: "Desserts",   couleur: "bg-pink-100" },
];

/* Exemple de produits par catégorie (à remplacer par API plus tard) */
const produits = {
  cafes: [
    { nom: "Espresso",        prix: "12 MAD" },
    { nom: "Café crème",      prix: "15 MAD" },
    { nom: "Cappuccino",      prix: "18 MAD" },
    { nom: "Latte macchiato", prix: "22 MAD" },
  ],
  jus: [
    { nom: "Jus d’orange pressé", prix: "25 MAD" },
    { nom: "Jus de pastèque",     prix: "20 MAD" },
    { nom: "Smoothie tropical",   prix: "30 MAD" },
    { nom: "Milk-shake",          prix: "28 MAD" },
  ],
  pates: [
    { nom: "Spaghetti carbonara", prix: "65 MAD" },
    { nom: "Penne au saumon",     prix: "70 MAD" },
    { nom: "Tagliatelles aux crevettes", prix: "75 MAD" },
  ],
  pizzas: [
    { nom: "Margherita",     prix: "60 MAD" },
    { nom: "Peperoni",       prix: "70 MAD" },
    { nom: "4 fromages",     prix: "75 MAD" },
    { nom: "Fruits de mer",  prix: "85 MAD" },
  ],
  poissons: [
    { nom: "Filet de lieu",     prix: "90 MAD" },
    { nom: "Dorade royale",     prix: "120 MAD" },
    { nom: "Bouillabaisse",     prix: "130 MAD" },
  ],
  desserts: [
    { nom: "Tiramisu",       prix: "35 MAD" },
    { nom: "Crème brûlée",   prix: "30 MAD" },
    { nom: "Fondant chocolat", prix: "40 MAD" },
  ],
};

export default function Menu() {
  const nav = useNavigate();
  return (
    <section className="py-32 px-6 bg-white min-h-screen">
      <button
          onClick={() => nav(-1)}
          className="mb-8 text-primary hover:underline"
        >
          ← Retour
        </button>
      <h1 className="text-4xl font-bold text-secondary text-center mb-10">
        Carte complète
      </h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="max-w-5xl mx-auto"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className={`${cat.couleur} rounded-2xl p-8 shadow`}>
              <h2 className="text-3xl font-semibold text-secondary mb-6 text-center">
                {cat.titre}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {produits[cat.id]?.map((p) => (
                  <div
                    key={p.nom}
                    className="flex justify-between items-center bg-white/70 rounded-lg p-4"
                  >
                    <span className="font-medium text-gray-800">{p.nom}</span>
                    <span className="text-primary font-bold">{p.prix}</span>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}