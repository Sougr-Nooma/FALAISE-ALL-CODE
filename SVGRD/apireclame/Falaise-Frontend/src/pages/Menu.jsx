import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CATEGORIES = [
  { id: "cafes", titre: "Cafés", couleur: "bg-amber-100" },
  { id: "jus", titre: "Jus & Boissons", couleur: "bg-green-100" },
  { id: "pates", titre: "Pâtes", couleur: "bg-yellow-100" },
  { id: "pizzas", titre: "Pizzas", couleur: "bg-red-100" },
  { id: "poissons", titre: "Poissons", couleur: "bg-blue-100" },
  { id: "desserts", titre: "Desserts", couleur: "bg-pink-100" },
];

// DONNÉES EN DUR (fake)
const PRODUITS = [
  { id: 1, nom: "Espresso", prix: "12", categorie: "cafes", description: "" },
  { id: 2, nom: "Cappuccino", prix: "18", categorie: "cafes", description: "" },
  { id: 3, nom: "Jus d'orange", prix: "25", categorie: "jus", description: "Pressé" },
  { id: 4, nom: "Spaghetti carbonara", prix: "65", categorie: "pates", description: "" },
  { id: 5, nom: "Margherita", prix: "60", categorie: "pizzas", description: "" },
];

export default function Menu() {
  return (
    <section className="py-32 px-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-secondary text-center mb-10">Carte complète</h1>
      <Swiper modules={[Navigation, Pagination]} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }} className="max-w-5xl mx-auto">
        {CATEGORIES.map((cat) => {
          const liste = PRODUITS.filter((p) => p.categorie === cat.id);
          return (
            <SwiperSlide key={cat.id}>
              <div className={`${cat.couleur} rounded-2xl p-8 shadow`}>
                <h2 className="text-3xl font-semibold text-secondary mb-6 text-center">{cat.titre}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {liste.map((p) => (
                    <div key={p.id} className="flex justify-between items-center bg-white/70 rounded-lg p-4">
                      <span className="font-medium">{p.nom}</span>
                      <span className="text-primary font-bold">{p.prix} DT</span>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}