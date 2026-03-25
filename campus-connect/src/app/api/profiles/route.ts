import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const university = searchParams.get('university');
        const interest = searchParams.get('interest');

        let query = supabaseAdmin
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (university && university.trim() !== '') {
            query = query.ilike('university', `%${university}%`);
        }

        if (interest && interest.trim() !== '') {
            query = query.contains('interests', [interest]);
        }

        const { data, error } = await query.limit(50);

        if (error) {
            console.error('Supabase get profiles error:', error);
            return NextResponse.json({ error: 'Failed to fetch profiles.' }, { status: 500 });
        }

        return NextResponse.json({ profiles: data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
