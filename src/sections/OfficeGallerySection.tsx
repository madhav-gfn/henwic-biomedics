import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TextReveal } from "../components/TextReveal";
import { EASE_SMOOTH, STAGGER } from "../lib/motion";

const MEDIA_ITEMS = [
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.05 PM.jpeg",
  },
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.06 PM (1).jpeg",
  },
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.06 PM.jpeg",
  },
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.07 PM (1).jpeg",
  },
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.07 PM.jpeg",
  },
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.08 PM (1).jpeg",
  },
  {
    type: "image",
    src: "/henwin/WhatsApp Image 2026-06-16 at 6.33.08 PM.jpeg",
  },
  {
    type: "video",
    src: "/henwin/WhatsApp Video 2026-06-16 at 6.33.07 PM.mp4",
  },
];

export function OfficeGallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="gallery" className="relative py-24 bg-surface overflow-hidden">
        <div className="container-page flex flex-col items-center gap-10">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 px-4 md:px-[10vw]">
            <div className="text-left w-full max-w-3xl">
              <h3 className="font-mono text-label-caps uppercase text-primary mb-4 tracking-[0.22em] opacity-80">
                Inside Henwic
              </h3>
              <TextReveal
                as="h2"
                text="Where Innovation Happens."
                highlight={["Innovation", "Happens."]}
                className="font-display text-display-md text-text-primary"
                stagger={STAGGER.word}
              />
            </div>
            
            <div className="flex gap-4 items-center pb-2 shrink-0">
              <button 
                onClick={scrollLeft}
                className="p-3 rounded-full border border-line/30 bg-surface/50 hover:bg-surface/80 backdrop-blur-md transition-colors text-text-primary"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRight}
                className="p-3 rounded-full border border-line/30 bg-surface/50 hover:bg-surface/80 backdrop-blur-md transition-colors text-text-primary"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="w-full overflow-x-auto pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
          >
            <motion.div
              className="flex gap-6 items-center w-max px-4 md:px-[10vw]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {MEDIA_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_SMOOTH } },
                  }}
                  className="relative w-[280px] sm:w-[350px] md:w-[420px] shrink-0 overflow-hidden rounded-2xl group cursor-pointer border border-line/20 shadow-sm"
                  onClick={() => {
                    if (item.type === "image") {
                      setSelectedImage(item.src);
                    }
                  }}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[300px] sm:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`Office preview ${index}`}
                      className="w-full h-[300px] sm:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                  
                  {/* Hover indicator for images */}
                  {item.type === "image" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 p-3 rounded-full bg-surface/20 text-text-primary hover:bg-surface/50 transition-colors z-50 backdrop-blur-md border border-line/30"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_SMOOTH }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
