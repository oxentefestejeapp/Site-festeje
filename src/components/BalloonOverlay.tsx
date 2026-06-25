/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, PartyPopper } from 'lucide-react';

interface Balloon {
  id: number;
  x: number; // percentage width
  color: string;
  size: number; // size in pixels
  speed: number; // duration of animation
  delay: number; // start delay
  rotation: number;
  shape: 'oval' | 'heart' | 'star';
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'square' | 'circle' | 'triangle';
}

const BALLOON_COLORS = [
  '#FF1493', // Deep Pink
  '#00FFFF', // Cyan / Teal
  '#FF8C00', // Dark Orange
  '#32CD32', // Lime Green
  '#FFD700', // Gold
  '#8A2BE2', // Blue Violet
  '#FF69B4', // Hot Pink
  '#00FA9A', // Medium Spring Green
];

const SHAPES: Array<'oval' | 'heart' | 'star'> = ['oval', 'oval', 'heart', 'star'];

export default function BalloonOverlay() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [confettis, setConfettis] = useState<Confetti[]>([]);
  const [triggerCount, setTriggerCount] = useState(0);

  const triggerCelebration = useCallback(() => {
    // Generate new balloons
    const newBalloons: Balloon[] = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5, // 5% to 95%
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: Math.random() * 40 + 40, // 40px to 80px
      speed: Math.random() * 4 + 4, // 4s to 8s
      delay: Math.random() * 1.5, // 0 to 1.5s delay
      rotation: Math.random() * 40 - 20, // -20deg to 20deg
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));

    // Generate confetti
    const newConfettis: Confetti[] = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i + 100,
      x: Math.random() * 100,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: Math.random() * 8 + 6, // 6px to 14px
      rotation: Math.random() * 360,
      shape: ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)] as any,
    }));

    setBalloons((prev) => [...prev, ...newBalloons]);
    setConfettis((prev) => [...prev, ...newConfettis]);
    setTriggerCount((prev) => prev + 1);

    // Clean up older items after they complete
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id > Date.now() - 10000));
      setConfettis((prev) => prev.filter((c) => c.id > Date.now() - 10000));
    }, 9000);
  }, []);

  // Run automatically once on mount
  useEffect(() => {
    // Slight delay so the user is already on page
    const timer = setTimeout(() => {
      triggerCelebration();
    }, 400);
    return () => clearTimeout(timer);
  }, [triggerCelebration]);

  return (
    <>
      {/* Balloon & Confetti container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" id="celebration-container">
        <AnimatePresence>
          {/* Confetti falling from top */}
          {confettis.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -50, x: `${c.x}vw`, opacity: 1, rotate: c.rotation }}
              animate={{
                y: '110vh',
                x: `${c.x + (Math.random() * 20 - 10)}vw`,
                rotate: c.rotation + 720,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: Math.random() * 3 + 3,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                borderRadius: c.shape === 'circle' ? '50%' : c.shape === 'triangle' ? '0' : '2px',
                clipPath: c.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
              }}
            />
          ))}

          {/* Balloons rising from bottom */}
          {balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: '110vh', x: `${b.x}vw`, opacity: 0, rotate: b.rotation }}
              animate={{
                y: '-20vh',
                x: `${b.x + Math.sin(b.id) * 8}vw`,
                opacity: [0, 1, 1, 0.8, 0],
                rotate: b.rotation + (Math.random() * 30 - 15),
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: b.speed,
                delay: b.delay,
                ease: 'easeOut',
              }}
              className="absolute flex flex-col items-center"
              style={{ width: b.size }}
            >
              {/* Balloon Body */}
              <div
                className="relative rounded-full shadow-lg flex items-center justify-center"
                style={{
                  width: b.size,
                  height: b.size * 1.2,
                  backgroundColor: b.color,
                  borderRadius: b.shape === 'heart' 
                    ? '100% 100% 0 0' 
                    : b.shape === 'star'
                    ? '50%'
                    : '50% 50% 50% 50% / 40% 40% 60% 60%',
                  background: `radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(255,255,255,0) 25%), ${b.color}`,
                }}
              >
                {/* Shiny reflex */}
                <div className="absolute top-[10%] left-[20%] w-[20%] h-[15%] bg-white/40 rounded-full rotate-[-30deg]" />
                
                {/* Micro logo stamp overlay for branding feel */}
                <span className="text-[7px] font-bold text-white/50 tracking-wider font-display uppercase">OXENTE</span>
              </div>

              {/* Balloon Knot */}
              <div 
                className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] -mt-[1px]"
                style={{ borderBottomColor: b.color }}
              />

              {/* Balloon String */}
              <svg width="10" height="60" viewBox="0 0 10 60" className="opacity-60 -mt-[1px]">
                <path
                  d="M 5 0 Q 8 15, 3 30 T 5 60"
                  fill="none"
                  stroke="#A1A1AA"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Sparkle Button to re-trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="retrigger-celebration-btn"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={triggerCelebration}
          className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-medium p-3.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white cursor-pointer group"
          title="Festejar de novo!"
        >
          <PartyPopper className="w-5 h-5 group-hover:animate-bounce" />
          <span className="text-sm font-semibold pr-1 hidden md:inline">Festejar!</span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
