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
              Heritage Rooted in Pune, Crafted for the World
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
                Our Story
              </h2>
              <div className="w-20 h-[1px] bg-rosegold mb-6 sm:mb-8" />
              <p className="font-body text-base sm:text-lg text-taupe mb-4 sm:mb-6 leading-relaxed tracking-elegant">
                <span className="font-bold">Labbaik Jewellers</span> began as a cherished jewellery house in the heart of Pune, India—serving families across Kondhwa and Hadapsar with bridal treasures, traditional Kundan and Polki masterpieces, delicate matha pattis, and timeless necklaces. Our roots are steeped in the artistry of certified, hallmarked craftsmanship—every piece bearing the BIS Hallmark and backed by a lifetime exchange promise.
              </p>
              <p className="font-body text-base sm:text-lg text-taupe mb-4 sm:mb-6 leading-relaxed tracking-elegant">
                But Labbaik is more than a showroom. It is an atelier—a sanctuary where heritage meets innovation. We reimagine traditional motifs through a contemporary lens, transforming ancestral designs into modern heirlooms. Each creation is handcrafted with meticulous care, blending the romance of rosegold tones with the precision of certified gemstones.
              </p>
              <p className="font-body text-base sm:text-lg text-taupe leading-relaxed tracking-elegant">
                We believe jewellery should be intimate—an extension of your story, your emotion, your identity. Whether you visit us in Pune or discover us online, you enter a world where light meets craft, and every piece is designed to be treasured across generations.
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
              Our Commitment
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
              {[
                {
                  title: 'Certified Excellence',
                  description: '100% BIS Hallmarked jewellery with lifetime exchange. Every piece is certified, ensuring authenticity and lasting value.',
                },
                {
                  title: 'Bespoke Craftsmanship',
                  description: 'From bridal collections to custom designs, we handcraft modern heirlooms using traditional techniques and contemporary aesthetics.',
                },
                {
                  title: '7-Day Custom Guarantee',
                  description: 'Share your vision, and we will bring it to life within 7 days—our signature promise of personalized artistry and care.',
                },
                {
                  title: 'Ethical Sourcing',
                  description: 'We honor the earth and the hands that craft. Responsibly sourced materials, sustainable practices, timeless design.',
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

        {/* Founder's Vision Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-[1px] bg-rosegold mx-auto mb-6 sm:mb-8" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-leather mb-6 sm:mb-8 tracking-wide">
              From Our Atelier
            </h2>
            <p className="font-body text-base sm:text-lg text-taupe leading-relaxed tracking-elegant mb-6">
              "I founded Labbaik with a simple belief: that jewellery is not just adornment, but a keeper of moments. Growing up surrounded by the artistry of Pune's jewellery heritage, I witnessed how a single piece could carry generations of love, celebration, and memory."
            </p>
            <p className="font-body text-base sm:text-lg text-taupe leading-relaxed tracking-elegant mb-6">
              "Today, we bridge the intimacy of our Kondhwa and Hadapsar showrooms with a global vision—offering bespoke designs that honor tradition yet embrace modern elegance. Every piece we craft is a conversation between past and present, between you and the artisans who bring your vision to life."
            </p>
            <p className="font-body text-base sm:text-lg text-leather italic leading-relaxed tracking-elegant">
              — The Labbaik Atelier Team
            </p>
          </motion.div>
        </section>

        {/* Closing Invitation Section */}
        <section className="bg-ivory py-12 sm:py-16 md:py-20 border-t border-mauve/20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-leather mb-6 sm:mb-8 tracking-wide">
                Begin Your Journey
              </h2>
              <p className="font-body text-base sm:text-lg text-taupe leading-relaxed tracking-elegant mb-8 sm:mb-10">
                Explore our signature collections, discover the stories woven into each design, or share your own vision with us. Whether you seek a timeless heirloom or a bespoke creation, we'll bring it to life with care, passion, and our 7-Day Custom Jewellery Guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/collections"
                  className="inline-block px-8 py-3 bg-rosegold text-ivory font-body tracking-elegant rounded-md hover:bg-leather transition-colors shadow-soft"
                >
                  Explore Collections
                </a>
                <a
                  href="/enquiry"
                  className="inline-block px-8 py-3 border border-rosegold text-rosegold font-body tracking-elegant rounded-md hover:bg-rosegold hover:text-ivory transition-colors"
                >
                  Share Your Vision
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
