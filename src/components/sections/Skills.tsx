import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Cpu, Sparkles, BarChart, Cloud } from 'lucide-react';
import SkillCard from '../ui/SkillCard';

const Skills = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const skills = [
    {
  id: 1,
  title: 'Programming Languages',
  description: 'Core programming languages used for building scalable applications.',
  icon: <Code className="w-6 h-6" />,
  technologies: ['Python', 'SQL', 'Java'],
  color: 'primary',
},
{
  id: 2,
  title: 'Machine Learning & AI',
  description: 'Techniques and algorithms for building intelligent systems and predictive models.',
  icon: <Brain className="w-6 h-6" />,
  technologies: ['Supervised Learning', 'RAG', 'NLP'],
  color: 'secondary',
},
{
  id: 3,
  title: 'Deep Learning & Frameworks',
  description: 'Frameworks and tools for developing and training deep learning models.',
  icon: <Cpu className="w-6 h-6" />,
  technologies: ['PyTorch', 'Scikit-learn', 'Unsupervised Learning' ],
  color: 'accent',
},
{
  id: 4,
  title: 'Generative AI & LLM Tools',
  description: 'Techniques for building applications powered by large language models.',
  icon: <Sparkles className="w-6 h-6" />,
  technologies: ['OpenAI API', 'LangChain', 'Prompt Engineering'],
  color: 'primary',
},
{
  id: 5,
  title: 'Data & Analytics',
  description: 'Libraries and tools for data processing, analysis, and visualization.',
  icon: <BarChart className="w-6 h-6" />,
  technologies: ['Pandas', 'NumPy', 'Tableau', 'Power BI'],
  color: 'secondary',
},
{
  id: 6,
  title: 'Cloud & Model Evaluation',
  description: 'Cloud platforms, API development, and metrics for evaluating model performance.',
  icon: <Cloud className="w-6 h-6" />,
  technologies: ['AWS', 'FastAPI', 'REST APIs', 'Precision', 'Recall'],
  color: 'accent',
}
  ];

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-500/10 filter blur-3xl"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary-500/10 filter blur-3xl"
          style={{ y: y2, rotate: rotate2 }}
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
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A collection of technologies, tools, and methodologies I've mastered throughout my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>

        {/* Skill meter section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 glass rounded-xl p-8"
        >
          <h3 className="text-xl font-display font-bold text-white mb-8 text-center">
            Technical Proficiency
          </h3>

          <div className="space-y-6">
            {[
              { name: 'Programming Languages', percentage: 95 },
              { name: 'Machine Learning & AI', percentage: 90 },
              { name: 'Deep Learning & Frameworks', percentage: 85 },
              { name: 'Generative AI & LLM Tools', percentage: 88 },
              { name: 'Data & Analytics', percentage: 92 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">{item.name}</span>
                  <span className="text-white/60">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;