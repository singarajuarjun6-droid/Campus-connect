'use client';

import React, { useState } from 'react';
import { Briefcase, Send, CheckCircle, Navigation } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  founderRole: string;
  hiringRole: string;
  requirements: string;
  benefits: string;
  contact: string;
  createdAt: number;
}

export default function ProjectCard({ project }: { project: Project }) {
  const isEmail = project.contact.includes('@');
  const [copied, setCopied] = useState(false);

  const applyMessage = `Hey! I saw your post on CampusConnect for the ${project.hiringRole} position on your project "${project.title}". I'm very interested and would love to chat!`;

  const handleApply = async () => {
    try {
        await navigator.clipboard.writeText(applyMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        
        if (isEmail) {
            window.open(`mailto:${project.contact}?subject=Applying%20for%20${encodeURIComponent(project.hiringRole)}&body=${encodeURIComponent(applyMessage)}`, '_blank');
        } else {
            const handle = project.contact.replace('@', '');
            window.open(`https://instagram.com/${handle}`, '_blank');
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem', height: '100%' }}>
      
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--neon-cyan)', marginBottom: '0.5rem' }}>{project.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <Briefcase size={14} /> 
          <span>Posted by: <strong style={{color: 'var(--text-primary)'}}>{project.founderRole}</strong></span>
        </div>
      </div>

      {/* Description */}
      <div style={{ flex: 1 }}>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{project.description}</p>
      </div>

      {/* Hiring Details Box */}
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--neon-pink)' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#fbcfe8', marginBottom: '0.5rem' }}>🔥 Hiring: {project.hiringRole}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}><strong>Requirements:</strong> {project.requirements}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><strong>Benefits/Pay:</strong> {project.benefits}</p>
      </div>

      {/* Action */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <button 
          onClick={handleApply} 
          className="button-primary" 
          style={{ width: '100%', background: 'linear-gradient(135deg, var(--neon-cyan), var(--accent-color))' }}
        >
          {copied ? <CheckCircle size={16} /> : <Navigation size={16} />}
          {copied ? "Application Copied!" : "Quick Apply"}
        </button>
      </div>

    </div>
  );
}
