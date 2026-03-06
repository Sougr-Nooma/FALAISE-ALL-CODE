import { useState } from "react";

const CATS = [
  { value: "cafes",     label: "Cafés" },
  { value: "jus",       label: "Jus & Boissons" },
  { value: "pates",     label: "Pâtes" },
  { value: "pizzas",    label: "Pizzas" },
  { value: "poissons",  label: "Poissons" },
  { value: "desserts",  label: "Desserts" },
];

export default function AddProductModal({ onClose }) {
  const [form, setForm] = useState({
    nom: "",
    categorie: "cafes",
    prix: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // envoi vers Laravel
    const res = await fetch("http://localhost:8000/api/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Produit ajouté !");
      onClose(); // fermer le modal
    } else {
      alert("Erreur lors de l’ajout");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-xl font-bold text-secondary mb-4">Ajouter un produit</h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie *</label>
            <select
              name="categorie"
              value={form.categorie}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              {CATS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Nom du produit */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom du produit *</label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Espresso"
              required
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium mb-1">Prix (DT) *</label>
            <input
              name="prix"
              type="number"
              step="0.01"
              value={form.prix}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="12"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Court texte (optionnel)"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}