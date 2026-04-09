'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProfileCard, { Profile } from '@/components/ProfileCard';
import styles from './page.module.css';

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUni, setFilterUni] = useState('');
  const [filterInterest, setFilterInterest] = useState('');
  const [error, setError] = useState('');

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filterUni) query.append('university', filterUni);
      if (filterInterest) query.append('interest', filterInterest);

      const res = await fetch(`/api/profiles?${query.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setProfiles(data.profiles || []);
        setError('');
      } else {
        setError(data.error || 'Failed to initialize database connection. Please add Supabase Credentials to .env.local.');
      }
    } catch (e) {
      setError('Network error getting profiles.');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check for temporary login
    const user = localStorage.getItem('campus_connect_user');
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchProfiles();
    }, 300); // debounce API calls
    return () => clearTimeout(delayDebounceFn);
  }, [filterUni, filterInterest]);

  return (
    <main className={styles.container}>
      <header className={`animate-fade-in ${styles.header}`}>
        <div className={styles.logo}>
          <h1>CampusConnect</h1>
          <p>Find peers anonymously.</p>
        </div>
        <div className={styles.actions}>
          <Link href="/projects" className={`button-primary ${styles.gameModeBtn}`} style={{ marginRight: '10px', background: 'var(--card-bg)', border: '1px solid var(--neon-pink)', color: 'var(--neon-pink)' }}>Projects Board 💼</Link>
          <Link href="/about" className={`button-primary ${styles.gameModeBtn}`} style={{ marginRight: '10px', background: 'var(--card-bg)', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)' }}>Our Vision 🚀</Link>
          <Link href="/games" className={`button-primary ${styles.gameModeBtn}`} style={{ marginRight: '10px', background: 'var(--card-bg)', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>Games Mode 🎮</Link>
          <Link href="/submit" className="button-primary">Add Profile</Link>
        </div>
      </header>

      <div className={`animate-fade-in ${styles.filters}`} style={{ animationDelay: '0.1s' }}>
        <input
          type="text"
          placeholder="Filter by University (e.g. Stanford)..."
          value={filterUni}
          onChange={(e) => setFilterUni(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Interest (e.g. Hiking)..."
          value={filterInterest}
          onChange={(e) => setFilterInterest(e.target.value)}
        />
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {loading ? (
        <div className={styles.loader}>Loading awesome students...</div>
      ) : profiles.length === 0 && !error ? (
        <div className={`animate-fade-in ${styles.emptyState}`}>
          <h3>No profiles found.</h3>
          <p>Be the first to add your profile!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {profiles.map(p => (
            <ProfileCard key={p.id} profile={p} />
          ))}
        </div>
      )}
    </main>
  );
}
