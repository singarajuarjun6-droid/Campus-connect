'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Projects.module.css';
import ProjectCard, { Project } from '@/components/ProjectCard';

export default function ProjectsBoard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For prototyping we are using local storage to mock the database
    const fetchProjects = () => {
      const stored = localStorage.getItem('campus_connect_projects');
      if (stored) {
        setProjects(JSON.parse(stored).sort((a: Project, b: Project) => b.createdAt - a.createdAt));
      }
      setLoading(false);
    };
    
    fetchProjects();
    // In a real app we'd fetch from an API route here
  }, []);

  return (
    <main className={styles.container}>
      <header className={`animate-fade-in ${styles.header}`}>
        <div className={styles.logo}>
          <h1 className="gradient-text">Projects Board 💼</h1>
          <p>Find students to build with, or hire for your own startup.</p>
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
          <Link href="/" className="button-primary" style={{ background: 'var(--card-bg)', border: '1px solid var(--accent-color)' }}>← Feed</Link>
          <Link href="/projects/submit" className="button-primary">Post a Project</Link>
        </div>
      </header>

      {loading ? (
        <div style={{textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)'}}>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className={`animate-fade-in ${styles.emptyState}`}>
          <h3>No projects currently hiring.</h3>
          <p>Be the first to post a role for your next big idea!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {projects.map(p => (
            <div key={p.id} className="animate-fade-in">
                <ProjectCard project={p} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
