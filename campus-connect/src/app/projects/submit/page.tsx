'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../Projects.module.css';

export default function SubmitProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    founderRole: '',
    hiringRole: '',
    requirements: '',
    benefits: 'Unpaid / Equity',
    contact: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newProject = {
      id: 'proj_' + Math.random().toString(36).substring(2, 11),
      ...formData,
      createdAt: Date.now()
    };

    const existing = localStorage.getItem('campus_connect_projects');
    const projectsArray = existing ? JSON.parse(existing) : [];
    projectsArray.push(newProject);
    localStorage.setItem('campus_connect_projects', JSON.stringify(projectsArray));

    setTimeout(() => {
        router.push('/projects');
    }, 800);
  };

  return (
    <main className={styles.container}>
      <div className={`glass-panel animate-fade-in ${styles.formCard}`}>
        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Post a Project</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Recruit talented peers from your campus.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Project Title</label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. NextGen AI Social App" required />
          </div>

          <div className={styles.fieldGroup}>
            <label>Project Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="What are you building?" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.fieldGroup}>
              <label>Your Role</label>
              <input name="founderRole" value={formData.founderRole} onChange={handleChange} placeholder="e.g. Lead Developer" required />
            </div>
            <div className={styles.fieldGroup}>
              <label>Role Hiring For</label>
              <input name="hiringRole" value={formData.hiringRole} onChange={handleChange} placeholder="e.g. UI/UX Designer" required />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Requirements</label>
            <input name="requirements" value={formData.requirements} onChange={handleChange} placeholder="e.g. React, Figma, Next.js" required />
          </div>

          <div className={styles.fieldGroup}>
            <label>Benefits / Compensation</label>
            <select 
              name="benefits" 
              value={formData.benefits} 
              onChange={handleChange} 
              style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--text-primary)', padding: '14px', borderRadius: '12px', border: '2px solid transparent', fontFamily: 'inherit' }}
            >
              <option value="Unpaid / Equity" style={{color: 'black'}}>Unpaid / Equity</option>
              <option value="Paid ($/hr)" style={{color: 'black'}}>Paid Hourly</option>
              <option value="Paid (Lump Sum)" style={{color: 'black'}}>Project Lump Sum</option>
              <option value="Resume Builder / Class Credit" style={{color: 'black'}}>Resume Builder</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Contact (Email or IG Handle)</label>
            <input name="contact" value={formData.contact} onChange={handleChange} placeholder="e.g. @janedoe or jane@edu.com" required />
          </div>

          <div className={styles.actions}>
            <Link href="/projects" className={styles.cancelLink}>Cancel</Link>
            <button type="submit" className="button-primary" disabled={loading}>
              {loading ? 'Posting...' : 'Post Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
