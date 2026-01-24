import Specialites from "./Specialites"; // on réutilise le même composant

export default function MenuSection() {
  return (
    <section id="menu" className="bg-white">
      {/* 1. Carrousel des spécialités */}
      <Specialites />
    </section>
  );
}