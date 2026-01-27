import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    description: "",
    type: "photo",
    video_url: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/gallery");
      setItems(res.data);
    } catch (err) {
      console.error("Erreur chargement", err);
    }
  };

  useEffect(() => {
    const loadItems = () => fetchItems();
    loadItems();
  }, []);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Vérification taille (50Mo max)
    if (selected.size > 50 * 1024 * 1024) {
      alert("Fichier trop grand. Maximum 50 Mo.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Veuillez sélectionner un fichier");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("titre", form.titre);
    data.append("description", form.description);
    data.append("type", form.type);
    data.append("file", file);
    if (form.video_url) data.append("video_url", form.video_url);

    try {
      await axios.post("http://localhost:8000/api/gallery", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ titre: "", description: "", type: "photo", video_url: "" });
      setFile(null);
      setPreview(null);
      setShowForm(false);
      fetchItems();
    } catch (err) {
      alert("Erreur lors de l'upload");
      console.error(err);
    }
    setLoading(false);
  };

  const deleteItem = async (id) => {
    if (!confirm("Supprimer cet élément ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/gallery/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const isVideo = (item) => item.type === "video";

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondary mb-6">Galerie photos & vidéos</h3>

      <button
        onClick={() => setShowForm((s) => !s)}
        className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-orange-600 mb-6"
      >
        {showForm ? "Fermer" : "Ajouter un média"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type *</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="photo">Photo</option>
              <option value="video">Vidéo (max 50 Mo, 60 sec)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Titre *</label>
            <input
              required
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Soirée du 14 juillet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          {form.type === "video" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Lien YouTube/Vimeo (optionnel, pour vidéos longues)
              </label>
              <input
                type="url"
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Ou uploader une vidéo courte directement (max 50 Mo)
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Fichier *</label>
            <input
              type="file"
              accept={form.type === "photo" ? "image/*" : "video/*"}
              ref={fileInput}
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInput.current.click()}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary"
            >
              📁 {form.type === "photo" ? "Choisir une photo" : "Choisir une vidéo"}
            </button>
            {preview && (
              <div className="mt-4">
                {form.type === "photo" ? (
                  <img src={preview} alt="Aperçu" className="w-32 h-32 object-cover rounded-lg" />
                ) : (
                  <video src={preview} className="w-64 h-36 rounded-lg" controls />
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} Mo)
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Upload..." : "Ajouter à la galerie"}
          </button>
        </form>
      )}

      {/* Grille galerie */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative group bg-white rounded-xl shadow overflow-hidden">
            {isVideo(item) ? (
              item.video_url ? (
                // Vidéo externe (YouTube/Vimeo)
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <a
                    href={item.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white text-center p-4"
                  >
                    ▶️ Voir sur {item.video_url.includes("youtube") ? "YouTube" : "Vimeo"}
                  </a>
                </div>
              ) : (
                // Vidéo uploadée
                <video
                  src={`http://localhost:8000/storage/${item.file_path}`}
                  className="w-full h-48 object-cover"
                  controls
                  preload="metadata"
                />
              )
            ) : (
              // Photo
              <img
                src={`http://localhost:8000/storage/${item.file_path}`}
                alt={item.titre}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-3">
              <h4 className="font-semibold truncate">{item.titre}</h4>
              {item.description && (
                <p className="text-sm text-gray-500 truncate">{item.description}</p>
              )}
              <span
                className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                  isVideo(item) ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {isVideo(item) ? "🎥 Vidéo" : "📷 Photo"}
              </span>
            </div>

            <button
              onClick={() => deleteItem(item.id)}
              className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}