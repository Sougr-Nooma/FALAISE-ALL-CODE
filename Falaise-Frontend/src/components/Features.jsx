export default function Features() {
  const cards = [
    {
      emoji: "🐟",
      title: "Produits frais du jour",
      desc: "Notre poisson est acheté chaque matin aux enchères de la criée.",
    },
    {
      emoji: "🌅",
      title: "Vue sur l’océan",
      desc: "Profitez d’un coucher de soleil tout en dégustant vos plats.",
    },
    {
      emoji: "👨‍🍳",
      title: "Chef expérimenté",
      desc: "Une cuisine traditionnelle revisitée avec une touche moderne.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Pourquoi choisir La Falaise ?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{c.emoji}</div>
              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}