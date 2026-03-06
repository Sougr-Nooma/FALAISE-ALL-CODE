import { useState, useRef } from "react";
import axios from "axios";

const SOURCES = [
  { value: "COMPTOIRE", label: "Comptoir" },
  { value: "CUISINE", label: "Cuisine" },
  { value: "CHICHA", label: "Chicha" },
  { value: "EMPLOYE", label: "Employé" },
];

export default function ReclamationSection() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    source: "COMPTOIRE",
    message: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('nom', form.nom);
    data.append('telephone', form.telephone);
    data.append('email', form.email);
    data.append('source', form.source);
    data.append('message', form.message);
    if (photo) data.append('photo', photo);

    try {
      await axios.post("http://localhost:8000/api/reclamations", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSent(true);
    } catch (err) {
      alert("Erreur lors de l'envoi");
      console.error(err);
    }
    setLoading(false);
  };

  

  

  if (sent) {
    return (
      <div className="py-24 bg-gray-50 text-center">
        <div className="bg-green-50 text-green-800 rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-2xl font-bold mb-2">Merci !</h3>
          <p>Votre réclamation a bien été envoyée. Nous vous répondrons rapidement.</p>
        </div>
      </div>
    );
  }

  return (
    <section id="reclamation" className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8">
          Réclamation
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 grid md:grid-cols-2 gap-6">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom (optionnel)</label>
            <input
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone (optionnel)</label>
            <input
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email (optionnel)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Source */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Source du problème *</label>
            <select
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SOURCES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Message *</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={4}
              placeholder="Décrivez votre problème..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Photo */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Photo (optionnel)</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInput}
              onChange={handlePhoto}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInput.current.click()}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:text-primary transition"
            >
              📷 {preview ? 'Changer la photo' : 'Prendre une photo'}
            </button>
            {preview && (
              <img
                src={preview}
                alt="Aperçu"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Bouton */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-[#2F2F2F] py-3 rounded-lg hover:bg-[#e6dbc4] disabled:opacity-50 transition"
            >
              {loading ? "Envoi en cours..." : "Envoyer la réclamation"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}