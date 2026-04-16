import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CertificateCard from '../ui/CertificateCard';
import cert from '../../Assets/Certificates/Excel Skills Job Simulation.png';

const certificates = [
  {
    id: 1,
    title: 'Excel Skills Job Simulation',
    issuer: 'Forage',
    date: '2024',
    image: cert,
  },
];

const Certificates = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certificates" ref={ref} className="py-20 md:py-32 relative">
      {/* Decorative blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-primary-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-2/3 h-1/2 bg-secondary-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Professional <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Formal recognitions I’ve earned along my learning journey.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <CertificateCard certificate={cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
