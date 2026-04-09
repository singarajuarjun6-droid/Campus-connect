'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import layoutStyles from '../GamesLayout.module.css';
import styles from './TicTacToe.module.css';

type Player = 'X' | 'O' | null;

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  useEffect(() => {
    const savedX = localStorage.getItem('hs_ttt_x');
    const savedO = localStorage.getItem('hs_ttt_o');
    if (savedX) setXWins(parseInt(savedX, 10));
    if (savedO) setOWins(parseInt(savedO, 10));
  }, []);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePlay = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      if (newWinner === 'X') {
        const score = xWins + 1;
        setXWins(score);
        localStorage.setItem('hs_ttt_x', score.toString());
      } else {
        const score = oWins + 1;
        setOWins(score);
        localStorage.setItem('hs_ttt_o', score.toString());
      }
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className={layoutStyles.container}>
      <div className={`glass-panel animate-fade-in ${layoutStyles.miniGameContainer}`}>
        <h1>❌ Tic Tac Toe ⭕</h1>
        
        <p style={{ marginTop: '1rem', color: winner ? 'var(--neon-pink)' : 'var(--neon-cyan)', fontSize: '1.2rem' }}>
          {winner ? `Winner: ${winner}!` : !board.includes(null) ? "It's a draw!" : `Next Player: ${xIsNext ? 'X' : 'O'}`}
        </p>

        <div className={styles.board}>
          {board.map((cell, index) => (
            <div 
              key={index} 
              className={`${styles.cell} ${cell === 'X' ? styles.x : cell === 'O' ? styles.o : ''}`}
              onClick={() => handlePlay(index)}
            >
              {cell}
            </div>
          ))}
        </div>

        <button className="button-primary" onClick={resetBoard} style={{ marginTop: '2rem' }}>
          Restart Game
        </button>

        <div className={layoutStyles.scoreBoard}>
          <span style={{color: 'var(--neon-cyan)'}}>X Wins: {xWins}</span>
          <span style={{color: 'var(--neon-pink)'}}>O Wins: {oWins}</span>
        </div>

        <div style={{marginTop: '2rem'}}>
          <Link href="/games" style={{color: 'var(--text-secondary)'}}>← Back to Games Hub</Link>
        </div>
      </div>
    </div>
  );
}
