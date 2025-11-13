import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-taupe border-t border-rosegold/30">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold tracking-widest text-ivory mb-4">
              Labbaik
            </h3>
            <p className="font-body text-sm text-champagne leading-relaxed">
              Elegance in Every Curve. Handcrafted adornments in rosegold hues.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-elegant text-ivory mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Collections', path: '/collections' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Enquiry', path: '/enquiry' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="font-body text-sm text-champagne hover:text-ivory transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-elegant text-ivory mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3 sm:gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-champagne/20 hover:bg-rosegold flex items-center justify-center text-ivory transition-all duration-300 hover:shadow-hover"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-rosegold/20">
          <p className="font-body text-xs text-champagne text-center tracking-elegant">
            © {currentYear} <span className="font-bold">Labbaik</span> Jewelry Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
