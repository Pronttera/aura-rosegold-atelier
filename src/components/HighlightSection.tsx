import { motion } from 'framer-motion';
import signatureImg from '@/assets/signature-collection.jpg';

const HighlightSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-ivory">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg shadow-soft">
              <img
                src={signatureImg}
                alt="Signature Collection Necklace"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-mauve/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-px bg-rosegold mb-6"
              />
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-leather mb-3 sm:mb-4 tracking-wide">
                The Signature Collection
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg font-body text-taupe leading-relaxed"
            >
              Each piece in our signature collection tells a story of meticulous craftsmanship
              and timeless elegance. Hand-selected gemstones meet lustrous rosegold in designs
              that transcend fleeting trends.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base font-body text-muted-foreground leading-relaxed"
            >
              Inspired by the interplay of light and shadow, these adornments are created
              for those who appreciate the subtle artistry of fine jewelry. Every curve,
              every setting is considered with care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-4"
            >
              <a
                href="#featured"
                className="inline-block text-rosegold font-body tracking-elegant hover:text-leather transition-colors elegant-underline pb-1"
              >
                Discover the Collection →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
