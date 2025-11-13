import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';

const collectionData: Record<string, any> = {
  rings: {
    name: 'Rings',
    description: 'Delicate bands and statement pieces crafted in warm rosegold tones',
    products: [
      { id: 1, name: 'Ethereal Band', price: '$285', image: product1 },
      { id: 2, name: 'Signature Solitaire', price: '$425', image: product2 },
      { id: 3, name: 'Twisted Elegance', price: '$320', image: product3 },
      { id: 4, name: 'Minimalist Stack', price: '$195', image: product4 },
    ],
  },
  earrings: {
    name: 'Earrings',
    description: 'Graceful drops and elegant studs that catch the light',
    products: [
      { id: 5, name: 'Pearl Drop', price: '$245', image: product1 },
      { id: 6, name: 'Hoop Whisper', price: '$180', image: product2 },
      { id: 7, name: 'Celestial Studs', price: '$165', image: product3 },
      { id: 8, name: 'Chain Dangle', price: '$210', image: product4 },
    ],
  },
  necklaces: {
    name: 'Necklaces',
    description: 'Refined chains and pendants for everyday elegance',
    products: [
      { id: 9, name: 'Layered Chain', price: '$385', image: product1 },
      { id: 10, name: 'Pendant Charm', price: '$295', image: product2 },
      { id: 11, name: 'Delicate Bar', price: '$225', image: product3 },
      { id: 12, name: 'Statement Collar', price: '$475', image: product4 },
    ],
  },
  bracelets: {
    name: 'Bracelets',
    description: 'Timeless cuffs and charms that adorn the wrist',
    products: [
      { id: 13, name: 'Cuff Elegance', price: '$340', image: product1 },
      { id: 14, name: 'Chain Bracelet', price: '$265', image: product2 },
      { id: 15, name: 'Charm Story', price: '$310', image: product3 },
      { id: 16, name: 'Bangle Set', price: '$285', image: product4 },
    ],
  },
};

const CollectionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? collectionData[slug] : null;

  if (!collection) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-serif text-leather mb-4">Collection Not Found</h1>
          <Link to="/collections" className="text-rosegold hover:underline font-body">
            Return to Collections
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Header */}
        <section className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 text-leather hover:text-rosegold transition-colors font-body text-sm mb-6 sm:mb-8 elegant-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-leather mb-3 sm:mb-4 tracking-wide">
              {collection.name}
            </h1>
            <p className="font-body text-base sm:text-lg text-taupe max-w-2xl tracking-elegant">
              {collection.description}
            </p>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {collection.products.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-soft hover:shadow-hover transition-all duration-500 mb-4">
                  <div className="aspect-square overflow-hidden bg-champagne">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-rosegold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-leather mb-1 tracking-elegant group-hover:text-rosegold transition-colors">
                  {product.name}
                </h3>
                <p className="font-body text-sm sm:text-base text-taupe tracking-elegant">
                  {product.price}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetail;
