import React from 'react';
import styles from './ProfileCard.module.css';
import { Mail, ExternalLink, MapPin } from 'lucide-react';

export interface Profile {
    id: string;
    name: string | null;
    university: string;
    interests: string[];
    bio: string | null;
    photo_url: string | null;
    contact: string;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
    const isEmail = profile.contact.includes('@');

    return (
        <div className={`glass-panel ${styles.card}`}>
            {profile.photo_url ? (
                <div className={styles.imageContainer}>
                    <img src={profile.photo_url} alt={profile.name || 'Anonymous student'} loading="lazy" />
                </div>
            ) : (
                <div className={styles.placeholderImage}>
                    <span>Anonymous</span>
                </div>
            )}
            <div className={styles.content}>
                <h2>{profile.name || 'Anonymous Student'}</h2>
                <p className={styles.university}>
                    <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {profile.university}
                </p>

                {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

                <div className={styles.tags}>
                    {profile.interests && profile.interests.length > 0 ? profile.interests.map((interest, i) => (
                        <span key={i} className={styles.tag}>{interest}</span>
                    )) : null}
                </div>
            </div>

            <div className={styles.footer}>
                <a
                    href={isEmail ? `mailto:${profile.contact}` : `https://instagram.com/${profile.contact.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary"
                >
                    {isEmail ? <Mail size={16} /> : <ExternalLink size={16} />}
                    Say Hello
                </a>
            </div>
        </div>
    );
}
