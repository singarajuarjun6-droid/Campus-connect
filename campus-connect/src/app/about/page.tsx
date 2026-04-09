'use client';

import Link from 'next/link';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <header className={`animate-fade-in ${styles.header}`}>
        <h1 className="gradient-text">Our Vision</h1>
        <p>Connecting thousands of students across the galaxy.</p>
      </header>

      {/* Target Base Section */}
      <section className={`glass-panel animate-fade-in ${styles.section}`} style={{ animationDelay: '0.1s' }}>
        <h2>The Customer Base</h2>
        <p>
          College campuses are massive ecosystems. It’s easy to feel lost in a sea of faces, especially for incoming freshmen and transfer students. 
          Our primary customer base consists of university students aged 18-24 who are eager to expand their social circles, discover people with niche interests, and overcome social anxiety.
        </p>
        <div className={styles.highlightBox}>
          <strong>Current Adoption Goal:</strong> Engaging over 5,000 active students per campus semester, turning massive impersonal universities into tight-knit communities.
        </div>
      </section>

      {/* Student Impact Section */}
      <section className={`glass-panel animate-fade-in ${styles.section}`} style={{ animationDelay: '0.2s' }}>
        <h2>The Student Impact</h2>
        <p>
          By allowing students to post anonymous or pseudo-anonymous "transient" profiles that self-destruct after 30 days, we remove the pressure of maintaining a permanent digital footprint. 
          The impact is clear: students feel empowered to be authentically themselves. Whether they're looking for a study buddy for Organic Chemistry, a weekend hiking group, or just casual gaming friends, CampusConnect acts as the frictionless ice-breaker.
        </p>
      </section>

      {/* The Instagram Method Section */}
      <section className={`glass-panel animate-fade-in ${styles.section}`} style={{ animationDelay: '0.3s' }}>
        <h2>The "Instagram Method"</h2>
        <p>
          We aren't trying to build another bloated chat app. Students already have places where they talk to friends—specifically Instagram. 
        </p>
        <p>
          Our philosophy relies on the <strong>Instagram Method</strong>. CampusConnect serves as the preliminary discovery and matching engine. Once a student finds an interesting profile on our platform, the connection is instantly handed off to Instagram via direct profile linking. 
        </p>
        
        <div className={styles.instagramHighlights}>
          <h3>📸 Frictionless DM Handoff</h3>
          <p>
            Instead of building a separate messaging infrastructure that nobody wants to use, we route connections straight to where Gen Z already lives. Every profile prominently features an Instagram handle link. When you click it, it opens directly into their Instagram profile, allowing you to slide into their DMs naturally and organically.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/" className={styles.igButton}>Experience the IG Handoff in the Feed</Link>
          </div>
        </div>
      </section>

      <div className={`animate-fade-in ${styles.footerActions}`} style={{ animationDelay: '0.4s' }}>
        <Link href="/" className="button-primary" style={{ background: 'var(--card-bg)', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>
          ← Back to Feed
        </Link>
        <Link href="/submit" className="button-primary">
          Join the Network
        </Link>
      </div>

    </main>
  );
}
