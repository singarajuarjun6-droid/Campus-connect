'use client';

import React, { useEffect, useState } from 'react';
import styles from './SpaceBackground.module.css';

const SPACE_OBJECTS = ['🪐', '🚀', '⭐', '🌍', '🛰️', '☄️', '🌑', '🌟', '🛸'];
const generateObjects = () => {
  const objects = [];
  for (let i = 0; i < 40; i++) {
    objects.push({
      id: i,
      type: SPACE_OBJECTS[Math.floor(Math.random() * SPACE_OBJECTS.length)],
      delay: `${(Math.random() * 20).toFixed(2)}s`,
      duration: `${15 + Math.random() * 25}s`, // Slower for space
      direction: Math.random() > 0.5 ? 'right' : 'left',
      top: `${Math.random() * 100}%`,
      scale: 0.3 + Math.random() * 1.0,
      opacity: 0.3 + Math.random() * 0.7,
    });
  }
  return objects;
};

export default function SpaceBackground() {
  const [mounted, setMounted] = useState(false);
  const [spaceObjects, setSpaceObjects] = useState<any[]>([]);

  useEffect(() => {
    setSpaceObjects(generateObjects());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.starsOverlay} />
      {spaceObjects.map((obj) => (
        <div
          key={obj.id}
          className={`${styles.spaceObject} ${obj.direction === 'right' ? styles.flyRight : styles.flyLeft}`}
          style={{
            top: obj.top,
            animationDelay: obj.delay,
            animationDuration: obj.duration,
            transform: `scale(${obj.scale})`,
            opacity: obj.opacity,
          }}
        >
          <div className={styles.floater}>
             {obj.type}
          </div>
        </div>
      ))}
    </div>
  );
}
