import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onLinkHover: () => void;
  onLinkLeave: () => void;
}

const Footer = ({ onLinkHover, onLinkLeave }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: 'https://github.com/saisowjanyaedupuganti/', name: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://www.linkedin.com/in/sai-sowjanya-edupuganti/', name: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:sowjanyaedupuganti17@gmail.com', name: 'Email' }
  ];

  return (
    <footer className="bg-dark-900/50 border-t border-dark-800 mt-16 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold text-white mb-4">Sai Sowjanya Edupuganti</h3>
            <p className="text-white/70 mb-4 max-w-md">
              Equipped with technical knowledge, analytical thinking, and the ability to contribute to real-world engineering solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-primary-500 transition-colors"
                  onMouseEnter={onLinkHover}
                  onMouseLeave={onLinkLeave}
                  whileHover={{ y: -3 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors"
                    onMouseEnter={onLinkHover}
                    onMouseLeave={onLinkLeave}
                    whileHover={{ x: 3 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold text-white mb-4">Contact</h3>
            <p className="text-white/70 mb-2">sowjanyaedupuganti17@gmail.com</p>
            <p className="text-white/70 mb-2">+1 9402058470</p>
            <p className="text-white/70">
              United States<br />
            </p>
          </motion.div>
        </div>

        <div className="border-t border-dark-800 pt-6 text-center">
          <p className="text-white/60 flex items-center justify-center">
            <span>© {currentYear} Sai Sowjanya Edupuganti. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;