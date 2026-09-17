"use client";
import { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

const images = [
  "/images/pic1.jpeg",
  "/images/pic2.jpeg",
  "/images/pic3.jpeg",
  "/images/pic4.jpeg",
  "/images/pic5.jpeg",
  // Added pic1 again just to make the grid perfectly even (6 items)
  "/images/pic1.jpeg", 
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  return (
    <div>
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')"}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight">Gallery</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-lg text-blue-100">Glimpses of life at Fountain Hills Schools</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <Reveal key={index} delay={(index % 3) * 0.1}>
              <div 
                className="relative overflow-hidden rounded-2xl group aspect-[4/5] shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <Image 
                  src={src} 
                  alt={`Gallery image ${index + 1}`} 
                  fill
                  priority={index === 0} // Fixes LCP warning by loading first image eagerly
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-in-out" 
                  // Fixes the 100vw warning by matching the actual grid size
                  sizes="(max-width: 768px) 50vw, 33vw" 
                />
                
                {/* Cinematic Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                    <Maximize2 className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Animated Lightbox Modal */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrentIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"
              onClick={() => setCurrentIndex(null)}
            >
              <X className="h-8 w-8" />
            </button>

            {/* Previous Button */}
            <button 
              className="absolute left-4 md:left-8 text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10 active:scale-90"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              className="relative w-full max-w-4xl h-[80vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={images[currentIndex]} 
                alt={`Enlarged view ${currentIndex + 1}`} 
                fill
                className="object-contain rounded-lg"
                // Adjusted sizes for the modal context
                sizes="(max-width: 1024px) 100vw, 1024px" 
              />
            </motion.div>

            {/* Next Button */}
            <button 
              className="absolute right-4 md:right-8 text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10 active:scale-90"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}