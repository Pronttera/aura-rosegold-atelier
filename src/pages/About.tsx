import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import signatureImg from '@/assets/signature-collection.jpg';
import hero1 from '@/assets/hero-1.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-leather mb-4 sm:mb-6 tracking-wide font-bold">
              About Labbaik
            </h1>
            <p className="font-body text-base sm:text-lg md:text-xl text-taupe max-w-3xl mx-auto tracking-elegant leading-relaxed px-4">
              Where Light Meets Craft
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-lg overflow-hidden shadow-soft max-w-5xl mx-auto"
          >
            <div className="aspect-[16/9]">
              <img
                src={hero1}
                alt="Labbaik Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-leather mb-4 sm:mb-6 tracking-wide">
                Our Philosophy
              </h2>
              <div className="w-20 h-[1px] bg-rosegold mb-6 sm:mb-8" />
              <p className="font-body text-base sm:text-lg text-taupe mb-4 sm:mb-6 leading-relaxed tracking-elegant">
                <span className="font-bold">Labbaik</span> was born from a passion for creating jewelry that captures the essence of light and craftsmanship. Each piece in our collection is handcrafted with meticulous attention to detail, using only the finest materials in warm rosegold tones.
              </p>
              <p className="font-body text-base sm:text-lg text-taupe leading-relaxed tracking-elegant">
                We believe jewelry should be more than an accessory—it should be a story, a memory, a piece of art that becomes part of your journey. Our atelier combines traditional techniques with contemporary design, resulting in timeless pieces that celebrate femininity and elegance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-lg overflow-hidden shadow-soft"
            >
              <div className="aspect-[4/5]">
                <img
                  src={signatureImg}
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-champagne py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-leather text-center mb-10 sm:mb-12 md:mb-16 tracking-wide"
            >
              Our Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
              {[
                {
                  title: 'Craftsmanship',
                  description: 'Every piece is meticulously handcrafted by skilled artisans, ensuring unparalleled quality and attention to detail.',
                },
                {
                  title: 'Timeless Design',
                  description: 'We create jewelry that transcends trends, designed to be treasured for generations to come.',
                },
                {
                  title: 'Ethical Sourcing',
                  description: 'We are committed to using responsibly sourced materials and supporting sustainable practices.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-leather mb-3 sm:mb-4 tracking-elegant">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-taupe leading-relaxed tracking-elegant">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
