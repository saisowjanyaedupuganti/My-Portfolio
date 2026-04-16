import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Group, Mesh } from 'three';
import { Vector3 } from 'three';

interface HeroModelProps {
  position: [number, number, number];
  scale: number;
}

const HeroModel = ({ position, scale }: HeroModelProps) => {
  const groupRef = useRef<Group>(null);
  const sphereRef = useRef<Mesh>(null);
  const sphere2Ref = useRef<Mesh>(null);
  const sphere3Ref = useRef<Mesh>(null);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!groupRef.current) return;
      
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      groupRef.current.rotation.y = x * 0.1;
      groupRef.current.rotation.x = y * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 2) * 0.2;
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + 4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={new Vector3(...position)} scale={scale}>
      {/* Main sphere */}
      <mesh ref={sphereRef} castShadow receiveShadow>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </mesh>

      {/* Secondary sphere */}
      <mesh ref={sphere2Ref} position={[1.5, 0, 0.5]} castShadow>
        <Sphere args={[0.4, 32, 32]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.6}
            speed={4}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
      </mesh>

      {/* Third sphere */}
      <mesh ref={sphere3Ref} position={[-1.2, 0, -0.5]} castShadow>
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial
            color="#21b8ed"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.4}
            metalness={0.6}
          />
        </Sphere>
      </mesh>
    </group>
  );
};

export default HeroModel;