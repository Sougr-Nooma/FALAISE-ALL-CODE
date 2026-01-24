import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/zoom";
import { useEffect } from "react";

export default function PhotoModal({ photos, startIndex, onClose }) {
    

    useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Fermer */}
      <button
        onClick={onClose}
        className="absolute top-10 right-20 text-red-700 text-3xl z-10"
      >
        ×
      </button>

      <div
        className="w-full h-full max-w-6xl max-h-[90vh] p-4"
        onClick={(e) => e.stopPropagation()} // évite de fermer en cliquant sur l’image
      >
        <Swiper
          modules={[Navigation, Keyboard, Zoom]}
          initialSlide={startIndex}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          keyboard
          zoom
          className="h-full"
        >
          {photos.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="swiper-zoom-container h-full flex items-center justify-center">
                <img
                  src={p.url}
                  alt={p.legende}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              {p.legende && (
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
                  {p.legende}
                </p>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}