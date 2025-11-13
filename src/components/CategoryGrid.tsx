import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ringsImg from '@/assets/category-rings.jpg';
import earringsImg from '@/assets/category-earrings.jpg';
import necklacesImg from '@/assets/category-necklaces.jpg';
import braceletsImg from '@/assets/category-bracelets.jpg';

const categories = [
  { 
    name: 'Rings', 
    slug: 'rings',
    image: ringsImg, 
    description: 'Timeless bands of devotion' 
  },
  { 
    name: 'Earrings', 
    slug: 'earrings',
    image: earringsImg, 
    description: 'Grace that frames your face' 
  },
  { 
    name: 'Necklaces', 
    slug: 'necklaces',
    image: necklacesImg, 
    description: 'Stories worn close to heart' 
  },
  { 
    name: 'Bracelets', 
    slug: 'bracelets',
    image: braceletsImg, 
    description: 'Delicate whispers of gold' 
  },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

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

  const handleCategoryClick = (slug: string) => {
    navigate(`/collections/${slug}`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="container mx-auto px-4 sm:px-6 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleCategoryClick(category.slug)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <h3 className="font-serif text-2xl text-ivory mb-1">{category.name}</h3>
              <p className="font-body text-ivory/80 text-sm">{category.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryGrid;