import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';

import 'swiper/css';
import 'swiper/css/navigation';

const products = [
  { name: 'Luna Ring', price: '€245', image: product1 },
  { name: 'Celestial Hoops', price: '€320', image: product2 },
  { name: 'Pearl Pendant', price: '€280', image: product3 },
  { name: 'Halo Bracelet', price: '€195', image: product4 },
];

const FeaturedCarousel = () => {
  return (
    <section className="py-24 px-6 bg-champagne" id="featured">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-leather mb-4 tracking-wide">
            Featured Pieces
          </h2>
          <div className="w-24 h-px bg-rosegold mx-auto mb-4" />
          <p className="text-base font-body text-taupe tracking-elegant">
            Handpicked treasures from our latest collection
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-4"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-soft bg-ivory mb-4 aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-leather/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-serif text-leather mb-1 tracking-elegant group-hover:text-rosegold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-body text-taupe tracking-wide">
                      {product.price}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-ivory hover:bg-mauve text-leather hover:text-ivory w-12 h-12 rounded-full shadow-soft flex items-center justify-center transition-all duration-300 hover:shadow-hover">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-ivory hover:bg-mauve text-leather hover:text-ivory w-12 h-12 rounded-full shadow-soft flex items-center justify-center transition-all duration-300 hover:shadow-hover">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
