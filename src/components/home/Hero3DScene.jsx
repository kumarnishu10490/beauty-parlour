import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";


const LipstickTube = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[-1.2, -0.3, 0]} rotation={[0, 0, 0.2]}>
        {/* Tube body */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.4, 20]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Gold band */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 20]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Lipstick tip */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.13, 0.5, 20]} />
          <meshStandardMaterial color="#c44569" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.85, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0, 0.12, 0.2, 20]} />
          <meshStandardMaterial color="#c44569" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>
    </Float>);

};

const MirrorCompact = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2 + 1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, 0.2, 0.5]}>
        {/* Compact base */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.12, 32]} />
          <meshStandardMaterial color="#e8b4b8" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Gold rim */}
        <mesh position={[0, 0.07, 0]}>
          <torusGeometry args={[0.58, 0.03, 8, 32]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Mirror surface */}
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.52, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>);

};

const PerfumeBottle = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} position={[1.3, -0.2, -0.3]}>
        {/* Bottle body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.25]} />
          <meshPhysicalMaterial
            color="#f5d0d6"
            transmission={0.6}
            thickness={0.5}
            roughness={0.05}
            metalness={0.1}
            ior={1.5} />
          
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 12]} />
          <meshPhysicalMaterial color="#f5d0d6" transmission={0.4} roughness={0.05} />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 12]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Label */}
        <mesh position={[0, 0, 0.13]}>
          <planeGeometry args={[0.35, 0.4]} />
          <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>);

};

const GlowingSphere = () => {
  return (
    <Float speed={3} floatIntensity={0.8}>
      <mesh position={[0, 1.2, -1]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial
          color="#e8a0b5"
          emissive="#e8a0b5"
          emissiveIntensity={0.4}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.3} />
        
      </mesh>
    </Float>);

};

const FloatingSparkles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 3],

      scale: 0.02 + Math.random() * 0.03,
      color: i % 3 === 0 ? "#c9a84c" : i % 3 === 1 ? "#e8a0b5" : "#f5d0d6"
    }));
  }, []);

  return (
    <>
      {particles.map((p, i) =>
      <Float key={i} speed={1 + Math.random() * 2} floatIntensity={0.5 + Math.random()}>
          <mesh position={p.position}>
            <sphereGeometry args={[p.scale, 8, 8]} />
            <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7} />
          
          </mesh>
        </Float>
      )}
    </>);

};

const Hero3DScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}>
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffeedd" />
          <pointLight position={[-3, 2, 3]} intensity={0.8} color="#e8a0b5" />
          <pointLight position={[3, -1, 2]} intensity={0.6} color="#c9a84c" />
          <spotLight position={[0, 4, 2]} intensity={0.5} angle={0.3} penumbra={1} color="#f5d0d6" />

          <LipstickTube />
          <MirrorCompact />
          <PerfumeBottle />
          <GlowingSphere />
          <FloatingSparkles />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>);

};

export default Hero3DScene;