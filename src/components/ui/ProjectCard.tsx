import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
}

interface ProjectCardProps {
  project: Project;
  onHover: () => void;
  onLeave: () => void;
}

const ProjectCard = ({ project, onHover, onLeave }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden h-[400px] group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            filter: isHovered ? 'brightness(0.6)' : 'brightness(0.4)',
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition-all duration-300">
        <div>
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {project.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs font-medium rounded-full bg-dark-800/80 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a 
                href={project.github} 
                className="p-2 rounded-full bg-dark-800/80 text-white hover:text-primary-400 transition-colors"
                aria-label="View Github Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        <div>
          <motion.h3 
            className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-white/70 line-clamp-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {project.description}
          </motion.p>
        </div>

        <motion.div
          className="w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;