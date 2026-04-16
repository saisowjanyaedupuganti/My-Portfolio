import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import HeroModel from '../three/HeroModel';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <section 
      id="home" 
      ref={ref} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 magic-bg" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas ref={canvasRef} shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.5} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          <Suspense fallback={null}>
            <HeroModel position={[0, -1, 0]} scale={1.5} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            Hello, I'am
            <span className="relative">
              <span className="relative z-10 gradient-text"> Sai Sowjanya Edupuganti </span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-primary-500/20 rounded -z-10" />
            </span>
            Graduate Engineer 
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto"
          >
            A strong foundation in engineering principles, problem-solving skills, and a passion for learning and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg text-white font-medium hover:shadow-glow transition-all duration-300"
              whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ y: 0 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/5 transition-all duration-300"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5 
        }}
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;