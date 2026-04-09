'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import layoutStyles from '../GamesLayout.module.css';

export default function GuesserGame() {
  const [targetNum, setTargetNum] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100.');
  const [attempts, setAttempts] = useState(0);
  const [highScore, setHighScore] = useState(999);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initGame();
    const savedScore = localStorage.getItem('hs_guesser');
    if (savedScore) setHighScore(parseInt(savedScore, 10));
  }, []);

  const initGame = () => {
    setTargetNum(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setGuess('');
    setGameOver(false);
    setMessage('Guess a number between 1 and 100.');
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameOver) return;

    const num = parseInt(guess, 10);
    if (isNaN(num)) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === targetNum) {
      setMessage(`🎉 Correct! You guessed it in ${newAttempts} attempts!`);
      setGameOver(true);
      if (newAttempts < highScore) {
        setHighScore(newAttempts);
        localStorage.setItem('hs_guesser', newAttempts.toString());
      }
    } else if (num < targetNum) {
      setMessage(`🔼 Higher than ${num}!`);
    } else {
      setMessage(`🔽 Lower than ${num}!`);
    }
    setGuess('');
  };

  return (
    <div className={layoutStyles.container}>
      <div className={`glass-panel animate-fade-in ${layoutStyles.miniGameContainer}`}>
        <h1>🔢 Number Guesser</h1>
        
        <p style={{fontSize: '1.2rem', margin: '2rem 0', color: gameOver ? 'var(--neon-yellow)' : 'var(--text-primary)'}}>
          {message}
        </p>

        {!gameOver ? (
          <form onSubmit={handleGuess} style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
            <input 
              type="number" 
              value={guess} 
              onChange={(e) => setGuess(e.target.value)} 
              min="1" 
              max="100"
              style={{ width: '100px', textAlign: 'center', fontSize: '1.5rem' }} 
              autoFocus
            />
            <button type="submit" className="button-primary">Guess</button>
          </form>
        ) : (
          <button className="button-primary" onClick={initGame}>Play Again</button>
        )}

        <div className={layoutStyles.scoreBoard}>
          <span>Current Attempts: {attempts}</span>
          <span style={{color: 'var(--neon-cyan)'}}>Best Record(Lowest is best): {highScore === 999 ? '-' : highScore}</span>
        </div>

        <div style={{marginTop: '2rem'}}>
          <Link href="/games" style={{color: 'var(--text-secondary)'}}>← Back to Games Hub</Link>
        </div>
      </div>
    </div>
  );
}
