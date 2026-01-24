export default function AboutSection() {
  return (
    <section id="a-propos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* GAUCHE : texte (Features) */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-secondary mb-8">
            Pourquoi choisir La Falaise ?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🐟</span>
              <div>
                <h3 className="text-xl font-semibold mb-1">Produits frais du jour</h3>
                <p className="text-gray-600">Notre poisson est acheté chaque matin aux enchères de la criée.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-4xl">🌅</span>
              <div>
                <h3 className="text-xl font-semibold mb-1">Vue sur l’océan</h3>
                <p className="text-gray-600">Profitez d’un coucher de soleil tout en dégustant vos plats.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-4xl">👨‍🍳</span>
              <div>
                <h3 className="text-xl font-semibold mb-1">Chef expérimenté</h3>
                <p className="text-gray-600">Une cuisine traditionnelle revisitée avec une touche moderne.</p>
              </div>
            </div>
          </div>
        </div>

        {/* DROITE : image libre + citation */}
        <div className="flex justify-center">
          <div className="bg-gray-50 rounded-2xl shadow p-8 max-w-lg w-full text-center">
            {/* Image aux dimensions libres */}
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1350&q=80"
              alt="Patron"
              className="w-full h-auto max-h-80 object-contain rounded-lg mb-4"
            />
            <blockquote className="text-gray-700 italic">
              « Notre passion : vous faire découvrir les vrais saveurs de la mer, dans un cadre authentique. »
            </blockquote>
            <p className="mt-4 text-primary font-semibold">— Helmi BenHassen, fondateur de La Falaise</p>
          </div>
        </div>
      </div>
    </section>
  );
}