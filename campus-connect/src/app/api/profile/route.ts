import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase';
import { Filter } from 'bad-words';

const filter = new Filter();

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Privacy-friendly static CAPTCHA
        const honeypot = formData.get('bot_field');
        const mathAnswer = formData.get('math_answer');

        if (honeypot) {
            return NextResponse.json({ error: 'Bot detected.' }, { status: 400 });
        }
        if (mathAnswer !== '7') {
            return NextResponse.json({ error: 'Invalid CAPTCHA answer.' }, { status: 400 });
        }

        // Explicit Device Restrictions
        const fingerprint_id = formData.get('fingerprint_id') as string;
        if (!fingerprint_id) {
            return NextResponse.json({ error: 'Missing device fingerprint.' }, { status: 400 });
        }

        // Extract basic fields
        const rawName = (formData.get('name') as string) || '';
        const rawBio = (formData.get('bio') as string) || '';
        const rawUniversity = (formData.get('university') as string) || '';
        const rawContact = (formData.get('contact') as string) || '';
        const rawInterests = (formData.get('interests') as string) || '';

        if (!rawUniversity || !rawContact) {
            return NextResponse.json({ error: 'University and Contact are required.' }, { status: 400 });
        }

        if (rawBio.length > 150) {
            return NextResponse.json({ error: 'Bio must be under 150 characters.' }, { status: 400 });
        }

        // Profanity Filter - check explicitly to sanitize user info
        const name = filter.isProfane(rawName) ? filter.clean(rawName) : rawName;
        const bio = filter.isProfane(rawBio) ? filter.clean(rawBio) : rawBio;
        const university = filter.isProfane(rawUniversity) ? filter.clean(rawUniversity) : rawUniversity;
        const contact = filter.isProfane(rawContact) ? filter.clean(rawContact) : rawContact;

        const interestsArray = rawInterests
            .split(',')
            .map((i) => i.trim())
            .filter((i) => i !== '');
        const safeInterests = interestsArray.map(i => filter.isProfane(i) ? filter.clean(i) : i);

        // Secure Image Uploading
        const photo = formData.get('photo') as File | null;
        let photo_url = formData.get('avatarUrl') as string | null;

        if (photo && photo.size > 0 && photo.size < 5 * 1024 * 1024) { // Max 5MB
            const fileExt = photo.name.split('.').pop() || 'jpg';
            const fileName = `${fingerprint_id}-${Date.now()}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                .from('profiles_photos')
                .upload(fileName, photo, { upsert: false });

            if (uploadError) {
                console.error('Image upload error:', uploadError);
                return NextResponse.json({ error: 'Failed to upload photo.' }, { status: 500 });
            }

            const { data: publicUrlData } = supabaseAdmin.storage
                .from('profiles_photos')
                .getPublicUrl(fileName);

            photo_url = publicUrlData.publicUrl;
        }

        // Safe Inserts
        const { error: insertError } = await supabaseAdmin
            .from('profiles')
            .insert({
                name,
                bio,
                university,
                contact,
                interests: safeInterests,
                photo_url,
                fingerprint_id
            });

        if (insertError) {
            if (insertError.code === '23505') {
                return NextResponse.json({ error: 'A profile from this device already exists.' }, { status: 400 });
            }
            return NextResponse.json({ error: 'Failed to create profile.' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
