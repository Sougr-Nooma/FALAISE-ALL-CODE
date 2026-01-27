import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/zoom";
import { useState, useEffect, useRef } from "react";


export default function PhotoModal({ items, startIndex, onClose }) {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const swiperRef = useRef(null);
  const videoRefs = useRef({}); // Stocke les refs des vidéos

  const isVideo = (item) => item.type === "video";

  // Pause toutes les vidéos sauf celle active
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key];
      if (video) {
        if (parseInt(key) === activeIndex) {
          video.play().catch(() => {}); // Autoplay peut être bloqué par navigateur
        } else {
          video.pause();
          video.currentTime = 0; // Remet au début
        }
      }
    });
  }, [activeIndex]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl z-10"
      >
        ×
      </button>

      <div
        className="w-full h-full max-w-6xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Navigation, Keyboard]}
          initialSlide={startIndex}
          navigation
          keyboard
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.activeIndex);
          }}
          className="h-full"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="h-full flex flex-col items-center justify-center">
                {isVideo(item) ? (
                  item.video_url ? (
                    // Lien externe (YouTube/Vimeo)
                    <a
                      href={item.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-center"
                    >
                      <span className="text-6xl">▶️</span>
                      <p className="mt-4">
                        Voir sur {item.video_url.includes("youtube") ? "YouTube" : "Vimeo"}
                      </p>
                    </a>
                  ) : (
                    // Vidéo uploadée - contrôlée
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el;
                      }}
                      src={`http://localhost:8000/storage/${item.file_path}`}
                      className="max-w-full max-h-[70vh]"
                      controls
                      playsInline // Important pour mobile
                      muted={index !== activeIndex} // Muet sauf si active
                    />
                  )
                ) : (
                  // Photo
                  <img
                    src={`http://localhost:8000/storage/${item.file_path}`}
                    alt={item.titre}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                )}

                <p className="text-white mt-4 text-center">{item.titre}</p>
                {item.description && (
                  <p className="text-gray-400 text-sm text-center">
                    {item.description}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


// export default function PhotoModal({ items, startIndex, onClose }) {
//   const isVideo = (item) => item.type === "video";

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
//       onClick={onClose}
//     >
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-white text-4xl z-10"
//       >
//         ×
//       </button>

//       <div
//         className="w-full h-full max-w-6xl max-h-[90vh] p-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <Swiper
//           modules={[Navigation, Keyboard]}
//           initialSlide={startIndex}
//           navigation
//           keyboard
//           className="h-full"
//         >
//           {items.map((item) => (
//             <SwiperSlide key={item.id}>
//               <div className="h-full flex flex-col items-center justify-center">
//                 {isVideo(item) ? (
//                   item.video_url ? (
//                     // Lien externe
//                     <a
//                       href={item.video_url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-white text-center"
//                     >
//                       <span className="text-6xl">▶️</span>
//                       <p className="mt-4">Voir sur {item.video_url.includes("youtube") ? "YouTube" : "Vimeo"}</p>
//                     </a>
//                   ) : (
//                     // Vidéo uploadée
//                     <video
//                       src={`http://localhost:8000/storage/${item.file_path}`}
//                       className="max-w-full max-h-[70vh]"
//                       controls
//                       autoPlay
//                     />
//                   )
//                 ) : (
//                   // Photo
//                   <img
//                     src={`http://localhost:8000/storage/${item.file_path}`}
//                     alt={item.titre}
//                     className="max-w-full max-h-[80vh] object-contain"
//                   />
//                 )}
                
//                 <p className="text-white mt-4 text-center">{item.titre}</p>
//                 {item.description && (
//                   <p className="text-gray-400 text-sm text-center">{item.description}</p>
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";
// export default function PhotoModal({ photos, startIndex, onClose }) {
    

//     useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//     }, [onClose]);

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
//       onClick={onClose}
//     >
//       {/* Fermer */}
//       <button
//         onClick={onClose}
//         className="absolute top-10 right-20 text-red-700 text-3xl z-10"
//       >
//         ×
//       </button>

//       <div
//         className="w-full h-full max-w-6xl max-h-[90vh] p-4"
//         onClick={(e) => e.stopPropagation()} // évite de fermer en cliquant sur l’image
//       >
//         <Swiper
//           modules={[Navigation, Keyboard, Zoom]}
//           initialSlide={startIndex}
//           spaceBetween={10}
//           slidesPerView={1}
//           navigation
//           keyboard
//           zoom
//           className="h-full"
//         >
//           {photos.map((p) => (
//             <SwiperSlide key={p.id}>
//               <div className="swiper-zoom-container h-full flex items-center justify-center">
//                 <img
//                   src={p.url}
//                   alt={p.legende}
//                   className="max-w-full max-h-full object-contain rounded-lg"
//                 />
//               </div>
//               {p.legende && (
//                 <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
//                   {p.legende}
//                 </p>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }