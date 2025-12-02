import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import hero1 from '@/assets/hero-1.png';
import hero2 from '@/assets/hero-2.png';
import hero3 from '@/assets/hero-3.png';
import { useNavigate } from 'react-router-dom';
import { usePrismicDocumentsByType } from '@/hooks/usePrismic';
import { PrismicDocument } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  { image: hero1, alt: 'Elegant rosegold rings on marble' },
  { image: hero2, alt: 'Pearl necklaces with gold accents' },
  { image: hero3, alt: 'Rosegold hoop earrings on silk' },
];

// Type definition for the Hero Section data from Prismic
interface HeroSectionData {
  title?: any; // Prismic Rich Text field
  sub_heading?: any; // Prismic Rich Text field
  button_text?: any; // Prismic Rich Text field
  background_image?: {
    url: string;
    alt?: string;
  };
}

interface HomePageDocument extends PrismicDocument {
  data: HeroSectionData;
}

const HeroCarousel = () => {
  const navigate = useNavigate();
  
  // Fetch hero section data from Prismic
  const { data: homePageDocs, loading, error } = usePrismicDocumentsByType<HomePageDocument>('home_page');
  const heroData = homePageDocs?.[0]?.data;
  
  // Fallback content
  const defaultTitle = 'Where Light Meets Craft';
  const defaultSubHeading = 'Handcrafted adornments in rosegold hues';
  const defaultButtonText = 'Explore Our Collection';
  
  // Prepare slides with Prismic background image if available
  const carouselSlides = heroData?.background_image?.url 
    ? [{ image: heroData.background_image.url, alt: heroData.background_image.alt || 'Hero background' }, ...slides]
    : slides;
  return (
    <section className="relative h-[70vh] sm:h-[80vh] md:h-screen w-full" id="home">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: '!bg-rosegold',
        }}
        loop
        className="h-full w-full"
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-leather/20 via-transparent to-leather/40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-ivory mb-3 sm:mb-4 tracking-wide"
          >
            {heroData?.title ? (
              <PrismicRichText field={heroData.title} />
            ) : (
              defaultTitle
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base md:text-xl font-body text-ivory mb-6 tracking-elegant"
          >
            {heroData?.sub_heading ? (
              <PrismicRichText field={heroData.sub_heading} />
            ) : (
              defaultSubHeading
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base h-12 sm:h-auto"
              onClick={() => navigate('/collections')}
            >
              {heroData?.button_text ? (
                <PrismicRichText field={heroData.button_text} />
              ) : (
                defaultButtonText
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCarousel;
