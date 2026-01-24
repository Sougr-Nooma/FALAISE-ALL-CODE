import { useState } from "react";
// REMPLACE :
// import { useMenu } from "../../hooks/useMenu";

// PAR :
import { useMenu } from "../../context/MenuContext";

const CATEGORIES = [
  { value: "cafes", label: "Cafés" },
  { value: "jus", label: "Jus & Boissons" },
  { value: "pates", label: "Pâtes" },
  { value: "pizzas", label: "Pizzas" },
  { value: "poissons", label: "Poissons" },
  { value: "desserts", label: "Desserts" },
];

export default function CarteManager() {
  const { addProduit } = useMenu();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    categorie: "cafes",
    type: "",
    nom: "",
    prix: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom || !form.prix) return alert("Nom et prix sont obligatoires");
    addProduit(form);
    setForm({ categorie: "cafes", type: "", nom: "", prix: "", description: "" });
    setShowForm(false);
    alert("✅ Produit ajouté ! Va voir la carte.");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-secondary">Gestion de la carte</h3>

      {/* BOUTON */}
      <button
        onClick={() => setShowForm((s) => !s)}
        className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        {showForm ? "Fermer" : "Ajouter des produits"}
      </button>

      {/* FORMULAIRE */}
      {showForm && (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 bg-white rounded-2xl shadow p-6">
          <div>
            <label className="block text-sm font-medium mb-1">Catégorie *</label>
            <select name="categorie" value={form.categorie} onChange={(e) => setForm({...form, categorie: e.target.value})} required className="w-full px-4 py-2 border rounded-lg">
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type (optionnel)</label>
            <input name="type" value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} placeholder="Ex. Boisson" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input name="nom" value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} required placeholder="Espresso" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prix * (MAD)</label>
            <input name="prix" type="number" value={form.prix} onChange={(e) => setForm({...form, prix: e.target.value})} required placeholder="25" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description (optionnel)</label>
            <textarea name="description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} placeholder="Court texte" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-orange-600">Ajouter le produit</button>
          </div>
        </form>
      )}
    </div>
  );
}