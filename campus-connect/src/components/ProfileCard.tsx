'use client';

import React, { useState } from 'react';
import styles from './ProfileCard.module.css';
import { Mail, ExternalLink, MapPin, MessageSquare, CheckCircle } from 'lucide-react';

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
    const [copied, setCopied] = useState(false);

    const presetMessage = `Hey ${profile.name || ''}! I found your profile on CampusConnect and it looks really interesting. Would you be open to connecting or collaborating on a project?`;

    const handleQuickConnect = async () => {
        try {
            await navigator.clipboard.writeText(presetMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
            
            if (isEmail) {
                window.open(`mailto:${profile.contact}?subject=CampusConnect%20Collab&body=${encodeURIComponent(presetMessage)}`, '_blank');
            } else {
                const handle = profile.contact.replace('@', '');
                window.open(`https://instagram.com/${handle}`, '_blank');
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

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
                <button 
                    onClick={handleQuickConnect} 
                    className={`button-primary ${styles.quickMsgBtn}`}
                >
                    {copied ? <CheckCircle size={16} /> : <MessageSquare size={16} />}
                    {copied ? "Icebreaker Copied!" : "Quick Connect"}
                </button>
            </div>
        </div>
    );
}
