import { useEffect, useState } from "react";
import axios from "axios";

const STATUS_COLORS = {
  nouvelle: 'bg-yellow-100 text-yellow-800',
  confirmée: 'bg-green-100 text-green-800',
  annulée: 'bg-red-100 text-red-800',
  terminée: 'bg-gray-100 text-gray-600',
};

export default function ReservationManager() {
  const [reservations, setReservations] = useState([]);

  // DÉCLARER AVANT useEffect
  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error("Erreur chargement", err);
    }
  };

  // APPEL INDIRECT via fonction wrapper
  useEffect(() => {
    const loadReservations = () => {
      fetchReservations();
    };
    
    loadReservations();
    const interval = setInterval(loadReservations, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8000/api/reservations/${id}`, { status });
      fetchReservations();
    } catch (err) {
      console.error("Erreur mise à jour", err);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondary mb-6">Réservations reçues</h3>
      
      <div className="space-y-4">
        {reservations.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COLORS[r.status]}`}>
                    {r.status}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {r.date} à {r.heure}
                  </span>
                </div>
                
                <p className="font-semibold text-lg">{r.nom}</p>
                <p className="text-sm text-gray-600">{r.telephone} | {r.email || '-'}</p>
                <p className="text-primary font-bold mt-1">{r.personnes} personnes</p>
                {r.remarques && <p className="text-sm text-gray-500 mt-2">"{r.remarques}"</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                {r.status === 'nouvelle' && (
                  <>
                    <button onClick={() => updateStatus(r.id, 'confirmée')} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                      Confirmer
                    </button>
                    <button onClick={() => updateStatus(r.id, 'annulée')} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Annuler
                    </button>
                  </>
                )}
                {r.status === 'confirmée' && (
                  <button onClick={() => updateStatus(r.id, 'terminée')} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                    Marquer terminée
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}