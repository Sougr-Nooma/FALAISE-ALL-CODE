import { useState } from "react";

export default function Reservation() {
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    date: "",
    heure: "",
    personnes: 10,
    remarques: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent]     = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!form.nom.trim()) err.nom = "Nom requis";
    if (!form.telephone.trim()) err.telephone = "Téléphone requis";
    if (!form.email.trim()) err.email = "Email requis";
    if (!form.date) err.date = "Date requise";
    if (!form.heure) err.heure = "Heure requise";
    if (Number(form.personnes) < 10)
      err.personnes = "Minimum 10 personnes";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    console.log("Réservation :", form);
    setSent(true);
  };

  if (sent)
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow p-8 max-w-lg text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Demande envoyée !
          </h2>
          <p className="text-gray-600 mb-6">
            Nous vous confirmerons votre réservation par téléphone ou email
            dans les plus brefs délais.
          </p>
          <button
            onClick={() => setSent(false)}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Nouvelle réservation
          </button>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50 py-32 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-4xl font-bold text-secondary mb-8 text-center">
          Réserver votre table
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.nom ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nom && (
              <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone *</label>
            <input
              name="telephone"
              type="tel"
              value={form.telephone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.telephone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.telephone && (
              <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Heure */}
          <div>
            <label className="block text-sm font-medium mb-1">Heure *</label>
            <select
              name="heure"
              value={form.heure}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.heure ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Choisir --</option>
              {[...Array(17)].map((_, i) => {
                const h = 7 + i;
                return (
                  <option key={h} value={`${h}:00`}>
                    {h}:00
                  </option>
                );
              })}
            </select>
            {errors.heure && (
              <p className="text-red-500 text-xs mt-1">{errors.heure}</p>
            )}
          </div>

          {/* Nombre de personnes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Nombre de personnes *
            </label>
            <input
              name="personnes"
              type="number"
              min="10"
              value={form.personnes}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.personnes ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.personnes && (
              <p className="text-red-500 text-xs mt-1">{errors.personnes}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Minimum 10 personnes</p>
          </div>

          {/* Remarques */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarques</label>
            <textarea
              name="remarques"
              value={form.remarques}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Bouton */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Envoyer la demande
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}