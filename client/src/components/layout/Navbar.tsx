import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button, Logo } from '../ui';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Telegram', href: '#telegram' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background-base/95 backdrop-blur-md shadow-lg shadow-primary/10 border-b border-primary/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo
                size="sm"
                variant="default"
                showText={true}
                showImage={true}
                animated={true}
                className="md:!text-xl"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  className="text-sm lg:text-base text-text-secondary hover:text-text-primary transition-colors font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-light group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button variant="primary" size="sm" className="lg:!h-10 lg:!px-4">
                    Try Now
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-surface border border-primary/20 flex items-center justify-center hover:border-primary transition-all"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 space-y-3 pb-4"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth">
                  <Button variant="primary" size="md" fullWidth>
                    Try Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
