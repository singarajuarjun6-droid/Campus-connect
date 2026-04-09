'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import layoutStyles from '../GamesLayout.module.css';

export default function ClickerGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('hs_clicker');
    if (savedScore) setHighScore(parseInt(savedScore, 10));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('hs_clicker', score.toString());
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsPlaying(true);
  };

  const handleClick = () => {
    if (isPlaying) {
      setScore(prev => prev + 1);
    }
  };

  return (
    <div className={layoutStyles.container}>
      <div className={`glass-panel animate-fade-in ${layoutStyles.miniGameContainer}`}>
        <h1>⚡ Speed Clicker</h1>
        <p style={{marginBottom: '2rem'}}>Click the button as fast as you can in 10 seconds!</p>
        
        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '2rem 0', color: 'var(--neon-cyan)' }}>
          {timeLeft}s
        </div>
        
        {!isPlaying && timeLeft === 10 ? (
          <button className="button-primary" onClick={startGame} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
            Start Game
          </button>
        ) : !isPlaying && timeLeft === 0 ? (
          <div>
            <h2 style={{ color: 'var(--neon-pink)', marginBottom: '1rem' }}>Time's Up! You scored {score}</h2>
            <button className="button-primary" onClick={startGame}>Play Again</button>
          </div>
        ) : (
          <button 
            className="button-primary" 
            onClick={handleClick}
            style={{ fontSize: '2rem', padding: '2rem', borderRadius: '50%', width: '150px', height: '150px' }}
          >
            CLICK
          </button>
        )}

        <div className={layoutStyles.scoreBoard}>
          <span>Current Score: {score}</span>
          <span style={{color: 'var(--neon-yellow)'}}>High Score: {highScore}</span>
        </div>

        <div style={{marginTop: '2rem'}}>
          <Link href="/games" style={{color: 'var(--text-secondary)'}}>← Back to Games Hub</Link>
        </div>
      </div>
    </div>
  );
}
