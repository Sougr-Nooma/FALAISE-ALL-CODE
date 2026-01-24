import { useState } from "react";

const CATEGORIES = [
  { value: "all",       label: "All" },
  { value: "cafes",     label: "Cafés" },
  { value: "jus",       label: "Jus & Boissons" },
  { value: "pates",     label: "Pâtes" },
  { value: "pizzas",    label: "Pizzas" },
  { value: "poissons",  label: "Poissons" },
  { value: "desserts",  label: "Desserts" },
];

export default function CarteManager() {
  const [categorie, setCategorie] = useState("all");

  return (
    <div className="space-y-6">
      {/* Titre */}
      <h3 className="text-2xl font-bold text-secondary">Gestion de la carte</h3>

      {/* Ligne outils */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Bouton Ajouter */}
        <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
          Ajouter des produits
        </button>

        {/* Menu déroulant Catégorie */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Catégorie des produits</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ici le tableau viendra plus tard quand tu diras "next" */}
      {/* <div className="hidden">TABLEAU</div> */}
    </div>
  );
}