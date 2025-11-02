import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Github } from 'lucide-react';
import { Logo } from '../ui';

function Footer() {
  const links = [
    { label: 'About', href: '/about' },
    { label: 'Docs', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' }
  ];

  const socials = [
    { icon: Send, label: 'Telegram', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' }
  ];

  return (
    <footer className="py-12 px-6 border-t border-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/">
              <Logo
                size="md"
                variant="default"
                showText={true}
                showImage={true}
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8"
          >
            {links.map((link, index) => (
              link.href.startsWith('#') ? (
                <a
                  key={index}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-surface border border-primary/20 flex items-center justify-center hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-primary" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-surface text-center text-sm text-text-secondary"
        >
          © 2025 DropLink. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
