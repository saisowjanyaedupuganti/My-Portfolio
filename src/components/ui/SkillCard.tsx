import { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SkillCardProps {
  skill: {
    id: number;
    title: string;
    description: string;
    icon: ReactNode;
    technologies: string[];
    color: 'primary' | 'secondary' | 'accent';
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGradientClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'from-primary-500/20 to-primary-500/5';
      case 'secondary':
        return 'from-secondary-500/20 to-secondary-500/5';
      case 'accent':
        return 'from-accent-500/20 to-accent-500/5';
      default:
        return 'from-primary-500/20 to-primary-500/5';
    }
  };

  const getIconClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-500';
      case 'secondary':
        return 'text-secondary-500';
      case 'accent':
        return 'text-accent-500';
      default:
        return 'text-primary-500';
    }
  };

  const getBorderClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'border-primary-500/20';
      case 'secondary':
        return 'border-secondary-500/20';
      case 'accent':
        return 'border-accent-500/20';
      default:
        return 'border-primary-500/20';
    }
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden border ${getBorderClass(skill.color)} bg-gradient-to-b ${getGradientClass(skill.color)} backdrop-blur-sm p-6 h-full`}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(circle at center, ${skill.color === 'primary' ? 'rgba(99, 102, 241, 0.15)' : skill.color === 'secondary' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(33, 184, 237, 0.15)'}, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0
        }}
      />

      {/* Icon */}
      <div className={`mb-4 ${getIconClass(skill.color)}`}>
        {skill.icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-display font-bold text-white mb-2">{skill.title}</h3>
      <p className="text-white/70 mb-4">{skill.description}</p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {skill.technologies.map((tech, index) => (
          <span 
            key={index}
            className="px-2 py-1 text-xs font-medium rounded-full bg-dark-800/50 text-white/80"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;