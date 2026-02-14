"use client";

import { useMemo } from "react";

interface Ember {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Seeded pseudo-random for SSR consistency
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateEmbers(): Ember[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: seededRandom(i * 7 + 1) * 100,
    size: seededRandom(i * 7 + 2) * 4 + 2,
    duration: seededRandom(i * 7 + 3) * 8 + 6,
    delay: seededRandom(i * 7 + 4) * 10,
    opacity: seededRandom(i * 7 + 5) * 0.6 + 0.2,
  }));
}

export default function EmberParticles() {
  const embers = useMemo(() => generateEmbers(), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute bottom-0 rounded-full animate-float-ember"
          style={{
            left: `${ember.left}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            background: `radial-gradient(circle, #ff4d00, #ff9500)`,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
            opacity: ember.opacity,
          }}
        />
      ))}
    </div>
  );
}
