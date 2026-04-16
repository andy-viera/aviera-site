"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const FIELD_DEPTH = 80;
const FIELD_SPREAD = 20;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const warpingRef = useRef(false);
  const warpStartRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const startWarp = () => { warpingRef.current = true; warpStartRef.current = performance.now(); };
    const endWarp = () => { warpingRef.current = false; };
    window.addEventListener("startWarp", startWarp);
    window.addEventListener("endWarp", endWarp);
    return () => {
      window.removeEventListener("startWarp", startWarp);
      window.removeEventListener("endWarp", endWarp);
    };
  }, []);

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * FIELD_SPREAD * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SPREAD * 2;
      pos[i * 3 + 2] = -Math.random() * FIELD_DEPTH;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, phases: ph };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const arr = (
      pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    ).array as Float32Array;
    const isWarping = warpingRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      if (isWarping) {
        const elapsed = (performance.now() - warpStartRef.current) / 1000;
        const t = Math.min(elapsed / 0.8, 1.0);
        // Fast ramp up (power 0.3 = quick), slow ease down at the end
        const speedCurve = t < 0.6
          ? Math.pow(t / 0.6, 0.3)           // rapid acceleration to peak
          : 1.0 - Math.pow((t - 0.6) / 0.4, 2); // gentle quadratic deceleration
        const warpSpeed = speedCurve * 2.0 + 0.15;

        arr[i3 + 2] += warpSpeed + (i % 3) * 0.2 * speedCurve;
        if (arr[i3 + 2] > 5) {
          arr[i3] = (Math.random() - 0.5) * FIELD_SPREAD * 2;
          arr[i3 + 1] = (Math.random() - 0.5) * FIELD_SPREAD * 2;
          arr[i3 + 2] = -FIELD_DEPTH;
        }
      } else {
        const phase = phases[i];
        const speed = 0.06 + (i % 5) * 0.012;
        arr[i3] += Math.sin(time * speed + phase) * 0.002 + mx * 0.001;
        arr[i3 + 1] += Math.cos(time * speed * 0.7 + phase) * 0.0015 + my * 0.001;
      }
    }

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (isWarping) {
      mat.opacity = Math.min(0.7, mat.opacity + 0.05);
      mat.size = Math.min(0.04, mat.size + 0.002);
    } else {
      mat.opacity += (0.3 - mat.opacity) * 0.05;
      mat.size += (0.018 - mat.size) * 0.05;
    }

    (
      pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    ).needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c8c8e0"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <>
      <color attach="background" args={["#030305"]} />
      <fog attach="fog" args={["#030305", 15, 55]} />
      <ParticleField />
    </>
  );
}
