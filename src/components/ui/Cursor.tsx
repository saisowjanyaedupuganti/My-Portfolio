import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  variant: 'default' | 'link' | 'text';
}

const Cursor = ({ variant = 'default' }: CursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      height: 32,
      width: 32,
      transition: {
        type: 'spring',
        mass: 0.2,
        stiffness: 800,
        damping: 30,
        duration: 0.1,
      },
    },
    link: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      height: 48,
      width: 48,
      transition: {
        type: 'spring',
        mass: 0.6,
        stiffness: 200,
        damping: 20,
        duration: 0.1,
      },
    },
    text: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      height: 24,
      width: 24,
      transition: {
        type: 'spring',
        mass: 0.2,
        stiffness: 800,
        damping: 30,
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      variants={variants}
      animate={variant}
    />
  );
};

export default Cursor;