import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
          <Link to="/">
            <motion.h1 
              className="text-2xl md:text-3xl font-serif font-light tracking-widest text-leather"
              whileHover={{ scale: 1.05 }}
            >
              Labbaik
            </motion.h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-elegant">
            {[
              { name: 'Home', path: '/' },
              { name: 'Collections', path: '/collections' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
              { name: 'Enquiry', path: '/enquiry' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-leather hover:text-rosegold transition-colors elegant-underline pb-1 ${
                  location.pathname === item.path ? 'text-rosegold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/contact">
            <Button 
              className="bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant"
            >
              Enquire
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
