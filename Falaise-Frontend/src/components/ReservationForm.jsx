import { useState } from "react";
import axios from "axios";

export default function ReservationForm() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    date: "",
    heure: "",
    personnes: 10,
    remarques: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.personnes < 10) {
      alert("Minimum 10 personnes requis");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/reservations", form);
      setSent(true);
    } catch (err) {
      alert("Erreur lors de l'envoi");
      console.error(err);

      
    }
    setLoading(false);
  };

  if (sent) return (
    <div className="py-24 bg-gray-50 text-center">
      <div className="bg-green-50 text-green-800 rounded-lg p-8 max-w-lg mx-auto">
        <h3 className="text-2xl font-bold mb-2">Réservation envoyée !</h3>
        <p>Nous vous confirmerons par téléphone dans les plus brefs délais.</p>
      </div>
    </div>
  );

  return (
    <section id="reservation" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8">Réserver une table</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input required value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone *</label>
            <input required value={form.telephone} onChange={(e) => setForm({...form, telephone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email (optionnel)</label>
            <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input type="date" required min={new Date().toISOString().split('T')[0]} value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Heure *</label>
            <select required value={form.heure} onChange={(e) => setForm({...form, heure: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Choisir</option>
              {['11:00','12:00','13:00','14:00','19:00','20:00','21:00','22:00'].map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Nombre de personnes * (min. 10)</label>
            <input type="number" required min="10" value={form.personnes} onChange={(e) => setForm({...form, personnes: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            {form.personnes < 10 && <p className="text-red-500 text-sm mt-1">Minimum 10 personnes</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarques (optionnel)</label>
            <textarea rows={3} value={form.remarques} onChange={(e) => setForm({...form, remarques: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Allergies, occasion spéciale..." />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="w-full bg-primary text-[#2F2F2F] py-3 rounded-lg hover:bg-[#e6dbc4] disabled:opacity-50">
              {loading ? "Envoi..." : "Demander une réservation"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}