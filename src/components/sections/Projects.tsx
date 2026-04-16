import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';
import prjt1 from '../../Assets/AI-Powered Question Answering System.png';

interface ProjectsProps {
  onProjectHover: () => void;
  onProjectLeave: () => void;
}

const Projects = ({ onProjectHover, onProjectLeave }: ProjectsProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Question Answering System',
      description: 'Built an AI-powered RAG system improving answer accuracy and reducing latency by 40% using semantic search.',
      image: prjt1,
      tags: ['RAG', 'OpenAI API', 'FAISS'],
      github: 'https://github.com/saisowjanyaedupuganti/autoresearch-ai',
    },
  ];

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A selection of my work in AI, machine learning, and data-driven systems.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onHover={onProjectHover} 
                onLeave={onProjectLeave} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/saisowjanyaedupuganti/"
            className="inline-flex items-center px-6 py-3 border border-primary-500/30 rounded-lg text-primary-400 hover:bg-primary-500/10 transition-colors duration-300"
            whileHover={{ y: -3 }}
            onMouseEnter={onProjectHover}
            onMouseLeave={onProjectLeave}
          >
            <span className="mr-2">View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;