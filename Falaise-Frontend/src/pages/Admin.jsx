import { useState } from "react";
import ReclaManager from "../components/admin/ReclaManager";
import ReservationManager from "../components/admin/ReservationManager";
import GalleryManager from "../components/admin/GalleryManager";
import DishManager from "../components/admin/DishManager";

// Dans TABS:

// Dans le rendu:

const TABS = [
  { id: "carte", label: "Carte / Menu" },
  { id: "galerie", label: "Galerie photos & vidéos" },
  { id: "recla", label: "Réclamations" },
  { id: "reservations", label: "Réservations" },
  // { id: "carte", label: "Carte / Menu" }
  // { id: "galerie", label: "Galerie photos & vidéos" },

];

export default function Admin() {
  const [tab, setTab] = useState("recla"); // Par défaut sur réclamations pour tester
  const [pwd, setPwd] = useState("");
  const [auth, setAuth] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pwd === "AdminFalaise-gestion123") {
      setAuth(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-secondary mb-4">Admin La Falaise</h1>
          <label className="block text-sm font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            placeholder="AdminFalaise-gestion123"
          />
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-orange-600">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-secondary text-white p-6">
        <h2 className="text-xl font-bold mb-8">Tableau de bord</h2>
        <nav className="space-y-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                tab === t.id ? "bg-primary" : "hover:bg-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {tab === "carte" && <p>Gestion de la carte (à venir)</p>}
        {/* {tab === "galerie" && <p>Gestion de la galerie (à venir)</p>} */}
        {tab === "recla" && <ReclaManager />}
        {tab === "reservations" && <ReservationManager />}
        {tab === "galerie" && <GalleryManager />}
        {tab === "carte" && <DishManager />}
      </main>
    </div>
  );
}