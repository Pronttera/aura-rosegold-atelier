import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCollections } from "@/hooks/useCollections";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryGrid = () => {
  const navigate = useNavigate();
  const { collections } = useCollections();

  const itemsPerView = 4;

  // triple copy for looping
  const extended = [...collections, ...collections, ...collections];
  const middleStart = collections.length;

  const [index, setIndex] = useState(middleStart);

  const nextSlide = () => setIndex((prev) => prev + 1);
  const prevSlide = () => setIndex((prev) => prev - 1);

  // loop correction
  useEffect(() => {
    if (index <= 0) {
      setIndex(middleStart + collections.length);
    } 
    else if (index >= extended.length - itemsPerView) {
      setIndex(middleStart - itemsPerView);
    }
  }, [index, collections.length, extended.length, itemsPerView, middleStart]);

  const handleCategoryClick = (slug: string) => {
    navigate(`/collections/${slug}`);
  };

  return (
    <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24">

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
        bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-lg"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
        bg-white/70 hover:bg-white text-black p-3 rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>

      {/* Slider */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `-${(index * 100) / itemsPerView}%`,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {extended.map((collection, i) => (
            <div
              key={`${collection.slug}-${i}`}
              className="w-1/4 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer group shadow-soft"
              onClick={() => handleCategoryClick(collection.slug)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-serif text-2xl text-ivory mb-1">
                  {collection.name}
                </h3>
                <p className="font-body text-ivory/80 text-sm">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryGrid;
