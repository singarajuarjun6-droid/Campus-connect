'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isSignedUp = localStorage.getItem('campus_connect_user');
    if (isSignedUp) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    
    // Save to local storage to mock a login state
    localStorage.setItem('campus_connect_user', username.trim());
    router.push('/');
  };

  return (
    <main className={styles.container}>
      <div className={`glass-panel animate-fade-in ${styles.card}`}>
        <h1 className="gradient-text">Welcome Back</h1>
        <p className={styles.subtitle}>Login with your super-secret identity.</p>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Choose a cool username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              maxLength={20}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={`button-primary ${styles.submitBtn}`}>
            Enter the Matrix
          </button>
        </form>
      </div>
    </main>
  );
}
