import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/Logo/Logo-white.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-taupe border-t border-rosegold/30">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div>
            <img
              src={logoLight}
              alt="Labbaik Logo"
              className="w-56 h-auto"
            />
            {/* <h3 className="text-2xl font-serif font-bold tracking-widest text-ivory mb-4">
              Labbaik
            </h3> */}
            <p className="font-body text-sm text-champagne leading-relaxed mb-3">
              Elegance in Every Curve. Handcrafted adornments in rosegold hues.
            </p>
            <div className="text-champagne text-xs space-y-1">
              <p>Shop No.4, Konark Shopping Hub</p>
              <p>Opp. Satyanand Hospital, Kondhwa Kurd</p>
              <p>Near HDFC Bank, Pune, Maharashtra 411048</p>
            </div>
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
            © {currentYear} <span className="font-bold">Labbaik</span> Jewelry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
