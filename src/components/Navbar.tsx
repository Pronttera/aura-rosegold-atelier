import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-ivory shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.h1 
            className="text-2xl md:text-3xl font-serif font-light tracking-widest text-leather"
            whileHover={{ scale: 1.05 }}
          >
            AURA
          </motion.h1>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-elegant">
            {['Home', 'Collections', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-leather hover:text-rosegold transition-colors elegant-underline pb-1"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            className="bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant"
          >
            Enquire
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
