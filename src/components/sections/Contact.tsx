import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactProps {
  onInputFocus: () => void;
  onInputBlur: () => void;
}

/**
 * IMPORTANT: Replace `YOUR_FORMSPREE_FORM_ID` with the ID from your Formspree
 * dashboard (e.g. https://formspree.io/f/abcxyz ⇒ "abcxyz").
 */
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_FORM_ID';

const Contact = ({ onInputFocus, onInputBlur }: ContactProps) => {
  /* ───────── Intersection observer for entrance animations ───────── */
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  /* ───────── Controlled form state ───────── */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  /* ───────── Submission status ───────── */
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus('loading');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setStatusMsg(
          'Your message has been sent successfully! I will get back to you soon.'
        );
        // Reset form fields
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        throw new Error(
          data?.errors?.[0]?.message ||
            'Something went wrong — please try again later.'
        );
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMsg(err.message);
    }

    // Hide banner after 5 s
    setTimeout(() => setStatus('idle'), 5000);
  };

  /* ───────── Static contact details ───────── */
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary-500" />,
      title: 'Email',
      value: 'sowjanyaedupuganti17@gmail.com',
      link: 'mailto:sowjanyaedupuganti17@gmail.com'
    },
    {
      icon: <Phone className="h-5 w-5 text-secondary-500" />,
      title: 'Phone',
      value: '+1 9402058470',
      link: 'tel:+1 9402058470'
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent-500" />,
      title: 'Location',
      value: 'United States',
      link: null
    }
  ];

  /* ───────── Render ───────── */
  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 relative">
      {/* ───────── Decorative blurred backgrounds ───────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-primary-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-accent-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* ───────── Heading ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Have a project in mind or want to chat? I'd love to hear from you.
            Get in touch and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ───────── Contact Info Panel ───────── */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-display font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map(({ icon, title, value, link }, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-primary-500/20 p-3 rounded-lg mr-4">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{title}</h4>
                      {link ? (
                        <a
                          href={link}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white/70 whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-white font-medium mb-3">Available For</h4>
                <div className="flex flex-wrap gap-2">
                  {['Freelance', 'Full-time', 'Collaboration', 'Consulting'].map(
                    (item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-dark-800/50 text-white/80"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ───────── Contact Form ───────── */}
          <motion.div
            className="lg:col-span-3 glass rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-display font-bold text-white mb-6">
              Send Me a Message
            </h3>

            {/* ───────── Status banner ───────── */}
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 rounded-lg p-4 text-sm font-medium ${
              status === 'success'
                ? 'bg-green-500/20 text-green-400'
                : status === 'error'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-primary-500/20 text-primary-400'
            }`}
              >
                {statusMsg || 'Sending…'}
              </motion.div>
            )}

            {/* ───────── Form ───────── */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2 text-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    required
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    required
                    className="w-full bg-dark-800/50 border border-dark-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-white/80 mb-2 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  required
                  className="w-full bg-dark-800/50 border border-dark-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2 text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  required
                  className="w-full bg-dark-800/50 border border-dark-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { y: -3, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' } : {}}
                whileTap={{ y: 0 }}
                onMouseEnter={onInputFocus}
                onMouseLeave={onInputBlur}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span className="mr-2">
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
