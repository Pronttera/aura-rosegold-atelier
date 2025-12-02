import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoLight from '../assets/Logo/Logo-white.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-taupe border-t border-rosegold/30 py-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          {/* Brand */}
          <div>
            <img
              src={logoLight}
              alt="Labbaik Logo"
              className="w-32 md:mx-10 mx-6 mb-6"
            />
            {/* <h3 className="text-2xl font-serif font-bold tracking-widest text-ivory mb-4">
              Labbaik
            </h3> */}
            <p className="font-body text-sm text-champagne leading-relaxed mb-3">
              Elegance in Every Curve. Handcrafted adornments in rosegold hues.
            </p>
            <div className="text-champagne text-xs space-y-1">
              <ul className="list-disc pl-4 space-y-2">
                <li><span className='text-ivory font-bold'>Kondhwa</span> - Shop No.4, Konark Shopping Hub, Opp. Satyanand Hospital, Kondhwa Kurd, Near HDFC Bank, Pune, Maharashtra 41104</li>
                <li><span className='text-ivory font-bold'>Hadapsar</span> - Opp, Lane Number 14/A, SayyedNagar, Hadapsar, Pune, Maharashtra 411028</li>
              </ul>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body text-sm md:text-center uppercase tracking-elegant text-ivory mb-4 mt-6">
              Quick Links
            </h4>
            <nav className="flex flex-col md:items-center gap-2">
              {[
                { name: 'Collections', path: '/collections' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Customize', path: '/customize' },
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
            <h4 className="font-body text-sm uppercase tracking-elegant text-ivory mb-4 mt-6 md:text-center">
              Follow Us
            </h4>
            <div className="flex gap-3 sm:gap-4 md:justify-center">
              {[
                { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/labbaik_jewellers/' },
                { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/labbaikjewellers/' },
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
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
            © {currentYear} <span className="font-bold">Labbaik</span> Jewellers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
