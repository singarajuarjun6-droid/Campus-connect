'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

function generateFingerprint() {
    return 'fp_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function SubmitProfile() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        university: '',
        interests: '',
        bio: '',
        contact: '',
        math_answer: '',
        bot_field: ''
    });
    const [photo, setPhoto] = useState<File | null>(null);
    const [selectedAvatar, setSelectedAvatar] = useState<string>('');

    const AVATAR_OPTIONS = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Batman',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Superman',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=WonderWoman',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Spiderman',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Flash',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Joker'
    ];

    useEffect(() => {
        // Feature removed
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'bio' && value.length > 150) return;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setError('Photo must be less than 5MB');
                return;
            }
            setPhoto(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.university || !formData.contact) {
            setError('University and Contact are required.');
            return;
        }

        setLoading(true);

        const fingerprint_id = generateFingerprint();
        const data = new FormData();
        data.append('fingerprint_id', fingerprint_id);
        data.append('name', formData.name);
        data.append('university', formData.university);
        data.append('interests', formData.interests);
        data.append('bio', formData.bio);
        data.append('contact', formData.contact);
        data.append('math_answer', formData.math_answer);
        data.append('bot_field', formData.bot_field);

        if (photo) {
            data.append('photo', photo);
        } else if (selectedAvatar) {
            data.append('avatarUrl', selectedAvatar);
        }

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                body: data,
            });

            const result = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                setError(result.error || 'Failed to submit profile.');
            }
        } catch (err) {
            setError('Network error occurred.');
        }

        setLoading(false);
    };

    return (
        <main className={styles.container}>
            <div className={`glass-panel animate-fade-in ${styles.formCard}`}>
                <div className={styles.header}>
                    <h1>Join the Feed</h1>
                    <p>Profiles are anonymous and auto-delete after 30 days.</p>
                </div>

                {success ? (
                    <div className={styles.successMessage}>
                        <div className={styles.checkmark}>✓</div>
                        <h2>Profile Submitted!</h2>
                        <p>Redirecting to the feed...</p>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && <div className={styles.error}>{error}</div>}

                        <div className={styles.fieldGroup}>
                            <label>Name / Pseudonym (Optional)</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Secret Squirrel" />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label>University (Required)</label>
                                <input type="text" name="university" value={formData.university} onChange={handleChange} placeholder="e.g. UC Berkeley" required />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label>Contact (Required)</label>
                                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Email or @instagram" required />
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label>Interests (Comma separated)</label>
                            <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g. Photography, Coding, Sushi" />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label>Short Bio ({150 - formData.bio.length} chars left)</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us a bit about yourself..." rows={3} />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label>Choose an Avatar OR Upload a Photo</label>
                            
                            <div className={styles.avatarGrid}>
                                {AVATAR_OPTIONS.map((avatar, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`${styles.avatarOption} ${selectedAvatar === avatar ? styles.selectedAvatar : ''}`}
                                        onClick={() => { setSelectedAvatar(avatar); setPhoto(null); }}
                                    >
                                        <img src={avatar} alt={`Avatar ${idx}`} />
                                    </div>
                                ))}
                            </div>

                            <p style={{ textAlign: 'center', margin: '10px 0', color: 'var(--text-secondary)' }}>or</p>

                            <input type="file" accept="image/jpeg, image/png, image/webp" onChange={(e) => { handlePhotoChange(e); setSelectedAvatar(''); }} className={styles.fileInput} />
                            {photo && <p className={styles.fileHint}>Selected file: {photo.name}</p>}
                        </div>

                        {/* Anti-spam mechanism */}
                        <div className={styles.fieldGroup} style={{ display: 'none' }}>
                            <label>Leave this empty (Bot trap)</label>
                            <input type="text" name="bot_field" value={formData.bot_field} onChange={handleChange} tabIndex={-1} />
                        </div>

                        <div className={styles.fieldGroup}>
                            <label>Human Verification: What is 3 + 4?</label>
                            <input type="text" name="math_answer" value={formData.math_answer} onChange={handleChange} placeholder="Answer" required />
                        </div>

                        <div className={styles.actions}>
                            <Link href="/" className={styles.cancelLink}>Cancel</Link>
                            <button
                                type="submit"
                                className="button-primary"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Post Profile'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}
