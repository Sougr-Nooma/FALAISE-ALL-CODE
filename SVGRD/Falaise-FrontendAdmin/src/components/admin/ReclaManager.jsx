export default function ReclaManager() {
  const fake = [
    { id: 1, nom: "Jean", source: "CUISINE", message: "Plat froid", status: "nouveau" },
    { id: 2, nom: "Anonyme", source: "COMPTOIRE", message: "Erreur addition", status: "traité" },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondary mb-6">Réclamations (FAKE)</h3>
      <div className="space-y-4">
        {fake.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{r.nom || "Anonyme"}</p>
              <p className="text-sm text-gray-600">{r.source} - {r.message}</p>
            </div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded text-sm ${
                  r.status === "traité"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-green-100"
                }`}
              >
                Marquer traité
              </button>
              <button className="px-3 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300">
                Archiver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}