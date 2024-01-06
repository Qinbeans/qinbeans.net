import { supabase } from '$lib/scripts/supabase.js';
import { isEmailValid } from '$lib/scripts/utils.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
    const { name, email, message } = await request.json();
    // check if email is valid
    if (!isEmailValid(email)) {
        return json({ error: 'Invalid email' });
    }
    if (!name || !email || !message) {
        return json({ error: 'Missing fields' });
    }
    const { data, error } = await supabase
        .from('contact')
        .insert({ name, email, message });
    if (error) {
        return json({ error });
    }
    return json({ data });
};