import { motion } from 'framer-motion';
import ringsImg from '@/assets/category-rings.jpg';
import earringsImg from '@/assets/category-earrings.jpg';
import necklacesImg from '@/assets/category-necklaces.jpg';
import braceletsImg from '@/assets/category-bracelets.jpg';

const categories = [
  { name: 'Rings', image: ringsImg, description: 'Timeless bands of devotion' },
  { name: 'Earrings', image: earringsImg, description: 'Grace that frames your face' },
  { name: 'Necklaces', image: necklacesImg, description: 'Stories worn close to heart' },
  { name: 'Bracelets', image: braceletsImg, description: 'Delicate whispers of gold' },
];

const CategoryGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-champagne" id="collections">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-leather mb-3 sm:mb-4 tracking-wide">
            Our Collections
          </h2>
          <div className="w-24 h-px bg-rosegold mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg shadow-soft aspect-square cursor-pointer"
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-leather/60 via-leather/20 to-transparent" />
                
                {/* Border animation on hover */}
                <div className="absolute inset-0 border-2 border-rosegold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-2xl font-serif text-ivory mb-2 tracking-elegant">
                  {category.name}
                </h3>
                <p className="text-champagne font-body text-sm tracking-wide opacity-90">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
