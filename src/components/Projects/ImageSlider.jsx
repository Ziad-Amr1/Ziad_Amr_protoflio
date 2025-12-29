// src/components/projects/ImageSlider.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlider = React.memo(function ImageSlider({ images = [], video = null, imageIndex, setImageIndex }) {
  const imgs = images || [];

  if (video && !imgs.length) {
    return (
      <div className="w-full p-4">
        <video src={video} controls autoPlay className="w-full max-h-[480px] rounded-md object-cover" />
      </div>
    );
  }

  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      {imgs.length > 0 ? (
        <>
          <div className="w-full flex items-center justify-center">
            <img
              src={imgs[imageIndex]}
              alt={`slide-${imageIndex}`}
              loading="lazy"
              className="
                max-w-full
                max-h-full
                object-contain
                rounded-md
              "
            />
            {imgs.length > 1 && (
              <>
                <button
                  onClick={() => setImageIndex((i) => (i - 1 + imgs.length) % imgs.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                  aria-label="prev image"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => setImageIndex((i) => (i + 1) % imgs.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                  aria-label="next image"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
          {imgs.length > 1 && (
            <div className="mt-3 w-full px-4 flex gap-2 overflow-x-auto">
              {imgs.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`rounded-md overflow-hidden border-2 ${idx === imageIndex ? "border-primary" : "border-transparent"} shrink-0`}
                  style={{ width: 84, height: 56 }}
                >
                  <img src={s} loading="lazy" alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="p-6 text-center text-gray-500">No preview available</div>
      )}
    </div>
  );
});

export default ImageSlider;