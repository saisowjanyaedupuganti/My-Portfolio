import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-dark-950 opacity-90" />
        <motion.div
          className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-500/10 filter blur-3xl"
          style={{ y, opacity }}
        />
        <motion.div
          className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-secondary-500/10 filter blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            My journey in the world of digital creation and the skills I've acquired along the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Bio section */}
          <motion.div 
            className="lg:col-span-3 glass rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-4">Who I Am</h3>
            <p className="text-white/80 mb-4 leading-relaxed">
              I am a Graduate Engineer with a strong foundation in Python, Machine Learning, and AI-driven systems. I specialize in building intelligent solutions using Retrieval-Augmented Generation and semantic search. My focus is on creating scalable, data-driven applications that deliver real-world impact.
            </p>
            <p className="text-white/80 mb-4 leading-relaxed">
              I have hands-on experience developing ML models, optimizing data pipelines, and improving prediction efficiency. My work includes building end-to-end AI systems, enhancing model performance, and reducing latency through efficient architectures. I enjoy solving complex problems using data and innovative technologies.
            </p>
            <p className="text-white/80 mb-4 leading-relaxed">
              Currently, I contribute as an Instructional Assistant, supporting 180+ students and improving learning outcomes. I am passionate about continuous learning and exploring advancements in AI and cloud technologies. I aim to leverage my skills to drive innovation and build impactful solutions.
            </p>
          </motion.div>

          {/* Timeline section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Experience 1 */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-start mb-4">
                <div className="bg-primary-500/20 p-3 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-primary-500" />
                </div>
                <div className="w-full">
                  <h4 className="text-xl font-bold text-white">Instructional Assistant</h4>
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <span>August 2025 – Present</span>
                    <span>University of North Texas</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80">
                Improved performance by 20% while supporting 180+ students in assembly and CPU concepts.
              </p>
            </div>

            {/* Experience 2 */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-start mb-4">
                <div className="bg-secondary-500/20 p-3 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-secondary-500" />
                </div>
                <div className="w-full">
                  <h4 className="text-xl font-bold text-white">AI/ML Intern</h4>
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <span>May 2023 – July 2023</span>
                    <span>AICTE</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80">
                Developed ML models improving prediction efficiency by 25% and reducing preprocessing time by 30%.
              </p>
            </div>

            {/* Experience 3 */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-start mb-4">
                <div className="bg-accent-500/20 p-3 rounded-lg mr-4">
                  <GraduationCap className="h-6 w-6 text-accent-500" />
                </div>
                <div className="w-full">
                  <h4 className="text-xl font-bold text-white">Networking Intern</h4>
                  <div className="flex items-center justify-between text-white/60 text-sm">
                    <span>September 2023 – November 2023</span>
                    <span>AICTE</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80">
                Configured virtual networks and enhanced efficiency using analysis and Python automation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;