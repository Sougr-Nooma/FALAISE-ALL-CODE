// import axios from "axios";
import { useEffect } from "react";
// import { useMenu } from "../context/MenuContext";
import { useMenu } from "../hooks/useMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CATEGORIES = [
  { id: "suplements", titre: "Suppléments", couleur: "bg-amber-100" },
  { id: "petitdej", titre: "Petits Déjeuner", couleur: "bg-amber-100" },
  { id: "cafes", titre: "Cafés", couleur: "bg-amber-100" },
  { id: "the", titre: "Chauds", couleur: "bg-amber-100" },
  { id: "jus", titre: "Jus & Boissons", couleur: "bg-green-100" },
  { id: "froidglace", titre: "Froids & Glace", couleur: "bg-green-100" },
  { id: "pate", titre: "Crêpes-Gauffres-Pancakes", couleur: "bg-green-100" },
  { id: "pizzas", titre: "Pizzas", couleur: "bg-red-100" },
  { id: "sandwich", titre: "Tacos-Hamburger", couleur: "bg-green-100" },
  { id: "omelette", titre: "Omelette", couleur: "bg-yellow-100" },
  { id: "salades", titre: "Salades", couleur: "bg-yellow-100" },
  { id: "pates", titre: "Pâtes: Spaghettis-Tagliatelle-Penne", couleur: "bg-yellow-100" },
  // { id: "plat", titre: "Plats", couleur: "bg-yellow-100" },
  { id: "mer", titre: "Saveur Marine", couleur: "bg-blue-100" },
  { id: "poulet", titre: "Volailles", couleur: "bg-blue-100" },
  { id: "boeuf", titre: "Bovins", couleur: "bg-blue-100" },
  { id: "specialte", titre: "SPECIALITES FALAISE", couleur: "bg-pink-100" },
  { id: "chicha", titre: "Chichas", couleur: "bg-pink-100" },
  { id: "desserts", titre: "Desserts", couleur: "bg-pink-100" },
];

export default function Menu() {
  const { dishes, fetchDishes } = useMenu();

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <section className="py-32 px-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-secondary text-center mb-10">Carte complète</h1>
      
      {dishes.length === 0 ? (
        <p className="text-center text-gray-500">Aucun plat disponible pour le moment</p>
      ) : (
        <Swiper modules={[Navigation, Pagination]} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }} className="max-w-5xl mx-auto">
          {CATEGORIES.map((cat) => {
            const liste = dishes
            .filter((p) => p.categorie === cat.id) 
            .sort((a, b)=> {
              // 1) on groupe par type (les '' à la fin)
              const typeA = a.type || 'aa';
              const typeB = b.type || 'aa';
              if (typeA !== typeB) return typeA.localeCompare(typeB);
              // 2) à l'intérieur d'un même type : prix croissant
              return parseFloat(a.prix) - parseFloat(b.prix);
            });
            if (liste.length === 0) return null; // Cache les catégories vides
            
            return (
              <SwiperSlide key={cat.id}>
                <div className={`${cat.couleur} rounded-2xl p-8 shadow`}>
                  <h2 className="text-3xl font-semibold text-secondary mb-6 text-center">{cat.titre}</h2>
                  {/* {p.type && (<p className="text-xs text-gray-400 italic">{p.type}</p>)} */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {
                      /* ----- on balaye la liste, on affiche le type quand il change ----- */
                      liste.map((p, idx) => {
                        const showType = p.type && (idx === 0 || liste[idx - 1].type !== p.type);
                        return (
                          <div key={p.id} className="contents">
                            {/* ----- libellé centré (sur 2 colonnes) ----- */}
                            {showType && (
                              <div className="col-span-2 text-center mb-2 mt-4">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 uppercase tracking-wide bg-white/60 rounded-full">
                                  {p.type}
                                </span>
                              </div>
                            )}

                            {/* ----- carte produit (identique à avant) ----- */}
                            {/* <div className="flex justify-between items-center bg-white/70 rounded-lg p-4">
                              <div>
                                <span className="font-medium">{p.nom}</span>
                                {p.description && <p className="text-xs text-gray-500">{p.description}</p>}
                              </div>
                              <span className="text-primary font-bold">{p.prix} DT</span>
                            </div> */}
                            {/* ----- carte produit ----- */}
                            <div className="flex justify-between items-start bg-white/70 rounded-lg p-4 gap-4">
                              <div className="flex-1 min-w-0">
                                <span className="font-medium block">{p.nom}</span>
                                {p.description && (
                                  <p className="text-xs text-gray-500 mt-1 break-words">
                                    {p.description}
                                  </p>
                                )}
                              </div>
                              {/* Prix fixe, jamais de retour à la ligne */}
                              <span className="text-primary font-bold whitespace-nowrap shrink-0">
                                {p.prix} TDN
                              </span>
                            </div>
                          </div>
                        );
                      })
                    }
                    {/* {liste.map((p) => (
                      <div key={p.id} className="flex justify-between items-center bg-white/70 rounded-lg p-4">
                        <div>
                          <span className="font-medium">{p.nom}</span>
                          {p.description && <p className="text-xs text-gray-500">{p.description}</p>}
                        </div>
                        <span className="text-primary font-bold">{p.prix} TDN</span>
                      </div>
                    ))} */}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
}