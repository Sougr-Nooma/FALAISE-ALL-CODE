import { useEffect, useState } from "react";
import axios from "axios";

export default function ReclaManager() {
  const [reclamations, setReclamations] = useState([]);

  // Fonction de chargement
  const fetchReclamations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/reclamations");
      setReclamations(res.data);
    } catch (err) {
      console.error("Erreur chargement", err);
    }
  };

  // useEffect avec fonction interne
  useEffect(() => {
    // Fonction interne pour éviter l'appel direct
    const loadReclamations = () => {
      fetchReclamations();
    };

    loadReclamations(); // Premier chargement

    const interval = setInterval(loadReclamations, 10000);

    return () => clearInterval(interval);
  }, []); // fetchReclamations n'est pas dans les dépendances car stable

  const marquerTraite = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/reclamations/${id}`, {
        status: "traité"
      });
      fetchReclamations();
    } catch (err) {
      console.error("Erreur mise à jour", err);
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case "COMPTOIRE": return "bg-blue-100 text-blue-800";
      case "CUISINE": return "bg-red-100 text-red-800";
      case "CHICHA": return "bg-purple-100 text-purple-800";
      case "EMPLOYE": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondary mb-6">
        Réclamations reçues
      </h3>

      <div className="space-y-4">
        {reclamations.map((r) => (
          <div
            key={r.id}
            className={`bg-white rounded-xl shadow p-4 ${r.status === "traité" ? "opacity-60" : ""}`}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${getSourceColor(r.source)}`}>
                  {r.source}
                </span>

                <p className="font-semibold">{r.nom || "Anonyme"}</p>
                <p className="text-sm text-gray-600">
                  {r.telephone || "-"} | {r.email || "-"}
                </p>
                <p className="mt-2 text-gray-800">{r.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(r.created_at).toLocaleString()}
                </p>

                {r.photo_path && (
                  <img
                    src={`http://localhost:8000/storage/${r.photo_path}`}
                    alt="Photo réclamation"
                    className="mt-3 w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    onClick={() => window.open(`http://localhost:8000/storage/${r.photo_path}`, '_blank')}
                  />
                )}
              </div>

              <div className="flex items-start">
                {r.status === "nouveau" ? (
                  <button
                    onClick={() => marquerTraite(r.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    Marquer traité
                  </button>
                ) : (
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    ✓ Traité
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}