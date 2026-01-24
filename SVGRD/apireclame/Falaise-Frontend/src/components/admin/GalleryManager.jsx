export default function GalleryManager() {
  const fake = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    legende: `Photo ${i + 1}`,
    url: `https://picsum.photos/400/300?random=${i + 1}`,
  }));

  return (
    <div>
      <h3 className="text-2xl font-bold text-secondary mb-6">Galerie photos (FAKE)</h3>

      {/* Upload simulé */}
      <div className="mb-6">
        <input type="file" className="mb-2" disabled />
        <button disabled className="bg-primary text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
          Télécharger (API à brancher)
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {fake.map((p) => (
          <div key={p.id} className="relative group">
            <img src={p.url} alt={p.legende} className="w-full h-40 object-cover rounded-lg" />
            <button className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}