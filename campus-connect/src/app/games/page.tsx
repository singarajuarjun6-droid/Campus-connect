'use client';

import Link from 'next/link';
import styles from './GamesLayout.module.css';

export default function GamesHub() {
  return (
    <main className={styles.container}>
      <header className={`animate-fade-in ${styles.header}`}>
        <div className={styles.logo}>
          <h1 className="gradient-text">Games Mode 🎮</h1>
          <p>Compete for the local high score!</p>
        </div>
        <div className={styles.actions}>
          <Link href="/" className="button-primary">Back to Feed</Link>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Game 1: Click Tester */}
        <Link href="/games/clicker" className={`glass-panel animate-fade-in ${styles.gameCard}`}>
          <h2>⚡ Speed Clicker</h2>
          <p>How many times can you click the button in 10 seconds?</p>
          <div className={styles.playBtn}>Play Now</div>
        </Link>
        
        {/* Game 2: Number Guesser */}
        <Link href="/games/guesser" className={`glass-panel animate-fade-in ${styles.gameCard}`} style={{ animationDelay: '0.1s' }}>
          <h2>🔢 Number Guesser</h2>
          <p>Guess the right number in the fewest attempts possible.</p>
          <div className={styles.playBtn}>Play Now</div>
        </Link>

        {/* Game 3: Tic Tac Toe */}
        <Link href="/games/tictactoe" className={`glass-panel animate-fade-in ${styles.gameCard}`} style={{ animationDelay: '0.2s' }}>
          <h2>❌ Tic Tac Toe ⭕</h2>
          <p>The classic strategy game. First to align 3 wins.</p>
          <div className={styles.playBtn}>Play Now</div>
        </Link>
      </div>
    </main>
  );
}
