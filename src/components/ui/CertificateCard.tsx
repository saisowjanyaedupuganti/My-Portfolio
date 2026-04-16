import { motion } from 'framer-motion';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

interface Props {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: Props) => (
  <motion.div
    className="relative rounded-xl overflow-hidden border border-dark-700 bg-dark-800/40 backdrop-blur-md h-[340px] flex flex-col"
    whileHover={{ y: -6, boxShadow: '0 12px 30px -10px rgba(0,0,0,0.35)' }}
    transition={{ duration: 0.3 }}
  >
    {/* cover */}
    <img
      src={certificate.image}
      alt={certificate.title}
      className="w-full h-80 object-cover object-center"
    />

    {/* content */}
    <div className="flex flex-col p-5 flex-1">
      <h3 className="text-lg font-display font-bold text-white mb-1">
        {certificate.title}
      </h3>
      <p className="text-white/60 text-sm mb-auto">
        {certificate.issuer} &middot; {certificate.date}
      </p>

    </div>
  </motion.div>
);

export default CertificateCard;
