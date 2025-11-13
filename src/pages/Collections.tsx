import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ringsImg from '@/assets/category-rings.jpg';
import earringsImg from '@/assets/category-earrings.jpg';
import necklacesImg from '@/assets/category-necklaces.jpg';
import braceletsImg from '@/assets/category-bracelets.jpg';

const collections = [
  {
    name: 'Rings',
    slug: 'rings',
    image: ringsImg,
    description: 'Delicate bands and statement pieces',
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    image: earringsImg,
    description: 'Graceful drops and elegant studs',
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    image: necklacesImg,
    description: 'Refined chains and pendants',
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    image: braceletsImg,
    description: 'Timeless cuffs and charms',
  },
];

const Collections = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-leather mb-3 sm:mb-4 tracking-wide">
              Our Collections
            </h1>
            <p className="font-body text-base sm:text-lg text-taupe max-w-2xl mx-auto tracking-elegant px-4">
              Explore our curated selection of handcrafted jewelry, each piece telling its own story
            </p>
          </motion.div>
        </section>

        {/* Collections Grid */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/collections/${collection.slug}`}>
                  <div className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-hover transition-all duration-500">
                    <div className="aspect-[4/5] overflow-hidden bg-champagne">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-leather/60 via-leather/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-ivory transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-3xl font-serif tracking-widest mb-2">
                        {collection.name}
                      </h3>
                      <p className="font-body text-sm tracking-elegant opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
