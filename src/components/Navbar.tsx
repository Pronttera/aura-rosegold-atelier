import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import logo from '../assets/Logo/Logo.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${location.pathname === '/'
        ? (isScrolled ? 'bg-ivory/90 backdrop-blur-md shadow-soft' : 'bg-ivory/25 backdrop-blur-md')
        : 'bg-ivory/90 backdrop-blur-md shadow-soft'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Labbaik Logo"
              className="w-48 h-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-elegant">
            {[
              { name: 'Home', path: '/' },
              { name: 'Collections', path: '/collections' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
              { name: 'Customize', path: '/customize' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
  pb-1 transition-colors elegant-underline
  ${location.pathname === item.path
                    ? location.pathname === '/'
                      ? (isScrolled ? 'text-rosegold' : 'text-ivory')
                      : 'text-rosegold'
                    : 'text-leather'
                  }
  ${location.pathname === '/'
                    ? 'hover:text-ivory'
                    : 'hover:text-rosegold'
                  }
`}


              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <Link to="/contact" className="hidden md:block">
            <Button
              className="bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant"
            >
              Enquire
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-leather hover:text-rosegold"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-ivory border-taupe w-full [&>button>svg]:h-8 [&>button>svg]:w-8">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl tracking-widest text-leather">
                  {/* Labbaik */}
                  <img
                    src={logo}
                    alt="Labbaik Logo"
                    className="w-56 h-auto mx-auto"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Collections', path: '/collections' },
                  { name: 'About', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Customize', path: '/customize' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-body tracking-elegant text-leather hover:text-rosegold transition-colors py-2 ${location.pathname === item.path ? 'text-rosegold font-medium' : ''
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-4">
                  <Button
                    className="w-full bg-gradient-to-r from-rosegold to-mauve hover:shadow-hover transition-all duration-300 text-ivory font-body tracking-elegant h-12"
                  >
                    Enquire Now
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
