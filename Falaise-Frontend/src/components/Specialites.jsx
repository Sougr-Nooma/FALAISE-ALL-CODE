// import Carousel from "./Carousel";
// import specialites from "../data/specialites";
// import { useNavigate } from "react-router-dom";

// export default function Specialites() {
//   const nav = useNavigate();

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold text-secondary mb-12">
//           Nos spécialités
//         </h2>

//         {/* Carroursel */}
//         <Carousel slides={specialites} />

//         {/* Bouton Voir plus */}
//         <button
//           onClick={() => nav("/menu")}
//           className="mt-10 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
//         >
//           Voir le menu complet
//           {/* flèche vers le bas */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// }

import { useEffect } from "react";
// import { useMenu } from "../context/MenuContext";
import { useMenu } from "../hooks/useMenu";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

export default function Specialites() {
  const { specialites, fetchSpecialites } = useMenu();
  const nav = useNavigate();

  useEffect(() => {
    fetchSpecialites();
  }, []);

  // Transformer pour le carrousel
  const slides = specialites.map((s) => ({
    title: s.nom,
    desc: s.description || "",
    img: s.photo_path ? `http://localhost:8000/storage/${s.photo_path}` : "",
  }));

  if (slides.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-secondary mb-12">Nos spécialités</h2>
          <p className="text-gray-500">Aucune spécialité pour le moment</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-secondary mb-12">
          Nos spécialités
        </h2>

        <Carousel slides={slides} />

        <button
          onClick={() => nav("/menu")}
          className="mt-10 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Voir le menu complet
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}